SET local check_function_bodies = off;

CREATE EXTENSION "vector" SCHEMA "extensions";

CREATE TABLE "public"."system_health" (
  "id"         integer                  NOT NULL DEFAULT 1,
  "status"     text                     NOT NULL DEFAULT 'ok'::text,
  "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "system_health_id_check" CHECK ((id = 1)),
  CONSTRAINT "system_health_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."system_health"
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "system health is publicly readable" ON "public"."system_health"
  FOR SELECT
  TO "anon", "authenticated"
  USING (true);

COMMENT ON EXTENSION "vector" IS 'vector data type and ivfflat and hnsw access methods';

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."system_health" TO "anon", "authenticated", "postgres", "service_role";

comment on table public.system_health is
'Simple infrastructure health check used to verify application-to-database connectivity.';