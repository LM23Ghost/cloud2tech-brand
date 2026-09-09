#!/usr/bin/env python3
import argparse
import csv
import re


TARGET_SECTORS = [
    "accounting",
    "law",
    "legal",
    "medical",
    "engineering",
    "property",
    "recruitment",
    "construction",
    "consulting",
    "training",
]


def parse_range(value: str):
    text = (value or "").strip().lower()
    m = re.match(r"^\s*(\d+)\s*-\s*(\d+)\s*$", text)
    if m:
        return int(m.group(1)), int(m.group(2))
    m = re.match(r"^\s*(\d+)\s*$", text)
    if m:
        num = int(m.group(1))
        return num, num
    return None


def in_target_size(employee_count: str) -> bool:
    rng = parse_range(employee_count)
    if not rng:
        return False
    low, high = rng
    return low >= 5 and high <= 30


def in_target_sector(row: dict) -> bool:
    text = f"{row.get('Industry','')} {row.get('Sub-Industry','')}".lower()
    return any(k in text for k in TARGET_SECTORS)


def has_contactable_signal(row: dict) -> bool:
    return any(
        (row.get(k) or "").strip()
        for k in ["Website", "Public Business Email", "Public Business Phone", "LinkedIn"]
    )


def score_value(row: dict) -> int:
    try:
        return int((row.get("Prospect Score") or "").strip())
    except Exception:
        return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate strict high-win 5-30 target shortlist.")
    parser.add_argument("--input", required=True, help="Input 5-30 segment CSV")
    parser.add_argument("--output", required=True, help="Output high-win CSV")
    parser.add_argument("--min-score", type=int, default=60, help="Minimum score threshold")
    parser.add_argument("--limit", type=int, default=20, help="Maximum output rows")
    args = parser.parse_args()

    with open(args.input, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        fieldnames = reader.fieldnames or []

    qualified = []
    for row in rows:
        if not in_target_size(row.get("Employee Count", "")):
            continue
        if not in_target_sector(row):
            continue
        if not has_contactable_signal(row):
            continue
        if score_value(row) < args.min_score:
            continue

        row["Outreach Status"] = "High Win Candidate - Ready"
        existing = (row.get("Notes") or "").strip()
        row["Notes"] = (
            f"{existing} High-win filter match: strict 5-30 size, target sector, contactable public signal, score threshold met."
        ).strip()
        qualified.append(row)

    qualified.sort(key=score_value, reverse=True)
    qualified = qualified[: args.limit]

    with open(args.output, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(qualified)

    print(f"Wrote {len(qualified)} high-win rows.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
