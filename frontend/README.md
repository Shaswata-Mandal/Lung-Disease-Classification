# EPICS Lung Disease Detection — React App

## Quick Start

```bash
npm install
npm run dev    # → http://localhost:5173
npm run build  # → dist/
```

## Update API URL

In `src/data/constants.js`, set your HuggingFace Space URL:
```js
export const API_BASE = 'https://YOUR-USERNAME-YOUR-SPACE.hf.space';
```

## Project Structure

```
src/
├── App.jsx                    ← Root component + client-side routing
├── main.jsx                   ← React entry point
├── styles/globals.css         ← CSS variables, animations, fonts
├── data/constants.js          ← Models, diseases, stats, team data
├── components/
│   ├── Navbar.jsx             ← Fixed nav, scroll-aware background
│   ├── Footer.jsx             ← Footer with navigation
│   ├── UI.jsx                 ← Reusable components (buttons, badges, etc.)
│   ├── ModelCard.jsx          ← Model selection card
│   └── Results.jsx            ← Single + Compare results
└── pages/
    ├── HomePage.jsx           ← Landing: hero, stats, disease cards, leaderboard
    ├── PredictPage.jsx        ← Model selector + upload + API + results
    ├── ResearchPage.jsx       ← Full paper: dataset, training, models, stats
    └── AboutPage.jsx          ← Mission, team, approach, findings
```

## Pages
- **Home** — Animated hero with scan visualization, stats, disease classes, how-it-works, model leaderboard, CTA
- **Predict** — 7 clickable model cards + compare-all card, drag-drop upload, live API inference, animated confidence results  
- **Research** — Paper content: abstract, dataset overview, training strategy, expandable model specs, 4 statistical validation tests
- **About** — Project context, 4 modeling approaches, key findings, team cards, future work

## Tech
- React 18 + Vite 5
- Pure CSS-in-JS (inline styles) — zero dependencies beyond React
- Fonts: Syne (display) + Figtree (body) from Google Fonts
- Animations: CSS keyframes + IntersectionObserver scroll reveals
