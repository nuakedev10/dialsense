-- Run this in the Supabase SQL editor to set up DialSense applicant storage.

create extension if not exists pgcrypto;

create table if not exists applicants (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),

  -- Page 1: Personal details
  full_name text not null,
  email text not null,
  whatsapp text not null,
  programme text not null,
  year_of_study text not null,
  nationality text,
  hours_per_week text not null,
  portfolio_url text,
  role_applied text not null,
  skills text[],
  motivation_sentence text not null,

  -- Page 2: Assessment answers
  q1_instinct text,
  q2_conviction text,
  q3_learning_style text,
  q4_team_frustration text,
  q5_problem_solving text,
  q6_failure_response text,
  q7_self_awareness text,
  q8_hospital_observation text,
  q9_most_alive text,
  q10_interesting_system text,

  -- Admin evaluation fields
  reviewer_score integer check (reviewer_score between 1 and 5),
  reviewer_notes text,
  status text default 'new' check (status in ('new', 'shortlisted', 'rejected', 'accepted'))
);

create index if not exists applicants_role_applied_idx on applicants (role_applied);
create index if not exists applicants_status_idx on applicants (status);
create index if not exists applicants_created_at_idx on applicants (created_at desc);

-- Row Level Security: the table holds private applicant PII, so no public
-- read/write policies are created. All access goes through the Next.js API
-- routes using the Supabase service role key (server-side only).
alter table applicants enable row level security;
