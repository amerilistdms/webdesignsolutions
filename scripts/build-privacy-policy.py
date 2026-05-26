#!/usr/bin/env python3
"""Build content/privacy-policy-body.html from content/privacy-policy-source.txt"""

import html
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "content", "privacy-policy-source.txt")
OUT = os.path.join(ROOT, "content", "privacy-policy-body.html")

LINKS = [
    (r"\bprivacy\.compliance@amerilist\.com\b", '<a href="mailto:privacy.compliance@amerilist.com">privacy.compliance@amerilist.com</a>'),
    (r"\bsales@amerilist\.com\b", '<a href="mailto:sales@amerilist.com">sales@amerilist.com</a>'),
    (r"https://www\.amerilist\.com/data-privacy-rights-request", '<a href="https://www.amerilist.com/data-privacy-rights-request" target="_blank" rel="noopener noreferrer">https://www.amerilist.com/data-privacy-rights-request</a>'),
    (r"\bdata privacy rights request\b", '<a href="https://www.amerilist.com/data-privacy-rights-request" target="_blank" rel="noopener noreferrer">Data Privacy Request Form</a>'),
    (r"\bAmeriList\.com\b", '<a href="https://www.amerilist.com" target="_blank" rel="noopener noreferrer">AmeriList.com</a>'),
    (r"\bAmeriList, Inc\.\b", "AmeriList, Inc."),
]

HEADING_RE = re.compile(
    r"^(Privacy Policy|IP Address|Cookies|Registration|Submission Forms|Your Security|Outside Links|Disclosure|"
    r"Privacy and Data Protection Policy|How We Process Privacy Requests|Choice/Opt-out|Contacting Us|"
    r"California Residents|Colorado Resident|Connecticut Resident|Delaware Personal|Indiana Consumer|"
    r"Iowa Consumer|Kentucky Consumer|Montana Consumer|Nebraska Data|New Hampshire Data|Oregon Consumer|"
    r"Tennessee Information|New Jersey Data|Virginia Resident|Utah Resident|Texas Resident|Vermont list broker|"
    r"Right to Knowledge|Compliance with Daniel|Definition of Covered|Enforcement and Compliance|"
    r"Deletion Requests|Appeals Process|Consumer Advocacy|Internal Monitoring|Policy Changes|Questions\?|"
    r".* Act$|.* Rights$|Notice of Compliance).*$",
    re.I,
)


def linkify(text: str) -> str:
    out = html.escape(text)
    for pat, repl in LINKS:
        out = re.sub(pat, repl, out)
    return out


def is_heading(line: str) -> bool:
    line = line.strip()
    if not line or len(line) > 140:
        return False
    if line.endswith(":") and len(line) < 100:
        return True
    if HEADING_RE.match(line):
        return True
    if line.startswith("Privacy Policy"):
        return True
    if re.match(r"^[A-Z][^.]{5,90}(\([A-Z]+\))?:?$", line) and not line.endswith("."):
        return True
    return False


def is_list_block(lines: list[str]) -> bool:
    if len(lines) < 3:
        return False
    if any(len(l) > 350 for l in lines):
        return False
    if any(is_heading(l) for l in lines):
        return False
    return True


def render_lines(lines: list[str]) -> list[str]:
    parts = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if i + 1 < len(lines) and is_heading(line) and not is_heading(lines[i + 1]):
            parts.append(f"<h2>{linkify(line)}</h2>")
            parts.append(f"<p>{linkify(lines[i + 1])}</p>")
            i += 2
            continue
        if is_heading(line):
            parts.append(f"<h2>{linkify(line)}</h2>")
        else:
            parts.append(f"<p>{linkify(line)}</p>")
        i += 1
    return parts


def blocks_to_html(text: str) -> str:
    chunks = re.split(r"\n\s*\n", text.strip())
    parts = []
    for chunk in chunks:
        lines = [ln.strip() for ln in chunk.split("\n") if ln.strip()]
        if not lines:
            continue
        if len(lines) == 1:
            line = lines[0]
            if is_heading(line):
                parts.append(f"<h2>{linkify(line)}</h2>")
            else:
                parts.append(f"<p>{linkify(line)}</p>")
        elif is_list_block(lines):
            parts.append("<ul>")
            for line in lines:
                parts.append(f"<li>{linkify(line)}</li>")
            parts.append("</ul>")
        else:
            parts.extend(render_lines(lines))
    return "\n".join(parts)


def main():
    if not os.path.isfile(SRC):
        raise SystemExit(f"Missing {SRC}")
    with open(SRC, encoding="utf-8") as f:
        text = f.read()
    body = blocks_to_html(text)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(body)
    print("Wrote", OUT)


if __name__ == "__main__":
    main()
