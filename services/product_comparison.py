"""Evidence-bound opposite-retailer comparison using one shared browser lease."""
import json
import os
import re
from time import monotonic, time

from core.browser import BrowserBusy, browser_session
from retailers.outcomes import RetailerSearchError
from retailers.pagination import scrape_page
from retailers.products import get_product_details, ProductDetailError
from services.ai.ai_provider import AIProvider, AIUnavailable
from services.search_pagination import normalize_listing

QUERY_SCHEMA = {"type": "object", "additionalProperties": False, "required": ["search_query"],
                "properties": {key: {"type": ["string", "null"]} for key in
                               ("search_query", "brand", "model", "processor", "ram", "storage", "display")}}
VERDICT_SCHEMA = {"type": "object", "additionalProperties": False, "required": ["verdict"],
                  "properties": {"verdict": {"type": "string", "enum":
                                 ["EXACT_MATCH", "VARIANT_UNVERIFIED", "DIFFERENT_VARIANT", "DIFFERENT_MODEL"]}}}


def _trace(event, **fields):
    """Human-readable structured comparison diagnostics; never logs tokens or keys."""
    enabled = os.getenv("COMPARISON_DEBUG", "false" if os.getenv("VERCEL") else "true").casefold() in {"1", "true", "yes"}
    if enabled:
        try:
            print("[comparison] " + json.dumps({"event": event, **fields}, ensure_ascii=False, default=str), flush=True)
        except (OSError, UnicodeError, TypeError):
            pass


def _text(product):
    return " | ".join([str(product.get("name") or ""),
                       " | ".join(map(str, (product.get("specifications") or {}).values())),
                       " | ".join(map(str, product.get("highlights") or []))])


def _match(pattern, text):
    found = re.search(pattern, text, re.I)
    return re.sub(r"\s+", " ", found.group(1)).strip() if found else None


def attributes(product):
    selected = product.get("selected_configuration") or {}
    normalized = product.get("normalized_attributes") or {}
    evidence = product.get("attribute_evidence") or {}
    text = _text(product)
    name = str(product.get("name") or "")
    family_patterns = [r"\b(iphone\s+\d+(?:\s+(?:pro|max|plus)){0,2})\b",
                       r"\b(macbook\s+(?:air|pro)(?:\s+M\d+)?)\b",
                       r"\b(mac\s+mini)\b",
                       r"\b(samsung\s+galaxy\s+[a-z]\d+)\b"]
    family = next((m.group(1) for pattern in family_patterns if (m := re.search(pattern, name, re.I))), None)
    is_desktop = bool(family and family.casefold() == "mac mini")
    display = selected.get("screen_size") or _match(r"\b(\d+(?:\.\d+)?\s*(?:inch|inches|″))", text)
    if display and (inch := re.search(r"(\d+(?:\.\d+)?)\s*(?:inch|inches|″)", str(display), re.I)):
        display = inch.group(1) + " inch"
    if is_desktop:
        display = None
    ram = selected.get("ram") or normalized.get("ram") or _match(r"\b(\d+\s*GB)\s+(?:RAM|unified|system memory)", text)
    if is_desktop and ram:
        ram_source = str((evidence.get("ram") or {}).get("source") or "")
        explicit_ram = bool(re.search(r"\b\d+\s*GB\s+(?:RAM|unified\s+memory|system\s+memory)\b", text, re.I))
        if not (ram_source.startswith("specifications:") or explicit_ram):
            ram = None
    return {"brand": product.get("brand"), "model": family or product.get("series"),
            "processor": _match(r"\b((?:apple\s+)?M\d+(?:\s+(?:pro|max|ultra))?)\b", text),
            "ram": ram,
            "storage": selected.get("storage") or normalized.get("storage") or _match(r"\b(\d+(?:\.\d+)?\s*(?:GB|TB))\s+(?:SSD|storage)", text),
            "display": display,
            "color": selected.get("color")}


def deterministic_query(product):
    values = attributes(product)
    processor = values.get("processor")
    if processor and values.get("brand"):
        processor = re.sub(r"^" + re.escape(str(values["brand"])) + r"\s+", "", processor, flags=re.I)
    tokens = [values.get("brand"), values.get("model"), processor, values.get("ram"), values.get("storage"), values.get("display")]
    tokens = [value for value in tokens if value and not re.fullmatch(r"\d+(?:\.\d+)?", str(value))]
    return " ".join(dict.fromkeys(tokens))[:200]


def optimized_query(product, provider=None):
    supported = attributes(product)
    fallback = deterministic_query(product)
    provider = provider or AIProvider()
    prompt = "Create a concise marketplace search query using only these retailer-supported attributes. Return JSON.\n" + json.dumps(supported)
    try:
        output, used = provider.generate(prompt, QUERY_SCHEMA)
        query = str(output.get("search_query") or "").strip()
        # Every nontrivial AI token must occur in supported evidence; SKU/search punctuation is ignored.
        evidence = re.sub(r"[^a-z0-9]", "", " ".join(str(v) for v in supported.values() if v).casefold())
        words = [re.sub(r"[^a-z0-9]", "", word.casefold()) for word in query.split()]
        query_compact = re.sub(r"[^a-z0-9]", "", query.casefold())
        required_identity = [supported.get(key) for key in ("brand", "model", "processor") if supported.get(key)]
        if (not query or len(query) > 200
                or any(word and len(word) > 2 and word not in evidence for word in words)
                or any(re.sub(r"[^a-z0-9]", "", str(value).casefold()) not in query_compact for value in required_identity)):
            raise ValueError("unsupported AI query")
        info = {"provider": used, "used": True, "fallback": False}
        _trace("query_generated", attributes=supported, query=query, **info)
        return query, info
    except (AIUnavailable, ValueError, TypeError) as error:
        _trace("query_fallback", attributes=supported, query=fallback, reason=type(error).__name__)
        return fallback, {"provider": None, "used": False, "fallback": True}


def deterministic_verdict(selected, candidate):
    left, right = attributes(selected), attributes(candidate)
    if left["model"] and right["model"] and re.sub(r"\W", "", left["model"].casefold()) != re.sub(r"\W", "", right["model"].casefold()):
        return "DIFFERENT_MODEL"
    required = [key for key in ("processor", "ram", "storage", "display") if left.get(key)]
    def equal(key, first, second):
        if key == "display":
            number = lambda value: re.search(r"\d+(?:\.\d+)?", str(value or ""))
            a, b = number(first), number(second)
            return bool(a and b and a.group() == b.group())
        return re.sub(r"\W", "", str(first).casefold()) == re.sub(r"\W", "", str(second).casefold())
    if any(right.get(key) and not equal(key, left[key], right[key]) for key in required):
        return "DIFFERENT_VARIANT"
    if any(not right.get(key) for key in required):
        return "VARIANT_UNVERIFIED"
    return "EXACT_MATCH" if required else "VARIANT_UNVERIFIED"


def _shortlist(selected, candidates):
    wanted = attributes(selected)
    result = []
    for index, item in enumerate(candidates, 1):
        name = str(item.get("name") or "")
        if re.search(r"\b(?:accessory|case|cover|stand|mount|cable|adapter|loudspeaker|speaker|replacement|skin|protector|trackpad)\b", name, re.I):
            _trace("candidate_filter", index=index, decision="reject", reason="accessory", name=name, price=item.get("price"), attributes=attributes(item))
            continue
        found = attributes(item)
        wanted_model = re.sub(r"\s+M\d+.*$", "", str(wanted.get("model") or ""), flags=re.I).strip()
        identity_pattern = r"\b" + re.escape(wanted_model).replace(r"\ ", r"\s+") + r"\b" if wanted_model else None
        if identity_pattern and not re.search(identity_pattern, name, re.I):
            _trace("candidate_filter", index=index, decision="reject", reason="missing_product_identity",
                   name=name, price=item.get("price"), attributes=found)
            continue
        if wanted["model"] and found["model"] and re.sub(r"\W", "", wanted["model"].casefold()) != re.sub(r"\W", "", found["model"].casefold()):
            _trace("candidate_filter", index=index, decision="reject", reason="different_model", name=name, price=item.get("price"), attributes=found)
            continue
        normalize = lambda value: re.sub(r"\W", "", str(value).casefold())
        if any(wanted.get(key) and found.get(key) and normalize(wanted[key]) != normalize(found[key]) for key in ("processor", "ram", "storage")):
            _trace("candidate_filter", index=index, decision="reject", reason="different_configuration", name=name, price=item.get("price"), attributes=found)
            continue
        _trace("candidate_filter", index=index, decision="shortlist", reason="identity_relevant", name=name, price=item.get("price"), attributes=found)
        result.append(item)
    priority = {"EXACT_MATCH": 0, "VARIANT_UNVERIFIED": 1, "DIFFERENT_VARIANT": 2, "DIFFERENT_MODEL": 3}
    return sorted(result, key=lambda item: (priority[deterministic_verdict(selected, item)], item.get("price") or float("inf")))[:3]


def compare_product(product, provider=None, deadline_seconds=32):
    started, provider = monotonic(), provider or AIProvider()
    deadline = started + deadline_seconds
    target = "Amazon" if product["retailer"] == "Flipkart" else "Flipkart"
    query, ai_query = deterministic_query(product), {"provider": None, "used": False, "fallback": True}
    response = {"status": "unavailable", "selected_product": product, "matched_product": None,
                "potential_savings": None, "retailer": target, "query": query, "ai_query": ai_query,
                "candidates": [], "checked_at": int(time()), "message": target + " could not be checked."}
    _trace("comparison_started", selected_retailer=product.get("retailer"), target_retailer=target,
           snapshot_name=product.get("name"), snapshot_price=product.get("price"), initial_query=query)
    try:
        with browser_session(scraping=True, wait_timeout=5, deadline=deadline, owner="product_comparison") as driver:
            details = get_product_details(product["url"], product["retailer"], driver=driver, deadline=deadline)
            product = {**product, **details, "id": product.get("id"), "retailer": product["retailer"], "url": product["url"]}
            _trace("selected_product_verified", name=product.get("name"), price=product.get("price"),
                   attributes=attributes(product), evidence=product.get("attribute_evidence", {}))
            query, ai_query = optimized_query(product, provider)
            response.update(selected_product=product, query=query, ai_query=ai_query)
            _trace("retailer_search_started", retailer=target, query=query, remaining_seconds=round(deadline - monotonic(), 2))
            page = scrape_page(driver, target, query, 1, deadline)
            listings = [item for raw in page.items if (item := normalize_listing(raw, query, target))]
            _trace("retailer_search_returned", retailer=target, query=query, raw_count=len(page.items), normalized_count=len(listings),
                   products=[{"name": item.get("name"), "price": item.get("price"), "url": item.get("url"), "attributes": attributes(item)} for item in listings])
            shortlisted = _shortlist(product, listings)
            _trace("shortlist_completed", count=len(shortlisted), limit=3,
                   products=[{"name": item.get("name"), "price": item.get("price")} for item in shortlisted])
            for shortlist_index, listing in enumerate(shortlisted, 1):
                if deadline - monotonic() < 3:
                    _trace("candidate_skipped", index=shortlist_index, reason="deadline", remaining_seconds=round(deadline - monotonic(), 2))
                    break
                detail_status = "extracted"
                try:
                    details = get_product_details(listing["url"], target, driver=driver, deadline=deadline)
                    candidate = {**listing, **details}
                except ProductDetailError as error:
                    candidate = listing
                    detail_status = error.reason
                verdict = deterministic_verdict(product, candidate)
                deterministic = verdict
                ai_verdict = None
                if verdict in {"EXACT_MATCH", "VARIANT_UNVERIFIED"}:
                    try:
                        output, ai_name = provider.generate("Classify identity using only this evidence.\n" + json.dumps({"selected": attributes(product), "candidate": attributes(candidate)}), VERDICT_SCHEMA)
                        ai_verdict = output.get("verdict")
                        # AI may resolve ambiguity, but cannot overrule a complete
                        # deterministic exact match without new retailer evidence.
                        if verdict == "VARIANT_UNVERIFIED" and ai_verdict in {"DIFFERENT_MODEL", "DIFFERENT_VARIANT"}:
                            verdict = ai_verdict
                    except AIUnavailable:
                        ai_name = None
                _trace("candidate_verified", index=shortlist_index, detail_status=detail_status,
                       name=candidate.get("name"), price=candidate.get("price"), attributes=attributes(candidate),
                       deterministic_verdict=deterministic, ai_verdict=ai_verdict, final_verdict=verdict, ai_provider=ai_name if ai_verdict else None)
                if verdict == "DIFFERENT_MODEL":
                    _trace("candidate_rejected", index=shortlist_index, reason="different_model_after_detail",
                           name=candidate.get("name"))
                    continue
                response["candidates"].append({"product": candidate, "verification": verdict, "ai_provider": ai_name if ai_verdict else None})
        exact = [item for item in response["candidates"] if item["verification"] == "EXACT_MATCH"]
        if exact:
            best = min(exact, key=lambda item: item["product"]["price"])
            response.update(status="matched", matched_product={**best["product"], "verification": "EXACT_MATCH"},
                            potential_savings=max(0, float(product.get("price") or 0) - float(best["product"]["price"])),
                            message="Same product and configuration verified from retailer evidence.")
        elif response["candidates"]:
            response.update(status="variant_unverified", message="Related listings were found, but the full configuration was not verified.")
        else:
            response.update(status="no_match", message="No matching product candidates were found.")
    except BrowserBusy:
        response.update(status="waiting", message="The retailer browser is busy. Retry shortly.")
        _trace("comparison_failed", status="waiting", reason="browser_busy")
    except RetailerSearchError as error:
        response.update(status="unavailable", message=error.public_message)
        _trace("comparison_failed", status="unavailable", reason=error.stage, retailer=error.retailer)
    except (ProductDetailError, TimeoutError, OSError) as error:
        response.update(status="unavailable", message="The selected product or opposite retailer could not be verified in time.")
        _trace("comparison_failed", status="unavailable", reason=getattr(error, "reason", type(error).__name__))
    response["elapsed_ms"] = round((monotonic() - started) * 1000)
    _trace("comparison_finished", status=response["status"], query=response["query"], candidate_count=len(response["candidates"]),
           matched_name=(response.get("matched_product") or {}).get("name"), potential_savings=response.get("potential_savings"), elapsed_ms=response["elapsed_ms"])
    return response
