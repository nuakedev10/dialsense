# DialSense — Field Research Team Applications

Recruitment site for DialSense's Kigali field research team: a landing page,
a two-step application (`/apply` → `/apply/assessment`), and a
password-protected admin dashboard (`/admin`) for reviewing applicants.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
lucide-react · Supabase (Postgres)

## Branding

Colors and type are derived from the DialSense and BahoCare marks
(`public/brand/`): navy `#0f172a`, orange `#f97316`, teal `#0d9488` /
`#5eead4`, plus cyan/violet/indigo accents pulled from the sonar-arc and
node-connection details — all defined as CSS variables in
[`app/globals.css`](app/globals.css). Headings use Michroma
(`next/font/google`), loaded in [`app/layout.tsx`](app/layout.tsx). Logo
lockups (light/dark/transparent variants) live in `public/brand/` and are
used via [`components/SiteHeader.tsx`](components/SiteHeader.tsx) and
[`components/BahoCareFooter.tsx`](components/BahoCareFooter.tsx).

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a [Supabase](https://supabase.com) project, then run
   [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor.
   This creates the `applicants` table with row-level security enabled (no
   public policies — all reads/writes go through the server-side API routes
   using the service role key).

3. Copy `.env.example` to `.env.local` and fill in:

   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from
     Project Settings → API in Supabase.
   - `SUPABASE_SERVICE_ROLE_KEY` — same page, server-only, never expose to
     the client.
   - `ADMIN_PASSWORD` — the shared password for `/admin`.
   - `ADMIN_SESSION_SECRET` — any long random string, used to sign the
     admin session cookie.

4. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/apply` | Role selection + personal details |
| `/apply/assessment` | 10-question personality assessment |
| `/apply/success` | Confirmation screen |
| `/admin` | Password-protected applicant dashboard |
| `/admin/[id]` | Applicant detail, scoring, notes, status |

`POST /api/applicants`, `GET /api/applicants`, and
`PATCH /api/applicants/[id]` handle all database reads/writes.

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. Add the same environment variables from `.env.local` in the Vercel
   project settings.
3. Deploy. Test the full flow end-to-end: submit an application at `/apply`,
   confirm it appears in `/admin`, and confirm scoring/notes save from
   `/admin/[id]`.
