#!/usr/bin/env python3
import argparse
import csv


def to_int(value: str) -> int:
    try:
        return int((value or "").strip())
    except Exception:
        return 0


def messaging_priority(industry: str, sub_industry: str) -> str:
    text = f"{(industry or '').lower()} {(sub_industry or '').lower()}"
    if "legal" in text or "law" in text:
        return "Data confidentiality and compliance-first managed IT."
    if "medical" in text or "clinic" in text or "hospital" in text:
        return "Secure patient systems uptime, backup, and endpoint protection."
    if "accounting" in text or "financial" in text:
        return "Microsoft 365 security, backup resilience, and user support."
    if "logistics" in text or "transport" in text:
        return "Always-on connectivity for distributed users, fleets, and branches."
    if "manufacturing" in text:
        return "Stable operations network, endpoint controls, and ransomware defense."
    if "property" in text or "real estate" in text:
        return "Reliable branch connectivity, secure document workflows, and support."
    if "recruitment" in text:
        return "Secure collaboration and endpoint management for high-turnover teams."
    return "Managed IT baseline with proactive support and cybersecurity hardening."


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate immediate outreach shortlist from ranked prospects.")
    parser.add_argument("--input", required=True, help="Canonical prospects CSV")
    parser.add_argument("--output", required=True, help="Top outreach shortlist CSV")
    parser.add_argument("--top", type=int, default=20, help="Top N records to keep")
    args = parser.parse_args()

    with open(args.input, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        fieldnames = reader.fieldnames or []

    rows = [r for r in rows if to_int(r.get("Prospect Score", "")) >= 40]
    rows.sort(key=lambda r: to_int(r.get("Prospect Score", "")), reverse=True)
    top_rows = rows[: args.top]

    for index, row in enumerate(top_rows, start=1):
        message = messaging_priority(row.get("Industry", ""), row.get("Sub-Industry", ""))
        row["Outreach Status"] = "Ready - Wave 1"
        existing = (row.get("Notes", "") or "").strip()
        row["Notes"] = (
            f"{existing} Outreach Rank: {index}. Messaging Priority: {message}".strip()
        )

    with open(args.output, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(top_rows)

    print(f"Wrote {len(top_rows)} outreach rows.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
