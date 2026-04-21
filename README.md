# Webflow Scraper — AI Powered (Free)

Scrape, analyze, and export Webflow sites using Google Gemini AI. 100% free.

## Quick Start

### Option A — Browser only (no install)
1. Open `index.html` directly in Chrome/Firefox
2. Go to Setup → paste your Gemini API key
3. Start scraping (AI analysis mode, no live crawl)

### Option B — With live crawler
Requires Node.js (https://nodejs.org — free)

```bash
# In this folder:
node server.js
```
Then open `index.html` in your browser and select "Live crawl" mode.

## Get your free Gemini API key
1. Go to https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API key"
4. Copy and paste into the Setup tab

No credit card. Free forever on the free tier.

## Deploy online (free)
Push this folder to GitHub, then deploy on:
- **Railway** — railway.app (free tier, no card)
- **Render** — render.com (free static + web service)
- **Vercel** — vercel.com (free, just serves the HTML)

For Vercel/Netlify: deploy only `index.html` (no server needed for AI mode).
For Railway/Render: deploy the whole folder and set start command to `node server.js`.

## Features
- AI analysis of any Webflow site URL
- Extract: pages, assets, CMS, forms, SEO, nav, styles
- Chat with AI about scraped data
- Export to JSON / CSV / Markdown / plain text
- Live HTML crawling (with local server)
- API key stored locally in browser — never sent anywhere except Google
