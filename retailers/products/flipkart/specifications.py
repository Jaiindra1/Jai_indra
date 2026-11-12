"""Extract flat and section-preserving Flipkart specifications."""
from ..html_utils import clean_text, first_text, key_value_tables
from .labelled_sections import labelled_value
from .page_text import label_index
from . import selectors as S


SECTIONS = {
    "General", "In the Box", "Processor and Memory Features", "Operating System",
    "Display and Audio Features", "Connectivity Features", "Port and Slot Features",
    "Dimensions", "Additional Features", "Battery and Power Features", "Warranty",
    "Manufacturer info", "Manufacturer Information", "Security", "Input",
    "Memory and Storage Features", "Network Features",
}
STOP = {"See less", "Ratings & Reviews", "Questions and Answers", "Reviews",
        "Frequently Bought Together", "Similar Products"}


def _line_sections(lines):
    result, current = {}, None
    start = label_index(lines, "Specifications")
    if start < 0:
        return result
    data = lines[start + 1:]
    index = 0
    while index < len(data):
        label = data[index]
        if label in STOP or label.startswith("Ratings & Reviews"):
            break
        # A field can share its section name (notably "Operating System").
        # Only treat the first occurrence after another section as a heading.
        if label in SECTIONS and label != current:
            current = label
            result.setdefault(current, {})
            index += 1
            continue
        if current and index + 1 < len(data) and data[index + 1] not in SECTIONS | STOP:
            value = data[index + 1]
            if label not in {"See more", "See More", "View more", "more"} and len(label) <= 100:
                result[current].setdefault(label.rstrip(":"), value[:2000])
            index += 2
        else:
            index += 1
    return {section: values for section, values in result.items() if values}


def _nearest_section(node):
    for previous in node.find_all_previous(limit=60):
        if previous.name not in {"h2", "h3", "h4", "div", "span"}:
            continue
        if previous.name in {"div", "span"} and len(previous.find_all()) > 2:
            continue
        value = clean_text(previous)
        if value in SECTIONS:
            return value
    return None


def extract_specifications(soup, lines):
    specs = key_value_tables(soup, S.TABLES)
    structured_evidence = bool(specs)
    sections = _line_sections(lines)
    for table in soup.select("table")[:30]:
        section = _nearest_section(table)
        if not section:
            continue
        for row in table.select("tr")[:120]:
            cells = row.find_all(["th", "td"], recursive=False)
            if len(cells) >= 2:
                key, value = clean_text(cells[0]).rstrip(":"), clean_text(cells[1])
                if key and value and len(key) <= 100:
                    sections.setdefault(section, {}).setdefault(key, value[:2000])
    # The current card layout renders label/value divs rather than HTML tables.
    for card in soup.select(S.SPEC_CARDS)[:100]:
        key = first_text(card, (S.CARD_LABEL,))
        value = first_text(card, (S.CARD_VALUE,))
        if key and value and len(key) <= 100:
            specs.setdefault(key, value[:2000])
            structured_evidence = True
            if section := _nearest_section(card):
                sections.setdefault(section, {}).setdefault(key, value[:2000])
    for label in S.DETAIL_LABELS:
        value = labelled_value(soup, label)
        if value:
            specs.setdefault(label, value)
    for item in soup.select(S.DETAIL_ROWS)[:100]:
        key = first_text(item, ("div._3-wDH3", "div._1UhVsV", "div:first-child"))
        value = first_text(item, ("div._2yeN2S", "ul li", "div:last-child"))
        if key and value and key != value and len(key) <= 100:
            specs.setdefault(key.rstrip(":"), value[:2000])
            structured_evidence = True
    # Plain page text can continue into purchase controls after specifications.
    # When DOM rows exist, use them to validate section membership. The bounded
    # text representation remains a fallback for older layouts with no rows.
    if structured_evidence:
        sections = {name: {key: value for key, value in values.items() if key in specs}
                    for name, values in sections.items()}
        sections = {name: values for name, values in sections.items() if values}
    else:
        for values in sections.values():
            for key, value in values.items():
                specs.setdefault(key, value)
    warranty = {key: specs[key] for key in S.DETAIL_LABELS[:4] if key in specs}
    manufacturer = {key: specs[key] for key in S.DETAIL_LABELS[4:] if key in specs}
    if warranty:
        sections["Warranty"] = warranty
    if manufacturer:
        sections["Manufacturer Information"] = manufacturer
    return {"specifications": specs, "specification_sections": sections}
