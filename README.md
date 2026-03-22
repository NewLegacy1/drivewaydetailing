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

2. **Database:** In Supabase SQL Editor, run [sql/create_leads_table.sql](sql/create_leads_table.sql).

3. **Edge Function:** The form calls the `resend-email` Edge Function. If you deploy from this repo, rename or deploy as `resend-email`, or change the app to invoke `submit-lead` (see LeadForm.tsx).
   - Install [Supabase CLI](https://supabase.com/docs/guides/cli) and log in: `supabase login`
   - Link the project: `supabase link --project-ref gxhsgqwkfaicuqlrssed`
   - Deploy: `supabase functions deploy submit-lead --name resend-email` (or deploy the function that lives at `supabase/functions/submit-lead/` with name `resend-email`)
   - In Dashboard → Edge Functions → **resend-email** → **Secrets**, set:
     - `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API → service_role)
     - `RESEND_API_KEY` (from resend.com)
     - `LEAD_EMAIL_TO` = `contact@showroomautocare.ca`
     - `LEAD_EMAIL_FROM` = `leads@contact.newlegacyai.ca`

If you see **"Failed to send a request to the Edge Function"**, the `resend-email` function is not deployed or not reachable—complete step 3 above.

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
- **Structured data:** JSON-LD `AutoRepair` with `areaServed` (all service cities) in `index.html`.
- **Crawlers:** [public/robots.txt](public/robots.txt) and [public/sitemap.xml](public/sitemap.xml).

**Before going live:**

1. **Domain:** Replace `https://showroomautocare.com` in `index.html` (canonical, `og:url`, `og:image`, `twitter:image`), in the JSON-LD block, and in `public/robots.txt` and `public/sitemap.xml` with your real domain. Social share uses `hero3.png`.
