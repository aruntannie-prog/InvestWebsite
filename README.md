# Kosha Wealth — Demo investment website

Clickable prototype of a goal-based mutual fund investment platform, built for client review.
Single self-contained HTML file: no build step, no backend.

## Run locally
Open `index.html` in any browser, or serve it:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## What's included
**Public site:** home, mutual funds, calculators, goal pages, research, about, contact.

**Logged-in app** (click *Log in → Get OTP*, any input works):
- Dashboard: products, collections, net worth, tools, research
- Mutual funds: Portfolio (summary, performance, deep dive, capital gains), Invest, Systematic plans (fund explorer), Transactions, Watchlist
- Fund detail page, investment basket (SIP / lump sum, mandate and payment steps)
- Bonds, SIF, Stocks, FD, NPS, Insurance, KYC, Profile (investors, bank & mandates, nominees, risk profile), Reports, Help

Light mode by default, with a dark mode toggle. Responsive down to mobile.

## Important
All brand names, fund names, NAVs, returns, reviews and statistics are **fictional placeholders**.
Replace the brand, ARN, CIN and address placeholders before any public use.

## Routes
Hash-based routing, e.g. `#/`, `#/mutual-funds`, `#/app/dashboard`, `#/app/mf/portfolio`, `#/app/fund/3`.

## Folder
- `index.html` — current demo (v3, editorial redesign)
- `archive/v2-corporate-demo.html` — second version
- `archive/v1-simple-demo.html` — first simple version
