# Deploy to Vercel

This document shows two simple ways to deploy the Page Inventory Tool to Vercel: the
web UI (recommended) and the Vercel CLI. It also lists the environment variables
you must configure and post-deploy checks.

## Before you start

- Make sure your repository is pushed to GitHub (you already pushed to `origin/main`).
- Do NOT commit secrets (the repo already `.gitignore`s `.env` and `credentials.json`).
- Vercel will use `vercel.json` in the repo which routes requests to `app.py`.

## Required environment variables

Set these for both Preview and Production builds in the Vercel Project Settings or via the CLI.

- `GEMINI_API_KEY` — Google Generative Language (Gemini) API key (optional; required for AI insights)
- `CREDENTIALS_JSON` — the full JSON contents of your Google service account credentials (the app writes this at runtime)
- `GA_PROPERTY_ID` — Google Analytics Property ID (e.g. `319028439`)
- `SECRET_KEY` — Flask session secret
- Optional thresholds (defaults are set in the app):
  - `LOW_VIEWS_THRESHOLD`
  - `HIGH_BOUNCE_RATE_THRESHOLD`
  - `LONG_ENGAGEMENT_THRESHOLD`

Security notes

- Paste the entire contents of `credentials.json` into `CREDENTIALS_JSON` in Vercel; Vercel will store it encrypted.
- Do not store plain secrets in the repo. Use Vercel's environment variables or a secret manager.

## Deploy using the Vercel web UI (recommended)

1. Go to https://vercel.com and sign in with your GitHub account.
2. Click "Import Project" and choose the GitHub repository `Bellabellacode/page-inventory-tool-webapp`.
3. Confirm the project settings. Vercel will detect `vercel.json` and use `@vercel/python`.
4. In the Vercel Project -> Settings -> Environment Variables, add the variables listed above.
   - For `CREDENTIALS_JSON`, open your local `credentials.json` and paste the full JSON value into the variable value field.
5. Click "Deploy". The deployment log will show the install steps (Vercel installs `requirements.txt`).

After the deployment completes, open the deployment URL to verify the UI loads.

## Deploy using the Vercel CLI

If you prefer the terminal, use the Vercel CLI. This is convenient for scripted deployments.

1. Install the Vercel CLI (requires Node.js/npm):

```bash
npm i -g vercel
```

2. Login and link the project:

```bash
vercel login
cd /path/to/page-inventory-tool-webapp
vercel link        # follow prompts to create or link the project
```

3. Add environment variables (the CLI will prompt you to paste values):

```bash
vercel env add GEMINI_API_KEY production
vercel env add CREDENTIALS_JSON production   # paste entire credentials.json when prompted
vercel env add GA_PROPERTY_ID production
vercel env add SECRET_KEY production

# Repeat for preview if you want these set on preview deployments, or use the web UI.
```

4. Deploy (production):

```bash
vercel --prod
```

## Post-deploy verification

- Visit your deployment URL in a browser and confirm the UI loads.
- Trigger a processing job in the UI and check the Vercel deployment logs (Project → Deployments → View Logs).
- Alternatively use the CLI to view logs:

```bash
vercel logs <deployment-url-or-id> --since 10m
```

Look for these successful markers in the logs:

- Google Analytics client initialization (no credential errors)
- If `GEMINI_API_KEY` is present, the app prints a small debug message in `get_ai_insights()` such as `DEBUG: GEMINI_API_KEY found: Yes` (only visible in server logs)

## Notes & caveats

- Vercel's Python runtime runs serverless functions. Long-running or resource-heavy jobs (large numbers of GA calls) may be limited by execution time or memory. If your workloads are heavy or you need persistent background workers, consider Render, Railway, Heroku, or a VM.
- The app writes temporary files (Excel reports) to a temp directory. For large workflows or persistent storage, use cloud storage (S3/GCS) and update the app accordingly.

## Optional: Add a simple GitHub Action to auto-deploy

Vercel auto-deploys on push when the project is linked to GitHub. If you prefer GitHub Actions, you can add a workflow that calls the Vercel CLI.

## Troubleshooting

- If AI remains disabled after setting `GEMINI_API_KEY`, restart the deployment and check logs for debug lines.
- If Google Analytics errors occur, verify `CREDENTIALS_JSON` content and that the service account has Analytics Data API access for the `GA_PROPERTY_ID`.

---

If you want, I can:

- Create this file in the repository (done), and also add a short `vercel-deploy-commands.sh` script to automate CLI steps (I can add it if you want).
- Or walk you through linking the repo via the Vercel web UI step-by-step while you paste environment values.
