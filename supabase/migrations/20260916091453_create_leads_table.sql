/*
# Create leads table for project intake submissions

1. New Tables
- `leads`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — the submitter's full name
  - `email` (text, not null) — contact email
  - `company` (text, nullable) — company name if provided
  - `project_type` (text, not null) — selected project type (e.g. "E-commerce Website")
  - `budget_range` (text, not null) — selected budget tier
  - `timeline` (text, not null) — desired delivery timeline
  - `requirements` (text, nullable) — free-text project description
  - `selected_features` (jsonb, nullable) — array of selected feature IDs from the calculator
  - `estimated_cost` (integer, nullable) — cost estimate from the calculator at time of submission
  - `status` (text, not null, default 'new') — lead status for pipeline tracking
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `leads`.
- This is a single-tenant public submission form (no sign-in), so allow anon + authenticated INSERT only.
- No SELECT/UPDATE/DELETE from the frontend — leads are managed server-side.
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  project_type text NOT NULL,
  budget_range text NOT NULL,
  timeline text NOT NULL,
  requirements text,
  selected_features jsonb,
  estimated_cost integer,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads" ON leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);
