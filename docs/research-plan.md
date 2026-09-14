# Research Plan

## Objective

Develop and validate a computational framework for measuring differences in how news organizations frame related issues.

The research will be completed before the methodology is implemented as a production pipeline.

## Phase 1 — Dataset Understanding

Questions:

- What files are available?
- What does each row represent?
- What columns exist?
- Which fields are reliable?
- How much data is missing?
- How many duplicate records exist?
- What is the true temporal coverage?
- How are sources distributed?
- Are outlet identifiers consistent?
- Are there malformed records?

Deliverable:

A documented understanding of the raw dataset.

## Phase 2 — Cleaning

Investigate:

- invalid headlines
- invalid dates
- duplicate records
- near duplicates
- outlet normalization
- language consistency
- URL normalization
- missing metadata

Deliverable:

A reproducible canonical dataset.

## Phase 3 — Baseline Methodology

Reproduce the baseline methodology before modifying it.

Candidate components include:

- sentence embeddings
- semantic relevance filtering
- sentiment analysis
- outlet-month aggregation
- semantic centroids
- cosine distance
- temporal polarization metrics
- PCA
- semantic retrieval

Deliverable:

A reproducible baseline against which improvements can be measured.

## Phase 4 — Methodology Validation

Validate assumptions including:

- relevance thresholds
- duplicate sensitivity
- minimum sample sizes
- centroid stability
- alternative aggregation methods
- alternative distance metrics
- model sensitivity

Deliverable:

A defensible final methodology.

## Phase 5 — Advanced Analysis

Potential analysis includes:

- UMAP projections
- topic discovery
- outlet similarity
- semantic drift
- divergent outlet pairs
- bridging outlets
- event-level analysis
- confidence and variability measures

Only analyses supported by the data will be retained.

## Phase 6 — Research Freeze

The research phase is considered complete when:

- transformations are reproducible
- methodology is documented
- important assumptions are validated
- final analytical outputs can be generated deterministically
- web-ready datasets can be exported

At this point the methodology can be productionized.