# Supabase

This directory contains the database configuration and migration history for Media Polarization Lab.

## Workflow

Database schema changes should be created through versioned migrations and committed to Git.

Create a migration:

```bash
npx supabase migration new <migration_name>