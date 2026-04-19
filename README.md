<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1T7h8yqnJUb1t4_oGLT7EZwjUjvU350yD

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Lead form (Supabase + Resend)

The lead form saves submissions to Supabase and sends a notification email via Resend.

1. **Env:** Copy [.env.example](.env.example) to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (from Supabase Dashboard → Project Settings → API).

2. **Database:** In Supabase SQL Editor, run:
   - [sql/create_leads_table.sql](sql/create_leads_table.sql) — main site modal (`ddc_organic_leads`)
   - [sql/create_ad_leads_table.sql](sql/create_ad_leads_table.sql) — paid `/ads/*` pages (`ddc_ads_leads`)  
   The Edge Function writes to `ddc_organic_leads` or `ddc_ads_leads` based on `lead_source` in the request body.  
   If you already use the old names `leads` / `ad_leads` / `site_events`, follow the steps in [sql/rename_legacy_tables.sql](sql/rename_legacy_tables.sql) (BLOCK A → create event tables → BLOCK B).

3. **Edge Function:** The form calls the `resend-email` Edge Function. If you deploy from this repo, rename or deploy as `resend-email`, or change the app to invoke `submit-lead` (see LeadForm.tsx).
   - Install [Supabase CLI](https://supabase.com/docs/guides/cli) and log in: `supabase login`
   - Link the project: `supabase link --project-ref <your-project-ref>` (from Supabase Dashboard → Project Settings → General)
   - Deploy: `supabase functions deploy submit-lead --name resend-email` (or deploy the function that lives at `supabase/functions/submit-lead/` with name `resend-email`)
   - In Dashboard → Edge Functions → **resend-email** → **Secrets**, set:
     - `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API → service_role)
     - `RESEND_API_KEY` (from resend.com)
     - `LEAD_EMAIL_TO` = inbox that should receive lead notifications (e.g. `quotes@yourdomain.com`)
     - `LEAD_EMAIL_FROM` = a sender address verified in Resend for your domain

If you see **"Failed to send a request to the Edge Function"**, the `resend-email` function is not deployed or not reachable—complete step 3 above.

### Optional: button / funnel tracking in Supabase

Clicks on main CTAs (header, hero, ad header/footer) and successful lead submits are stored in **`ddc_organic_events`** (regular / main-site paths) or **`ddc_ads_events`** (paths under `/ads/*`) via the **`track-event`** Edge Function.

1. Run [sql/create_site_events_table.sql](sql/create_site_events_table.sql) in the SQL Editor (creates both event tables).
2. Deploy: `supabase functions deploy track-event` (same secrets as other functions: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).
3. Event names are defined in [lib/siteEvents.ts](lib/siteEvents.ts). Add `trackClientEvent('my_event')` anywhere in the app, or extend that file with new constants.

Query examples:  
`select event_name, path, count(*) from ddc_organic_events group by 1, 2 order by 3 desc;`  
`select event_name, path, count(*) from ddc_ads_events group by 1, 2 order by 3 desc;`

## Blog (no database)

Posts are stored in [public/blog/data.json](public/blog/data.json). A GitHub Action runs twice daily and commits a new article when needed.

1. Add **Actions secret** on the repo: `OPENAI_API_KEY` (see [.env.example](.env.example)).
2. Enable **Actions** and allow workflows to push (default `GITHUB_TOKEN` with `contents: write` is configured in [.github/workflows/daily-blog.yml](.github/workflows/daily-blog.yml)).
3. Optional: run locally with `npm run blog:generate` (same env vars in your shell).

If you skip GitHub Actions, the blog stays empty until you run the script or edit `data.json` by hand.

## SEO (mobile car detailing – Hamilton, GTA)

The site is set up for local SEO and social sharing:

- **Meta & social:** Title, description, keywords, canonical, Open Graph, and Twitter Card are in [index.html](index.html), targeting Hamilton, Ancaster, Burlington, Oakville, Mississauga and GTA.
- **Local / geo:** `geo.region`, `geo.placename`, and ICBM coordinates for Hamilton.
- **Structured data:** JSON-LD `LocalBusiness` / `ProfessionalService` with `areaServed` in `index.html`, plus dynamic WebPage, FAQ, blog, and breadcrumb data from the app.
- **Crawlers:** [public/robots.txt](public/robots.txt) and [public/sitemap.xml](public/sitemap.xml). Each production build runs [scripts/build-sitemap.mjs](scripts/build-sitemap.mjs) so every blog URL in `public/blog/data.json` is included automatically.

**Before going live:**

1. **Domain:** Set the canonical origin in `lib/site.ts` and `index.html` to your live site (default in code is `https://drivewaydetail.com`). The sitemap build reads `SITE_ORIGIN` from the environment when present. Align `public/robots.txt` and social preview URLs with the same origin.
