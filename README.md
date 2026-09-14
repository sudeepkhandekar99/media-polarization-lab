# Media Polarization Lab

An end-to-end research and analytics platform for studying how news organizations frame the same issues differently using natural language processing, semantic embeddings, and interactive visualization.

> **Status:** Active research and development

## Overview

Media Polarization Lab is being built as both a reproducible NLP research project and an interactive data product.

The project begins with raw news data and develops a complete workflow for:

- data ingestion and validation
- cleaning and normalization
- semantic relevance analysis
- sentence embeddings
- sentiment analysis
- outlet-level semantic representations
- polarization measurement
- dimensionality reduction
- semantic search
- interactive visual analytics

The research methodology is developed and validated in Jupyter before being converted into a production data pipeline.

## Project Workflow

```mermaid
flowchart LR
    A[Raw CSV Data] --> B[Data Exploration]
    B --> C[Cleaning & Validation]
    C --> D[Semantic Analysis]
    D --> E[Centroids & Polarization]
    E --> F[Research Validation]
    F --> G[Production Pipeline]
    G --> H[(Supabase)]
    H --> I[Next.js Analytics App]