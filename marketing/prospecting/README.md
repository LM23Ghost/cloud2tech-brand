# Cloud2Tech Gauteng SME Prospecting Workflow

Positioning anchor: **“Technology that works. Business that grows.”**

This folder provides a repeatable, public-data-only workflow for building and maintaining a Gauteng SME prospecting dataset for Cloud2Tech outreach.

## Folder layout

- `data/prospects_gauteng.csv` — canonical working dataset (CSV)
- `data/prospects_gauteng.xlsx` — Excel output generated from CSV
- `scripts/validate_dataset.py` — schema + scoring/priority checks
- `scripts/score_prospects.py` — reproducible 0–100 scoring + package mapping
- `scripts/normalize_dedupe.py` — normalization and duplicate detection/removal
- `scripts/export_xlsx.py` — dependency-free CSV → XLSX export
- `scripts/generate_top_outreach.py` — creates top-N immediate outreach shortlist with messaging priority notes

## Scope and qualification rules

### In scope
- Gauteng businesses (including Johannesburg, Tshwane/Pretoria, Ekurhuleni, Centurion, Midrand, Sandton, Randburg, Roodepoort, Krugersdorp, Benoni, Boksburg, Germiston, Alberton, Springs, Vereeniging, Vanderbijlpark, Soweto, surrounding commercial areas)
- SME-leaning businesses (target: roughly 5–100 employees where publicly inferable)
- Technology-dependent sectors (accounting, legal, medical, engineering, construction, property, professional services, consulting, recruitment, logistics, manufacturing, training/education, NGOs, hospitality, retail)

### Exclude or deprioritize
- MSPs, IT support providers, cloud providers, software development companies (unless special reason), and very large enterprises.

## Public-data methodology

1. Capture only information visible in public sources (official websites, reputable directories, chambers/professional listings).
2. If not verifiable, use `Unknown` (or leave blank where practical).
3. Keep provenance in `Source` and `Source URL` for every record.
4. Never guess employee counts, contacts, environments, or pain points.
5. Re-run dedupe + score + validation on every update cycle.

## Source hierarchy (trust model)

Higher trust outranks lower trust when records conflict:

1. Official company website/contact/about pages
2. Regulated/professional body listings and chambers
3. Reputable business directories/listings
4. Aggregators with unclear provenance (use carefully, verify later)

Use the latest high-trust source date when replacing prior values.

## Required columns

The canonical CSV must preserve these columns:

1. Company Name
2. Industry
3. Sub-Industry
4. City
5. Suburb
6. Province
7. Website
8. Public Business Email
9. Public Business Phone
10. LinkedIn
11. Employee Count
12. Employee Count Source
13. Business Size
14. Technology Dependence
15. Likely IT Environment
16. Potential IT Pain Points
17. Cloud2Tech Services Relevant
18. Recommended Package
19. Prospect Score
20. Priority
21. Reason for Score
22. Source
23. Source URL
24. Research Date
25. Outreach Status
26. Notes

## Scoring model (0–100, reproducible)

Implemented by `scripts/score_prospects.py`.

Weights:
- SME suitability (Business Size): 20
- User/device likelihood (industry proxy): 10
- Cloud/M365 likelihood (industry + public cloud signal): 10
- Endpoint management need (sector/device profile): 10
- Cybersecurity exposure (sector risk): 10
- Infrastructure/network complexity (multi-site/device/service profile): 10
- Remote/hybrid work likelihood (sector profile): 8
- Regulatory/data sensitivity (legal/medical/finance/etc.): 8
- Likelihood of no internal IT (SME + non-IT profile): 7
- Direct fit to Cloud2Tech services: 7

Priority bands:
- **A**: 80–100
- **B**: 60–79
- **C**: 40–59
- `<40`: keep out of active outreach until enriched

Conservative data-quality penalties are applied when employee count is unknown, direct contact channels are missing, or no official website is captured yet.

## Deduplication rules

Implemented by `scripts/normalize_dedupe.py`:

- Normalize company name (`pty ltd`, punctuation, casing removed)
- Normalize domain from `Website`
- Mark duplicates when normalized name matches, or domain matches and is non-empty
- Keep first-seen row unless manually overridden after source review

## Sales-readiness conventions

- `Outreach Status` default: `Not Contacted`
- Use meaningful `Reason for Score` from scoring output
- `Recommended Package` is set for stronger fits (typically priority A/B)
- Keep `Notes` for qualification call prep (decision-maker, timing, stack clues)

## Ethics and limitations

- Public business data only; no private/personal scraping.
- Respect website terms and local privacy/marketing law requirements.
- Dataset is a prospecting aid, not proof of buying intent.

## Run/update workflow

From repository root:

```bash
python3 marketing/prospecting/scripts/normalize_dedupe.py \
  --input marketing/prospecting/data/prospects_gauteng.csv \
  --output marketing/prospecting/data/prospects_gauteng.csv \
  --duplicates marketing/prospecting/data/duplicates_report.csv

python3 marketing/prospecting/scripts/score_prospects.py \
  --input marketing/prospecting/data/prospects_gauteng.csv \
  --output marketing/prospecting/data/prospects_gauteng.csv

python3 marketing/prospecting/scripts/validate_dataset.py \
  --input marketing/prospecting/data/prospects_gauteng.csv

python3 marketing/prospecting/scripts/export_xlsx.py \
  --input marketing/prospecting/data/prospects_gauteng.csv \
  --output marketing/prospecting/data/prospects_gauteng.xlsx

python3 marketing/prospecting/scripts/generate_top_outreach.py \
  --input marketing/prospecting/data/prospects_gauteng.csv \
  --output marketing/prospecting/data/prospects_gauteng_top20.csv \
  --top 20

python3 marketing/prospecting/scripts/validate_dataset.py \
  --input marketing/prospecting/data/prospects_gauteng_top20.csv

python3 marketing/prospecting/scripts/export_xlsx.py \
  --input marketing/prospecting/data/prospects_gauteng_top20.csv \
  --output marketing/prospecting/data/prospects_gauteng_top20.xlsx
```

If dataset quality checks fail, fix rows and rerun.
