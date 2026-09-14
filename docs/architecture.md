# System Architecture

## Overview

Media Polarization Lab is designed as two connected systems:

1. a reproducible research environment
2. a production analytics platform

Research determines the methodology. The production pipeline implements the validated methodology.

## High-Level Architecture

```mermaid
flowchart TD
    CSV[CSV Dataset]

    subgraph Research
        NB[Jupyter Research]
        VALIDATE[Methodology Validation]
    end

    subgraph Pipeline
        INGEST[Extract]
        TRANSFORM[Transform]
        LOAD[Load]
    end

    subgraph Supabase
        STORAGE[Storage]
        PG[(PostgreSQL)]
        VECTOR[(pgvector)]
        REALTIME[Realtime]
    end

    subgraph Application
        WEB[Next.js]
        DASH[Analytics]
        PLAY[Semantic Playground]
        CASE[Case Study]
    end

    CSV --> NB
    NB --> VALIDATE

    VALIDATE --> INGEST

    CSV --> INGEST
    INGEST --> TRANSFORM
    TRANSFORM --> LOAD

    LOAD --> PG
    LOAD --> VECTOR
    CSV --> STORAGE

    PG --> WEB
    VECTOR --> WEB
    REALTIME --> WEB

    WEB --> DASH
    WEB --> PLAY
    WEB --> CASE