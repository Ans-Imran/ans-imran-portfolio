-- ============================================================================
-- Portfolio admin schema  ·  run in Supabase SQL editor
-- ============================================================================
-- These tables are OWNED by the portfolio (separate from the shared LCA tables).
-- All writes go through the service-role key on the server, so RLS stays ON with
-- no public policies (nothing client-side can read/write them).

-- ── Analytics events ────────────────────────────────────────────────────────
create table if not exists portfolio_events (
  id               bigint generated always as identity primary key,
  session_id       text,
  event_type       text not null,          -- page_view | page_leave | click
  tool_slug        text,
  target           text,                   -- click target (e.g. "cv", "tool:carbon")
  path             text,
  device_type      text,
  os               text,
  browser          text,
  referrer         text,
  returned_visitor boolean,
  duration_seconds integer,
  scroll_depth     integer,
  created_at       timestamptz not null default now()
);
create index if not exists portfolio_events_created_idx on portfolio_events (created_at desc);
create index if not exists portfolio_events_type_idx    on portfolio_events (event_type);

-- ── Editable site content (bilingual CMS overrides) ─────────────────────────
-- Single row (id = 1). `data` is a partial deep-merge over lib/translations.ts.
create table if not exists site_content (
  id         integer primary key default 1,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_content_singleton check (id = 1)
);
insert into site_content (id, data) values (1, '{}'::jsonb)
  on conflict (id) do nothing;

-- ── CV versions ─────────────────────────────────────────────────────────────
create table if not exists cv_versions (
  id          bigint generated always as identity primary key,
  label       text not null,              -- e.g. "2026-07 · English"
  path        text not null,              -- storage path in the `cv` bucket
  filename    text not null,
  is_active   boolean not null default false,
  created_at  timestamptz not null default now()
);
-- only one active version at a time
create unique index if not exists cv_versions_one_active
  on cv_versions (is_active) where is_active;

alter table portfolio_events enable row level security;
alter table site_content     enable row level security;
alter table cv_versions      enable row level security;

-- ── Storage bucket for CV PDFs (public read so /api/cv can redirect) ─────────
insert into storage.buckets (id, name, public)
values ('cv', 'cv', true)
on conflict (id) do nothing;
