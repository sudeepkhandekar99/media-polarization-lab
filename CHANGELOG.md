# Project History — Media Polarization Lab

## 1. Purpose of this document

This document records how the project evolved from the original capstone, **“Quantifying Political Polarization in News Media,”** into the current **Media Polarization Lab / Version 2** research pipeline and public web application.

The goal is to preserve four things clearly:

1. what the original project attempted to measure;
2. what weaknesses or ambiguities remained in that approach;
3. what Version 2 changed methodologically and technically; and
4. what the newer analysis actually supports as a research finding.

The most important evolution is conceptual:

> **Version 1 treated semantic distance between outlets as “political polarization.” Version 2 narrows the claim to cross-outlet thematic or framing divergence unless ideological direction is measured separately.**

That change is not just wording. It aligns the research claim with what the underlying measurements can actually establish.

---

# 2. Version 1 — Original Capstone

## 2.1 Original research question

The original project asked whether political polarization in news media could be quantified computationally by examining differences in how news outlets framed climate-related coverage.

Climate change was used as the substantive domain because it combines science, public policy, economics, energy, environmental risk, and political disagreement.

The original project framed semantic differences between news outlets as a form of **media or political polarization**.

## 2.2 Original dataset

The original report used the MediaCloud news dataset.

The reported dataset contained approximately:

- **133,776 headlines**
- primarily English-language content
- coverage from **January 2016 through February 2026**
- source-domain identifiers, URLs, dates, language, and other metadata

The original pipeline consolidated MediaCloud CSV exports, normalized dates, removed malformed records and duplicates, and then applied climate filtering.

## 2.3 Original climate filtering

Version 1 already improved on simple keyword filtering by using sentence embeddings.

The pipeline used:

- `sentence-transformers/all-MiniLM-L6-v2`
- **384-dimensional embeddings**
- one broad climate anchor containing terms such as climate change, carbon emissions, renewable energy, climate policy, global warming, and environmental sustainability
- cosine similarity between each headline and the climate anchor
- an inclusion threshold of approximately **0.25**

This was a useful first step because semantically related climate stories could be retrieved even when they did not use exact climate keywords.

However, the original report described the threshold as empirically chosen without presenting a full human-labeled validation study with precision, recall, specificity, F1, and ROC AUC.

## 2.4 Original sentiment analysis

Version 1 also used **VADER sentiment analysis**.

Each headline received positive, neutral, negative, and compound sentiment values. Monthly sentiment was then compared with the semantic polarization measure.

The main result was that sentiment and semantic distance were only weakly related:

- **R² ≈ 0.043**

This showed an important distinction:

> Two outlets can use similar emotional tone while still framing the same subject differently.

That insight remains useful, but sentiment is no longer the central outcome in Version 2.

## 2.5 Original polarization metric

For each outlet and month, Version 1 averaged headline embeddings into an **outlet-month centroid**.

Then, within each month:

1. pairwise cosine distances were calculated between outlet centroids;
2. those distances were averaged;
3. the resulting mean distance was called the monthly **semantic polarization score**.

The original report described typical values around:

- **0.25 to 0.35**
- with a mean near **0.30**

The main interpretation was that climate coverage showed a persistent, moderate level of semantic divergence across outlets.

## 2.6 Original findings

The original report emphasized four conclusions.

### Persistent moderate divergence

Outlets maintained different semantic positions over time, with monthly pairwise-distance scores remaining broadly moderate.

### Sentiment was not the same as framing

The low sentiment/polarization regression fit suggested that emotional tone did not explain most semantic framing differences.

### Major climate events changed volume more reliably than divergence

Headline volume increased around important climate events, but the report did not find a consistent relationship between greater attention and convergence in framing.

### Embeddings captured framing differences that sentiment could not

The original work established that transformer embeddings were more useful than simple sentiment alone for detecting semantic differences in climate coverage.

---

# 3. What Was Missing in Version 1

Version 1 was a strong exploratory capstone, but several methodological issues prevented the strongest interpretation of its results.

## 3.1 “Political polarization” was stronger than the metric justified

The largest conceptual issue was terminology.

The original metric measured:

> **semantic distance between outlet-level embedding centroids**

That establishes that outlets are talking about climate issues differently in semantic space.

It does **not**, by itself, establish that those differences are left versus right, liberal versus conservative, partisan, or ideologically ordered.

An outlet could differ because it emphasizes physical climate impacts, policy, energy technology, adaptation, emissions, science, local events, economics, or some other thematic dimension.

Therefore:

> **semantic divergence is not automatically ideological polarization.**

Version 2 explicitly corrects this interpretation.

## 3.2 The original metric was too aggregated

A single average pairwise cosine-distance score answered:

> “How different are outlets overall?”

But it could not answer:

> “What are they becoming different about?”

That distinction became the central motivation for Version 2.

If overall semantic distance rises, the original metric does not explain whether the change comes from science, policy, emissions, fossil fuels, clean energy, impacts, adaptation, or some other theme.

Version 2 decomposes the semantic space into interpretable climate dimensions.

## 3.3 Outlet composition was not sufficiently controlled

The set of outlets available in every month can change.

That creates a major identification problem:

> If the outlets entering and leaving the sample change, an apparent increase in cross-outlet distance can occur even when individual outlets themselves have not changed much.

Version 1 largely treated the observed monthly outlet set as the analysis population.

Version 2 directly addresses this through multiple panel definitions.

## 3.4 Sparse outlet-months could make centroids noisy

A centroid based on very few climate headlines may not reliably represent an outlet's framing position.

Version 1 did not make minimum rolling-window coverage a central part of the design.

Version 2 adds explicit sample requirements and rolling windows before an outlet-month profile is accepted.

## 3.5 Climate classification required stronger validation

The original project used one broad climate anchor and a threshold around 0.25.

That was a reasonable prototype, but Version 2 asks a stricter question:

> Does the classifier actually separate climate-relevant and non-climate stories when checked by humans?

Version 2 therefore adds a labeled validation set and formal classifier metrics.

## 3.6 Descriptive patterns were not enough

Version 1 primarily described average semantic distance, time-series movement, event spikes, PCA positions, and sentiment relationships.

It did not provide a sufficiently strong inferential framework for determining whether a long-run divergence trend was statistically distinguishable from noise.

Version 2 adds regression-based trend estimation, HAC-adjusted uncertainty, confidence intervals, p-values, panel robustness, dimension contrasts, and structural-break testing.

## 3.7 Event narratives could be overinterpreted

The original report discussed months such as major climate events and disasters when divergence appeared elevated.

Those observations were interesting, but they were observational.

Version 2 is more conservative:

- candidate break dates can be searched;
- but they are not described as structural changes unless statistical testing supports them.

This produces a more defensible longitudinal story.

---

# 4. Version 2 — Research Redesign

Version 2 is not simply a larger rerun of the original notebook.

It changes the object being measured.

Instead of asking:

> “How politically polarized are news outlets?”

the primary question becomes:

> **“Are news outlets becoming more different in the climate themes they emphasize, and which themes are driving that divergence?”**

This narrower question is much better matched to the available data.

---

# 5. Version 2 Dataset

The Version 2 NLP corpus contains:

- **850,409 articles/headline records**
- **384-dimensional MiniLM embeddings**
- coverage across the same broad 2016–2026 period

After climate classification:

- **276,233 climate articles**
- approximately **32.48%** of the NLP corpus
- **230 outlets** represented in the climate-filtered data

The production application analysis ultimately contains:

- **116 complete months**
- **June 2016 through January 2026**
- **136 outlets** with qualifying analysis data

This is a substantial expansion from the approximately 133,776-headline dataset described in the original report.

---

# 6. Version 2 Climate Classifier

## 6.1 From one anchor to six anchors

Instead of relying on one broad climate anchor, Version 2 uses six semantic climate anchors:

1. `climate_science`
2. `emissions_fossil_fuels`
3. `clean_energy_transition`
4. `climate_policy`
5. `climate_impacts`
6. `adaptation_resilience`

For climate relevance, the classifier uses a multi-anchor score based on the strongest semantic matches.

The final relevance threshold is:

- **0.240**

## 6.2 Human validation

A major improvement is that the classifier is evaluated against human labels.

Final usable validation set:

- **104 labeled examples**
- **73 climate relevant**
- **31 not climate relevant**

For the final multi-anchor top-2-mean classifier:

- **Precision ≈ 0.947**
- **Recall ≈ 0.740**
- **Specificity ≈ 0.903**
- **F1 ≈ 0.831**
- **Balanced accuracy ≈ 0.822**
- **ROC AUC ≈ 0.899**

For comparison, the earlier single-anchor baseline had:

- **ROC AUC ≈ 0.666**

This is one of the clearest methodological upgrades in Version 2.

The classifier is no longer justified primarily by intuition around a threshold. It has an explicit human-validation benchmark.

---

# 7. Version 2 Outlet-Month Representation

## 7.1 Rolling semantic windows

Version 2 uses a **trailing six-month semantic window** to construct an outlet's representation.

A production outlet-month requires:

- at least **50 climate headlines** in the rolling window; and
- at least **1 climate headline in the current month**.

This creates more stable outlet profiles than relying on potentially sparse single-month headline sets.

The initial production centroid dataset contained:

- **7,506 centroid rows**
- **136 qualifying outlets**

## 7.2 Why the rolling window matters

The rolling window reduces noise from small monthly samples, unusually quiet months, temporary coverage gaps, and highly event-specific headline bursts.

At the same time, requiring current-month coverage prevents an old six-month history from being treated as if it represents an outlet that has disappeared from the current month.

---

# 8. Version 2 Climate Dimensions

This is the biggest analytical change from Version 1.

Version 1 reduced each month to one overall semantic-distance statistic.

Version 2 asks how outlets differ along six interpretable climate themes.

For each outlet-month, the analysis constructs relative thematic emphasis for:

- climate science;
- emissions and fossil fuels;
- clean-energy transition;
- climate policy;
- climate impacts;
- adaptation and resilience.

The key word is **relative**.

For example, `relative_climate_impacts` means an outlet's climate-impact emphasis relative to its other climate-theme emphasis in that outlet-month.

It is not sentiment, factual accuracy, support for climate policy, ideology, or a left/right score.

---

# 9. Version 2 Measures Divergence by Theme

For every month and climate dimension, Version 2 measures how dispersed outlet-level relative emphasis is.

The primary measure is:

- **cross-outlet standard deviation**

A robustness measure is:

- **interquartile range (IQR)**

Interpretation:

> Higher dispersion means outlets are becoming more different from one another in how strongly they emphasize that climate theme.

This finally answers the question Version 1 could not:

> **What aspect of climate framing is diverging?**

---

# 10. Version 2 Panel Design

Version 2 explicitly controls for outlet availability using three panels.

## Dynamic panel

Uses qualifying outlets available in each month.

Advantage:

- maximum coverage.

Risk:

- changing outlet composition may influence measured dispersion.

## Stable 90% panel

Requires outlets to appear in at least 90% of complete study months.

This produces:

- **20 stable outlets**

This is the primary panel.

It provides a useful balance between sample size, longitudinal continuity, and protection against changing-composition bias.

## Fully balanced panel

Requires complete presence across the full analysis period.

This produces **6 outlets**:

- `abcnews.go.com`
- `cbsnews.com`
- `grist.org`
- `latimes.com`
- `theconversation.com`
- `theguardian.com`

This is the strictest robustness panel.

The fact that the main pattern remains visible under stricter panel definitions materially strengthens the result.

---

# 11. Version 2 Statistical Inference

Version 2 moves beyond visual time-series interpretation.

The primary longitudinal models estimate time trends with:

- regression-based slopes,
- annualized effects,
- HAC-adjusted standard errors,
- confidence intervals,
- and p-values.

This matters because monthly observations are serially related.

A conventional regression that assumes fully independent months would understate uncertainty.

HAC inference makes the trend claims substantially more defensible.

---

# 12. Main Version 2 Finding

The strongest result is **not** that generic political polarization increased.

The strongest result is:

> **Cross-outlet divergence in relative climate-impact framing increased substantially over time.**

For the primary Stable 90% cohort:

- annualized trend in climate-impact dispersion ≈ **+0.00572 per year**
- trend-shape specification ≈ **+0.00584 per year**
- 95% CI approximately **[+0.00484, +0.00684]**
- p-value effectively **< 0.001**
- early-to-late period increase ≈ **+97.47%**

In plain language:

> By the late study period, outlets were nearly twice as dispersed in how strongly they emphasized climate impacts as they were in the early study period.

---

# 13. Why Climate Impacts Matter

The six-dimensional decomposition reveals something the original polarization score could not show.

The strongest long-run divergence is concentrated in:

> **climate impacts**

rather than being equally present across every climate dimension.

Climate science is comparatively stable.

The estimated impact-versus-science trend contrast is approximately:

- **+0.00538 per year**
- 95% CI approximately **[+0.00463, +0.00614]**
- statistically significant

This is a much more informative finding than:

> “overall semantic polarization is moderate.”

Version 2 identifies the thematic dimension responsible for the strongest divergence.

---

# 14. Outlet-Level Evidence

The result is not driven only by an aggregate statistic.

Among the **20 Stable 90% outlets**:

- **17** show statistically significant positive climate-impact trends;
- **0** show statistically significant negative trends;
- **3** are not statistically significant.

This is important because it shows that the broader result is widespread across the stable cohort rather than being entirely generated by one or two extreme outlets.

Outlet-level analysis also makes it possible to inspect coverage continuity, early/middle/late climate-impact means, annualized outlet trends, confidence intervals, p-values, and six-dimensional monthly thematic trajectories.

---

# 15. Structural Break Analysis

The stable-panel analysis identifies:

- **July 2024** as the best candidate structural-break month.

However:

- bootstrap p-value ≈ **0.618**

Therefore the candidate break is **not statistically supported**.

The correct interpretation is:

> The evidence is more consistent with a persistent long-run increase than with one sudden regime change beginning in July 2024.

This is a methodological improvement over visually associating isolated spikes with external events.

---

# 16. Version 1 vs Version 2

| Area | Version 1 | Version 2 |
|---|---|---|
| Core framing | Political / semantic polarization | Thematic framing divergence |
| Main claim | Outlets occupy different semantic positions | Outlets increasingly differ in specific climate-theme emphasis |
| Dataset scale | ~133,776 headlines | 850,409 NLP records; 276,233 climate records |
| Embedding model | MiniLM-L6-v2 | MiniLM-L6-v2 |
| Embedding dimension | 384 | 384 |
| Climate classifier | One broad climate anchor | Six-anchor semantic classifier |
| Threshold | ~0.25 | 0.240 |
| Human validation | Limited / described qualitatively | 104 labeled examples with full performance metrics |
| Baseline classifier AUC | Not emphasized | ~0.666 |
| Final classifier AUC | Not reported | ~0.899 |
| Outlet representation | Monthly centroid | Trailing 6-month profile with minimum coverage rules |
| Minimum sample rule | Not central | ≥50 climate headlines/window + ≥1 current-month headline |
| Main outcome | Mean pairwise cosine distance | Dimension-specific cross-outlet dispersion |
| Interpretability | Low-to-medium | High: six named climate dimensions |
| Sentiment | Major analytical branch | No longer central to primary finding |
| Outlet composition | Primarily dynamic | Dynamic + Stable 90% + fully balanced |
| Primary cohort | Changing monthly set | Stable 90% cohort, 20 outlets |
| Strict robustness panel | None | Fully balanced, 6 outlets |
| Spread metrics | Mean semantic distance | Standard deviation + IQR |
| Trend statistics | Primarily descriptive | HAC trend models, CIs, p-values |
| Theme-specific contrasts | No | Yes |
| Structural-break test | No formal test | Candidate search + bootstrap test |
| Outlet-level trend inference | Limited | Yes, for stable outlets |
| Main empirical result | Persistent moderate semantic divergence | Climate-impact framing divergence rises ~97% early-to-late |
| Ideological interpretation | Often described as political polarization | Explicitly not claimed without ideology labels |
| Public application | Prototype/dashboard orientation | Dedicated Next.js research interface |
| Reproducible app contract | Not central | Frozen JSON data contract + validation page |

---

# 17. Improvements Relative to the Original Report's Own Limitations

The original report already identified several areas for future work. Version 2 directly addresses a number of them.

## Stronger climate classification

Original limitation:

- fixed semantic anchor;
- threshold uncertainty;
- possibility of borderline false positives/negatives.

Version 2:

- six climate anchors;
- multi-anchor scoring;
- threshold retuning;
- human-labeled validation;
- precision, recall, specificity, F1, balanced accuracy, and ROC AUC.

## Richer outlet-level characterization

Original future-work direction:

- richer outlet characterization,
- topic or cluster structure,
- identification of divergent outlets.

Version 2:

- six interpretable thematic dimensions;
- outlet-level monthly profiles;
- outlet-specific climate-impact trends;
- early/middle/late comparisons;
- identification of strongest trend drivers.

The new design does not rely on opaque PCA positions alone.

## Robustness to design choices

Original future-work direction:

- alternative aggregation strategies;
- stronger robustness assessment.

Version 2:

- rolling six-month profiles;
- minimum headline requirements;
- three panel definitions;
- standard deviation and IQR;
- theme comparisons;
- stable versus fully balanced panels.

This makes the main result much harder to explain as a sample-composition artifact.

## Statistical significance

Original future-work direction:

- incorporate statistical methods for assessing whether observed polarization patterns are meaningful.

Version 2:

- formal longitudinal trend estimation;
- HAC standard errors;
- confidence intervals;
- p-values;
- outlet-level significance;
- dimension contrasts;
- structural-break bootstrap testing.

## Public-facing research interface

Original future-work direction:

- expand the work into a public-facing platform for interactive analysis.

Version 2 now includes a deployed Next.js application with:

- Overview
- Explore
- Outlets
- individual outlet profiles
- Methodology
- interactive panel controls
- standard-deviation/IQR controls
- longitudinal charts
- outlet-level trajectories
- research interpretation notes
- SEO/social metadata
- sitemap and robots configuration
- a validated research-to-web JSON contract

This converts the project from a notebook/report result into an explorable research product.

---

# 18. What Version 2 Did Not Change

Version 2 is stronger, but it should not be described as solving every limitation from the original report.

## Full-text analysis is still not the core unit

The original report suggested moving from headlines to full article text.

Version 2's primary semantic framing pipeline still centers on headline-level climate representations.

Therefore the project still measures:

> editorial framing as expressed through headline language,

not every argument, source, factual claim, or narrative structure contained in the full article.

## It is still observational

Version 2 has stronger inference about trends, but it does not establish causal effects such as:

> “Event X caused news outlets to diverge.”

Structural-break testing helps evaluate changes in the series, but causal identification would require a different research design.

## It still does not measure ideology

Version 2 intentionally avoids treating semantic divergence as ideological polarization.

To make a defensible left/right polarization claim, a future version would need something such as validated outlet ideology labels, issue-position labels, political frame labels, partisan group structure, or a supervised ideological direction measure.

Then the analysis could test whether divergence occurs **along that ideological axis**.

---

# 19. The Most Important Change in Scientific Interpretation

The original project could reasonably say:

> Outlets exhibit persistent semantic differences in their climate coverage.

It was much harder to defend:

> Those semantic differences quantify political polarization.

Version 2 fixes this by narrowing and sharpening the claim.

The current project supports:

> **News outlets have become increasingly different in the relative emphasis they place on climate impacts, and this increase is robust across longitudinal panel restrictions and statistical specifications.**

It does **not** automatically support:

> News outlets have become more ideologically polarized.

This distinction is central to the credibility of the project.

---

# 20. What We Have Actually Found

The current evidence supports the following research narrative.

### 1. Climate coverage is multidimensional

Outlets do not simply differ in whether they cover climate change.

They differ in which parts of the climate story they emphasize.

### 2. The dimensions do not evolve identically

The strongest long-run divergence is concentrated in **climate-impact framing**.

Climate-science framing is much more stable by comparison.

### 3. Climate-impact divergence has increased substantially

In the primary stable cohort, climate-impact dispersion increased by roughly **97% from the early to late study period**.

### 4. The increase is statistically robust

The primary annualized trend is positive with a confidence interval well above zero under HAC-adjusted inference.

### 5. The result survives panel restrictions

The pattern remains visible when moving from the dynamic panel, to the Stable 90% cohort, to the fully balanced six-outlet panel.

### 6. The result is widespread across outlets

Seventeen of the twenty stable outlets exhibit statistically significant positive outlet-level climate-impact trends.

### 7. There is no convincing single structural break

July 2024 is the best candidate date mathematically, but bootstrap testing does not support a genuine break.

The more defensible conclusion is a persistent long-run trend.

---

# 21. Why Version 2 Is a Better Research Project

Version 1 demonstrated that semantic embeddings could quantify differences in climate news coverage.

Version 2 turns that demonstration into a more defensible longitudinal study.

The improvement can be summarized as:

### Version 1

> “Outlets are semantically different.”

### Version 2

> “Outlets are increasingly different in a specific, interpretable part of climate framing — climate impacts — and that pattern survives classifier validation, panel restrictions, alternative dispersion measures, longitudinal inference, and outlet-level analysis.”

That is a much stronger contribution because the result is more interpretable, more statistically defensible, less sensitive to changing sample composition, better validated, more transparent about what it does not prove, and easier to inspect through the public web application.

---

# 22. Current Public Product

The research is now exposed through the **Media Polarization Lab** web application.

Primary routes:

- `/` — research overview and headline result
- `/explore` — interactive comparison across climate dimensions, panels, and dispersion measures
- `/outlets` — stable-cohort outlet analysis
- `/outlets/[outlet]` — individual outlet trajectories
- `/methodology` — research design and interpretation
- `/data-check` — internal validation of the web data contract

Deployment:

`https://media-polarization-lab.vercel.app/`

The web application intentionally repeats the main interpretation boundary:

> **Higher dispersion means outlets are becoming more different in the themes they emphasize within climate coverage. It does not by itself mean left-right political polarization.**

---

# 23. Version History Summary

## Version 1 — Exploratory Capstone

**Goal:** Show that NLP and sentence embeddings can quantify differences in climate-news framing.

**Main method:** Mean pairwise cosine distance between monthly outlet centroids.

**Main result:** Moderate persistent semantic divergence, weak relationship with sentiment.

**Strength:** Demonstrated feasibility of embedding-based media-framing analysis.

**Weakness:** The term “political polarization” was broader than the semantic-distance metric could directly establish.

## Version 2 — Media Polarization Lab

**Goal:** Determine which climate framing dimensions are diverging, whether the change is persistent, and whether it survives stronger longitudinal controls.

**Main method:** Multi-anchor climate classification, rolling outlet profiles, six relative climate dimensions, panel-aware cross-outlet dispersion, HAC trend inference, outlet-level analysis, and robustness checks.

**Main result:** Climate-impact framing divergence rises substantially over the study period, approximately doubling from the early to late period in the primary stable cohort.

**Strength:** The claim is now more interpretable, validated, robust, statistically supported, and appropriately bounded.

---

# 24. Bottom Line

The project did not simply become “a larger version” of the original capstone.

It changed from an exploratory **semantic polarization score** into an interpretable and statistically tested study of **thematic divergence in climate framing**.

The major scientific improvement is that Version 2 can answer not only:

> “Are outlets different?”

but also:

> **“What are they becoming different about, how quickly is that divergence changing, is the trend statistically credible, does it survive panel restrictions, and which outlets contribute to it?”**

The answer, based on the current analysis, is:

> **Climate-impact framing is the clearest dimension of increasing cross-outlet divergence from 2016 to 2026. The increase is persistent, broad across stable outlets, robust to stricter panel construction, and not adequately described as ideological polarization without additional ideological labels.**
