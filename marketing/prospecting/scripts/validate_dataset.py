#!/usr/bin/env python3
import argparse
import csv
import sys

REQUIRED_COLUMNS = [
    "Company Name",
    "Industry",
    "Sub-Industry",
    "City",
    "Suburb",
    "Province",
    "Website",
    "Public Business Email",
    "Public Business Phone",
    "LinkedIn",
    "Employee Count",
    "Employee Count Source",
    "Business Size",
    "Technology Dependence",
    "Likely IT Environment",
    "Potential IT Pain Points",
    "Cloud2Tech Services Relevant",
    "Recommended Package",
    "Prospect Score",
    "Priority",
    "Reason for Score",
    "Source",
    "Source URL",
    "Research Date",
    "Outreach Status",
    "Notes",
]


def expected_priority(score: int) -> str:
    if score >= 80:
        return "A"
    if score >= 60:
        return "B"
    if score >= 40:
        return "C"
    return ""


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate prospecting dataset consistency.")
    parser.add_argument("--input", required=True, help="Input CSV path")
    args = parser.parse_args()

    errors = []

    with open(args.input, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        if reader.fieldnames != REQUIRED_COLUMNS:
            errors.append("CSV columns must exactly match required schema and order.")

        for idx, row in enumerate(reader, start=2):
            if not row.get("Company Name", "").strip():
                errors.append(f"Row {idx}: Company Name is required.")

            if not row.get("Source", "").strip():
                errors.append(f"Row {idx}: Source is required.")
            if not row.get("Source URL", "").strip():
                errors.append(f"Row {idx}: Source URL is required.")

            score_text = row.get("Prospect Score", "").strip()
            if score_text:
                try:
                    score = int(score_text)
                    if score < 0 or score > 100:
                        errors.append(f"Row {idx}: Prospect Score must be 0-100.")
                except ValueError:
                    errors.append(f"Row {idx}: Prospect Score must be an integer.")
                    continue

                expected = expected_priority(score)
                given = row.get("Priority", "").strip().upper()
                if given != expected:
                    errors.append(
                        f"Row {idx}: Priority '{given}' does not match score {score} (expected '{expected}')."
                    )

                if score >= 40 and not row.get("Reason for Score", "").strip():
                    errors.append(f"Row {idx}: Reason for Score required for scored outreach rows.")

                if score >= 60 and not row.get("Recommended Package", "").strip():
                    errors.append(f"Row {idx}: Recommended Package required for priority A/B leads.")

    if errors:
        for e in errors:
            print(f"ERROR: {e}")
        return 1

    print("Dataset validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
