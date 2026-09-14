# Media Polarization Lab

An interactive research project for studying how news outlets differ in the **themes they emphasize within climate coverage** over time.

The current version analyzes climate-related news from 2016–2026 using sentence embeddings, multi-anchor semantic classification, rolling outlet profiles, panel-aware dispersion measures, and longitudinal statistical inference.

> **Important interpretation:** Higher cross-outlet dispersion means outlets are becoming more different in the themes they emphasize. It does **not** by itself establish left-right, partisan, or ideological polarization.

## Live Demo

**Web app:** https://media-polarization-lab.vercel.app/

---

## What We Found

The strongest Version 2 result is concentrated in **climate-impact framing**.

For the primary **Stable 90%** outlet cohort:

- climate-impact divergence increased by approximately **97.47%** from the early to late study period;
- the primary annualized trend is approximately **+0.00572 per year**;
- the trend remains statistically positive with HAC-adjusted uncertainty;
- climate science is comparatively stable;
- **17 of 20** stable outlets show statistically significant positive climate-impact trends;
- **0 of 20** show statistically significant negative trends;
- the best structural-break candidate is **2024-07**, but the bootstrap test does not support a genuine break.

The most defensible conclusion is therefore a **persistent long-run increase in climate-impact framing divergence**, not a single sudden regime change.

---

## Why Version 2 Exists

The original capstone measured overall semantic distance between outlet-month centroids and described that quantity as semantic or political polarization.

That approach showed that outlets occupied different semantic positions, but it could not explain **what they were becoming different about**, and semantic distance alone does not establish ideological direction.

Version 2 redesigns the analysis around interpretable climate themes and stronger longitudinal controls.

Key improvements include:

- larger research corpus;
- six-anchor climate classification instead of one broad anchor;
- human validation of the climate classifier;
- trailing six-month outlet profiles;
- minimum headline requirements;
- six interpretable climate dimensions;
- dynamic, Stable 90%, and fully balanced outlet panels;
- standard deviation and IQR robustness measures;
- HAC-adjusted longitudinal trend inference;
- dimension-to-dimension comparisons;
- outlet-level trend analysis;
- structural-break testing;
- a validated research-to-web JSON contract;
- a public interactive research interface.

For the full Version 1 → Version 2 history, see [`history.md`](./history.md).

---

# Research Design

## Dataset

Version 2 works from an NLP corpus containing approximately:

- **850,409** records;
- **384-dimensional** sentence embeddings;
- climate coverage spanning the 2016–2026 study period.

After climate classification:

- **276,233** climate-related records;
- approximately **32.48%** of the NLP corpus;
- **230** outlets represented in the climate-filtered corpus.

The production analysis used by the web app contains:

- **116 complete months**;
- **2016-06 through 2026-01**;
- **136 outlets** with qualifying analysis data;
- **20 Stable 90% outlets**;
- **6 fully balanced outlets**.

Fully balanced outlets:

- `abcnews.go.com`
- `cbsnews.com`
- `grist.org`
- `latimes.com`
- `theconversation.com`
- `theguardian.com`

---

## Embedding Model

The project uses:

```text
sentence-transformers/all-MiniLM-L6-v2
```

Embedding dimension:

```text
384
```

---

## Climate Classification

Instead of using one general climate anchor, Version 2 uses six semantic anchors:

```text
climate_science
emissions_fossil_fuels
clean_energy_transition
climate_policy
climate_impacts
adaptation_resilience
```

Final climate-relevance threshold:

```text
0.240
```

The classifier was checked against **104 usable human labels**:

- 73 climate relevant;
- 31 not climate relevant.

Final multi-anchor top-2-mean validation performance:

| Metric | Score |
|---|---:|
| Precision | ~0.947 |
| Recall | ~0.740 |
| Specificity | ~0.903 |
| F1 | ~0.831 |
| Balanced accuracy | ~0.822 |
| ROC AUC | ~0.899 |

Single-anchor baseline ROC AUC:

```text
~0.666
```

---

## Outlet-Month Profiles

To reduce noise from sparse individual months, outlet profiles use a:

```text
trailing 6-month semantic window
```

A production outlet-month requires:

```text
>= 50 climate headlines in the rolling window
>= 1 climate headline in the current month
```

This produced approximately:

```text
7,506 qualifying centroid/profile rows
```

before the final application exports.

---

# Climate Dimensions

Each outlet-month is represented by relative emphasis across six themes.

## 1. Climate Science

Scientific research, evidence, physical mechanisms, scientific consensus, and climate-system understanding.

## 2. Emissions & Fossil Fuels

Greenhouse-gas emissions, carbon pollution, fossil-fuel extraction, coal, oil, gas, and decarbonization pressures.

## 3. Clean Energy Transition

Renewable energy, electrification, energy technology, clean-energy investment, and transition away from fossil fuels.

## 4. Climate Policy

Climate legislation, regulation, international agreements, government action, and policy debate.

## 5. Climate Impacts

Wildfires, floods, storms, heat, drought, ecosystem damage, human consequences, and other experienced effects of climate change.

## 6. Adaptation & Resilience

Preparation, adaptation, infrastructure resilience, risk reduction, and responses to expected climate impacts.

The exported `relative_*` measures describe **thematic emphasis relative to the other climate dimensions within that outlet-month**.

They are not sentiment scores or ideology scores.

---

# Measuring Divergence

For every month and climate dimension, the analysis asks:

> How different are outlets from one another in their relative emphasis on this theme?

Primary dispersion measure:

```text
cross-outlet standard deviation
```

Robustness measure:

```text
interquartile range (IQR)
```

Higher values mean outlets are less similar in the relative prominence they give that theme.

---

# Outlet Panels

## Dynamic Panel

Uses all qualifying outlets available in each month.

**Strength:** maximum coverage.

**Risk:** changing outlet composition may affect measured dispersion.

## Stable 90% Panel

Includes outlets observed in at least 90% of complete study months.

```text
20 outlets
```

This is the **primary panel**.

It balances outlet continuity with a larger sample than the fully balanced panel.

## Fully Balanced Panel

Includes only outlets represented throughout the complete analysis period.

```text
6 outlets
```

This is the strictest robustness panel.

---

# Statistical Inference

The project uses longitudinal trend models with:

- annualized slopes;
- HAC-adjusted standard errors;
- confidence intervals;
- p-values;
- dimension contrasts;
- outlet-level trend models;
- structural-break candidate testing;
- bootstrap evaluation of structural-break evidence.

The use of HAC inference matters because monthly observations are temporally dependent.

---

# Main Result

For the primary Stable 90% cohort, climate-impact divergence shows a strong positive long-run trend.

Approximate headline result:

```text
Annualized trend: +0.00572 / year
Early -> late increase: +97.47%
```

A related trend-shape specification produced approximately:

```text
+0.00584 / year
95% CI: [+0.00484, +0.00684]
p < 0.001
```

The climate-impact versus climate-science trend contrast is approximately:

```text
+0.00538 / year
95% CI: [+0.00463, +0.00614]
```

Climate science is comparatively stable, making climate impacts the clearest dimension of increasing divergence.

---

# Outlet-Level Findings

Among the 20 Stable 90% outlets:

```text
17 significant positive climate-impact trends
0 significant negative trends
3 not statistically significant
```

The web app exposes outlet-level:

- coverage continuity;
- early / middle / late climate-impact means;
- annualized climate-impact trend;
- HAC confidence interval;
- p-value;
- full six-dimension monthly trajectory.

---

# Structural Break Result

Best candidate month:

```text
2024-07
```

Bootstrap p-value:

```text
~0.618
```

Interpretation:

> The data do not provide convincing evidence for a single structural break. A persistent long-run increase is the more defensible explanation.

---

# Web Application

The public interface is built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Recharts**, and **Lucide**.

Primary routes:

| Route | Purpose |
|---|---|
| `/` | Overview and headline research result |
| `/explore` | Interactive climate-dimension explorer |
| `/outlets` | Stable-cohort outlet comparison |
| `/outlets/[outlet]` | Individual outlet profile |
| `/methodology` | Research design and interpretation |
| `/data-check` | Internal validation of the research-to-web data contract |

## Explore Controls

The Explore page supports:

### Outlet panel

```text
Dynamic
Stable 90%
Fully balanced
```

### Dispersion measure

```text
Standard deviation
IQR
```

All six climate dimensions update interactively.

---

# Architecture

The project deliberately keeps the MVP simple.

There is **no database or application backend required for the public site**.

The research pipeline exports a frozen JSON contract that the Next.js server reads directly.

```text
Research notebook / Python pipeline
            |
            v
      validated exports
            |
            v
apps/web/data/generated/*.json
            |
            v
  typed server-side loaders
            |
            v
 selectors / transformations
            |
            v
 Next.js server components
            |
            v
 small client chart components
```

The large outlet-profile dataset remains server-side. Individual outlet pages filter it before sending the selected outlet's data into client-side chart components.

---

# Repository Structure

```text
media-polarization-lab/
├── apps/
│   └── web/
│       ├── data/
│       │   └── generated/
│       ├── public/
│       ├── src/
│       │   ├── app/
│       │   │   ├── data-check/
│       │   │   ├── explore/
│       │   │   ├── methodology/
│       │   │   ├── outlets/
│       │   │   ├── layout.tsx
│       │   │   └── page.tsx
│       │   ├── components/
│       │   │   ├── charts/
│       │   │   └── explore/
│       │   └── lib/
│       │       └── data/
│       ├── package.json
│       └── next.config.ts
│
├── data/
│   ├── app/
│   ├── processed/
│   └── webapp/
│
├── notebooks/
│   ├── 00_data_exploration.ipynb
│   └── requirements-research.txt
│
├── src/
├── history.md
└── README.md
```

---

# Web Data Contract

The frontend/server application consumes generated JSON files from:

```text
apps/web/data/generated/
```

Current exports include:

```text
manifest.json
research_summary.json
headline_metrics.json
methodology.json
monthly_dimensions.json
monthly_overall.json
outlet_summary.json
outlet_month_profiles.json
climate_impact_periods.json
climate_impact_rolling_trends.json
climate_impact_structural_breaks.json
climate_dimension_trends.json
climate_impact_outlet_drivers.json
```

The data layer lives in:

```text
apps/web/src/lib/data/
```

and contains:

```text
types.ts
constants.ts
loaders.ts
selectors.ts
index.ts
```

`loaders.ts` is server-only.

Client components should import directly from:

```text
@/lib/data/constants
@/lib/data/selectors
@/lib/data/types
```

rather than the `@/lib/data` barrel, because the barrel also exports server-only loaders.

---

# Local Development

## Web App

From the repository root:

```bash
cd apps/web
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

Production build:

```bash
npm run build
```

---

# Environment Variables

Create:

```text
apps/web/.env.local
```

with:

```env
NEXT_PUBLIC_SITE_URL=https://media-polarization-lab.vercel.app
```

For local-only metadata testing, you may instead use:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Do not commit `.env.local`.

The same production variable should be configured in Vercel.

---

# Research Environment

Create and activate a Python virtual environment, then install the research requirements.

Example:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r notebooks/requirements-research.txt
```

Open the main research notebook:

```text
notebooks/00_data_exploration.ipynb
```

The research pipeline should be treated as the source of truth for analytical outputs.

The JSON files under:

```text
apps/web/data/generated/
```

are the frozen application contract, not the original research source files.

---

# Deployment

The web app is deployed on Vercel:

```text
https://media-polarization-lab.vercel.app/
```

Production environment variable:

```env
NEXT_PUBLIC_SITE_URL=https://media-polarization-lab.vercel.app
```

The application also exposes:

```text
/sitemap.xml
/robots.txt
/manifest.webmanifest
```

and includes Open Graph / Twitter social preview images.

---

# Interpretation Boundaries

This project measures **semantic and thematic divergence**.

It does not directly measure:

- partisan identity;
- left-right ideology;
- factual accuracy;
- misinformation;
- sentiment as the primary outcome;
- causal effects of climate events;
- whether one outlet's framing is normatively better than another's.

A stronger ideological-polarization claim would require an additional ideological axis, such as:

- validated outlet ideology labels;
- partisan group assignments;
- policy-position labels;
- supervised ideological-frame classification;
- or another externally validated political-direction measure.

---

# Remaining Limitations

Version 2 improves substantially on the original capstone, but several limitations remain.

## Headline-level framing

The primary representation still focuses on headline-level semantic framing rather than complete article argumentation.

Full article text could capture:

- evidence selection;
- quoted sources;
- causal claims;
- policy arguments;
- uncertainty language;
- narrative structure.

## Observational design

The analysis identifies longitudinal associations and trends.

It does not establish that a specific event **caused** a change in framing.

## Embedding-model dependence

The analysis relies on `all-MiniLM-L6-v2`.

Alternative embedding models and model ensembles could provide additional robustness.

## Ideology is not directly modeled

Semantic divergence should not be relabeled as ideological polarization without additional evidence.

---

# Version History

For a detailed comparison of the original capstone and the current research design, including methodological weaknesses, Version 2 improvements, and the evolution of the scientific interpretation, see:

**[`history.md`](./history.md)**

---

# Bottom Line

Version 1 established that embedding-based methods could detect persistent semantic differences in climate-news coverage.

Version 2 asks a more precise question:

> **What are outlets becoming different about?**

The current evidence points most clearly to:

> **increasing cross-outlet divergence in climate-impact framing from 2016 to 2026.**

That pattern is:

- large in magnitude;
- statistically supported;
- visible across multiple outlet panels;
- broad across stable outlets;
- stronger than the corresponding climate-science trend;
- and better interpreted as **thematic framing divergence** than ideological polarization.
