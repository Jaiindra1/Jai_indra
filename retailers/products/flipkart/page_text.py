"""Bounded text-section helpers for rendered Flipkart product pages."""
from ..html_utils import clean_text


def page_lines(soup):
    body = soup.body or soup
    return [value for raw in body.get_text("\n", strip=True).splitlines()
            if (value := clean_text(raw))]


def label_index(lines, label):
    wanted = label.casefold().rstrip(":")
    return next((index for index, value in enumerate(lines)
                 if value.casefold().rstrip(":") == wanted), -1)


def selected_value(lines, label):
    index = label_index(lines, label)
    return lines[index + 1] if 0 <= index < len(lines) - 1 else None


def bounded_section(lines, start, ends=(), limit=40):
    index = label_index(lines, start)
    if index < 0:
        return []
    result = []
    for value in lines[index + 1:index + 1 + limit]:
        if any(value.casefold().startswith(end.casefold()) for end in ends):
            break
        result.append(value)
    return result
