# Kosha Wealth — demo investment website (v4)

Clickable prototype of a goal-based mutual fund advisory platform, built for client review.
Plain HTML, CSS and JavaScript. **No build step, no backend, no dependencies** (web fonts load from Google Fonts).

## Run locally
Open `index.html` in any browser, or serve the folder:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## What's included

### Public site (hash routes)
| Route | What it is |
| --- | --- |
| `#/` | Home: mobile-number hero, stats band, product stage, goal planner, how-it-works, "time machine" SIP chart, risk dial, Kosha Select leaderboard, advisor chat, testimonials, trust flow, research, app download, FAQ |
| `#/mutual-funds` | Fund-type map, fund-type explorer, SIP vs lump-sum scenarios, Select scorecard, cost-of-plan comparison |
| `#/fixed-income` | Bond explorer with yield scatter, FD calculator, NPS tax explainer, insurance cover estimator, SIF ladder |
| `#/goals` and `#/goals/edu`… | Goal planner with glide path and inflation view |
| `#/calculators` and `#/calculators/sip`… | Six working calculators: SIP, lump sum, step-up, SWP, retirement, tax saving |
| `#/research`, `#/research/read/1`… | Editorial hub and article reader |
| `#/about` (+ `/security`, `/grievance`, `/careers`) | Story timeline, principles, team, security, grievance ladder, careers |
| `#/pricing` | Pricing tiers, fee comparison, feature table |
| `#/contact` | Call-booking widget, offices |

### Logged-in app
Click **Log in → Send OTP** (any input works), or go to `#/app/overview`.
Overview (existing / new investor), Portfolio (summary, performance, what you own, capital gains, held elsewhere), Invest, All funds (filters, compare up to 3), Fund detail, Transactions, Bonds, Fixed deposits, NPS, SIF, Stocks, Insurance, Net worth (Account Aggregator demo), KYC, Profile, Reports, Help, Calculators, and the investment basket drawer.

Light and dark themes. Responsive from phone to desktop. Respects `prefers-reduced-motion`.

## Structure
```
index.html          shell, overlays, script/style includes
css/base.css        tokens, type, buttons, forms, charts, shared components
css/site.css        public header/mega-menu/footer + home page sections
css/pages.css       inner pages
css/app.css         logged-in app
js/core.js          icons, SVG chart library (hover tooltips), donut/ring/sparkline, avatars, reveal + count-up
js/data.js          fictional data: goals, funds, articles, testimonials, navigation, FAQ
js/site-home.js     header, mega-menu, footer, goal planner, home page
js/site-pages.js    mutual funds, fixed income, goals
js/site-pages2.js   research, about, pricing, contact, calculators page
js/calc.js          calculator engine
js/app.js           app shell, overview, portfolio, invest, explore, fund detail
js/app2.js          remaining app screens, basket
js/main.js          router, login, global handlers
archive/            earlier versions (v1 simple, v2 corporate, v3 editorial)
```

## Important
All brand names, fund names, NAVs, returns, people, reviews and statistics are **fictional placeholders**.
Replace the brand, ARN, CIN, address, pricing and team details before any public use.
The pricing page is an illustrative structure only.
