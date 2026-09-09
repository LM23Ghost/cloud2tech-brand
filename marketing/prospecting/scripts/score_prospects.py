#!/usr/bin/env python3
import argparse
import csv
import re
from typing import Dict, Tuple

SECTOR_SCORES = {
    "accounting": (9, 8, 8, 8, 8, 7),
    "law": (9, 8, 9, 7, 8, 8),
    "medical": (9, 7, 10, 8, 8, 7),
    "engineering": (8, 7, 7, 8, 8, 6),
    "construction": (8, 6, 6, 8, 7, 6),
    "property": (7, 7, 6, 7, 7, 7),
    "financial": (9, 8, 9, 7, 8, 7),
    "consulting": (8, 8, 6, 6, 7, 7),
    "recruitment": (8, 8, 7, 6, 6, 8),
    "logistics": (8, 6, 7, 9, 8, 6),
    "manufacturing": (8, 6, 6, 9, 8, 5),
    "training": (7, 8, 6, 6, 6, 8),
    "ngo": (7, 7, 7, 6, 6, 7),
    "hospitality": (7, 6, 6, 7, 7, 5),
    "retail": (7, 6, 6, 7, 7, 5),
}

WEIGHTS = {
    "sme": 20,
    "users_devices": 10,
    "cloud": 10,
    "endpoint": 10,
    "cyber": 10,
    "infra": 10,
    "remote": 8,
    "regulatory": 8,
    "no_internal_it": 7,
    "service_fit": 7,
}


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "").strip().lower())


def sector_key(industry: str, sub_industry: str) -> str:
    text = f"{normalize(industry)} {normalize(sub_industry)}"
    for key in SECTOR_SCORES:
        if key in text:
            return key
    return "consulting"


def priority_for_score(score: int) -> str:
    if score >= 80:
        return "A"
    if score >= 60:
        return "B"
    if score >= 40:
        return "C"
    return ""


def recommended_package(score: int) -> str:
    if score >= 80:
        return "Managed IT Growth (M365 + Endpoint + Security + Infrastructure)"
    if score >= 60:
        return "Essential Managed IT (Support + Endpoint + Security Baseline)"
    if score >= 40:
        return "Discovery & Security Baseline Assessment"
    return ""


def relevant_services(key: str) -> str:
    mapping = {
        "law": "Managed IT, endpoint management, Microsoft 365, cybersecurity hardening, backup",
        "medical": "Managed IT, endpoint management, secure access, backup, cybersecurity monitoring",
        "accounting": "Managed IT, Microsoft 365 management, endpoint security, backup",
        "financial": "Managed IT, Microsoft 365, endpoint security, compliance-aware controls",
        "logistics": "Infrastructure/network support, endpoint management, managed IT, cybersecurity",
        "manufacturing": "Infrastructure/network support, managed IT, endpoint management, backup",
    }
    return mapping.get(
        key,
        "Managed IT, endpoint management, Microsoft/cloud services, infrastructure support, cybersecurity",
    )


def size_score(business_size: str) -> int:
    value = normalize(business_size)
    if "5-100" in value or "sme" in value:
        return 20
    if "1-4" in value or "micro" in value:
        return 10
    if "101-250" in value:
        return 14
    return 8


def compute_score(row: Dict[str, str]) -> Tuple[int, str, str, str, str]:
    key = sector_key(row.get("Industry", ""), row.get("Sub-Industry", ""))
    users, cloud, cyber, infra, endpoint, remote = SECTOR_SCORES.get(key, SECTOR_SCORES["consulting"])

    score = 0
    score += size_score(row.get("Business Size", ""))
    score += users
    score += cloud
    score += endpoint
    score += cyber
    score += infra
    score += remote

    reg = 8 if key in {"law", "medical", "accounting", "financial", "recruitment"} else 5
    score += reg

    internal_it = 7 if "sme" in normalize(row.get("Business Size", "")) else 4
    score += internal_it

    fit = 7 if row.get("Website", "").strip() else 3
    score += fit

    if "unknown" in normalize(row.get("Employee Count", "")):
        score -= 6
    if not row.get("Public Business Email", "").strip() and not row.get("Public Business Phone", "").strip():
        score -= 5
    if not row.get("Website", "").strip():
        score -= 4

    score = max(0, min(100, score))
    priority = priority_for_score(score)
    services = relevant_services(key)
    package = recommended_package(score)
    reason = (
        f"Sector fit={key}; business size signal='{row.get('Business Size', 'Unknown')}'; "
        f"website={'yes' if row.get('Website', '').strip() else 'no'}; score derived from reproducible weighted model."
    )
    return score, priority, services, package, reason


def main() -> int:
    parser = argparse.ArgumentParser(description="Score prospect dataset rows.")
    parser.add_argument("--input", required=True, help="Input CSV")
    parser.add_argument("--output", required=True, help="Output CSV")
    args = parser.parse_args()

    with open(args.input, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        fieldnames = reader.fieldnames or []

    for row in rows:
        score, priority, services, package, reason = compute_score(row)
        row["Prospect Score"] = str(score)
        row["Priority"] = priority
        row["Cloud2Tech Services Relevant"] = services
        if package:
            row["Recommended Package"] = package
        row["Reason for Score"] = reason
        if not row.get("Outreach Status", "").strip():
            row["Outreach Status"] = "Not Contacted"

    with open(args.output, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"Scored {len(rows)} rows.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
