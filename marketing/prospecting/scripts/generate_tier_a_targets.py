#!/usr/bin/env python3
import argparse
import csv


INCLUDE_KEYWORDS = [
    "accounting",
    "law",
    "legal",
    "medical",
    "clinic",
    "engineering",
    "property",
    "real estate",
    "recruitment",
    "construction",
    "consulting",
    "training",
]

EXCLUDE_ENTERPRISE_KEYWORDS = [
    "bdo",
    "mazars",
    "grant thornton",
    "netcare",
    "imperial logistics",
    "super group",
    "rcl foods",
    "tiger brands",
    "nampak",
    "barloworld",
    "tsogo sun",
    "city lodge",
    "clicks",
    "dis-chem",
    "spar",
    "pick n pay",
]


def as_text(*parts: str) -> str:
    return " ".join((p or "").lower() for p in parts)


def is_included(row: dict) -> bool:
    txt = as_text(row.get("Industry"), row.get("Sub-Industry"), row.get("Notes"))
    return any(k in txt for k in INCLUDE_KEYWORDS)


def is_excluded_enterprise(row: dict) -> bool:
    name = (row.get("Company Name") or "").lower()
    return any(k in name for k in EXCLUDE_ENTERPRISE_KEYWORDS)


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate Tier A target dataset for Cloud2Tech.")
    parser.add_argument("--input", required=True, help="Canonical CSV path")
    parser.add_argument("--output", required=True, help="Tier A target CSV path")
    parser.add_argument("--limit", type=int, default=50, help="Maximum rows")
    args = parser.parse_args()

    with open(args.input, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        fieldnames = reader.fieldnames or []

    filtered = []
    for row in rows:
        if not is_included(row):
            continue
        if is_excluded_enterprise(row):
            continue
        row["Outreach Status"] = "Tier A Target - Verify"
        existing = (row.get("Notes") or "").strip()
        row["Notes"] = (
            f"{existing} Tier A profile match: sector fit and SME-leaning service model; verify 5-50 employees and Microsoft 365 usage."
        ).strip()
        filtered.append(row)

    filtered.sort(key=lambda r: int((r.get("Prospect Score") or "0").strip() or "0"), reverse=True)
    filtered = filtered[: args.limit]

    with open(args.output, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(filtered)

    print(f"Wrote {len(filtered)} Tier A target rows.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
