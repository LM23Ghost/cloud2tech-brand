#!/usr/bin/env python3
import argparse
import csv
import re
from urllib.parse import urlparse


def norm_company(name: str) -> str:
    value = (name or "").lower()
    value = re.sub(r"\b(proprietary|pty|limited|ltd|inc|cc)\b", "", value)
    value = re.sub(r"[^a-z0-9]+", "", value)
    return value.strip()


def norm_domain(website: str) -> str:
    if not website:
        return ""
    raw = website.strip()
    if not raw:
        return ""
    if "://" not in raw:
        raw = "https://" + raw
    parsed = urlparse(raw)
    host = parsed.netloc.lower().strip()
    if host.startswith("www."):
        host = host[4:]
    return host


def main() -> int:
    parser = argparse.ArgumentParser(description="Normalize and de-duplicate prospect data.")
    parser.add_argument("--input", required=True, help="Input CSV path")
    parser.add_argument("--output", required=True, help="Output deduped CSV path")
    parser.add_argument("--duplicates", required=True, help="Duplicate report CSV path")
    args = parser.parse_args()

    with open(args.input, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        fieldnames = reader.fieldnames or []

    seen_names = {}
    seen_domains = {}
    deduped = []
    duplicates = []

    for row in rows:
        key_name = norm_company(row.get("Company Name", ""))
        key_domain = norm_domain(row.get("Website", ""))

        duplicate_of = None
        if key_name and key_name in seen_names:
            duplicate_of = seen_names[key_name]
        elif key_domain and key_domain in seen_domains:
            duplicate_of = seen_domains[key_domain]

        if duplicate_of:
            duplicates.append(
                {
                    "Duplicate Company": row.get("Company Name", ""),
                    "Duplicate Website": row.get("Website", ""),
                    "Duplicate Of": duplicate_of.get("Company Name", ""),
                    "Duplicate Of Website": duplicate_of.get("Website", ""),
                    "Rule": "normalized_name" if key_name and key_name in seen_names else "domain",
                }
            )
            continue

        if key_name:
            seen_names[key_name] = row
        if key_domain:
            seen_domains[key_domain] = row
        deduped.append(row)

    with open(args.output, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(deduped)

    with open(args.duplicates, "w", newline="", encoding="utf-8") as f:
        fields = ["Duplicate Company", "Duplicate Website", "Duplicate Of", "Duplicate Of Website", "Rule"]
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows(duplicates)

    print(f"Kept {len(deduped)} rows, removed {len(duplicates)} duplicates.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
