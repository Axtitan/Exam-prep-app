# 🎯 Grad Prep — graduate trainee exam practice

A static web app for practising Nigerian graduate trainee recruitment tests with real past questions. Every answer key has been rechecked, every question has a worked explanation, and an AI tutor (Groq) can explain any question.

**2,634 questions across nine tests:**

| Exam | Questions | Topics |
|---|---:|---|
| First Bank | 716 | Critical, Verbal, Abstract, Numerical Reasoning (+ assessment centre prep) |
| GTBank / GTCO | 477 | Numerical, Verbal, Critical, Abstract Reasoning, Grammar, Comprehension |
| Deloitte (incl. Dragnet) | 311 | Quantitative, Verbal, Abstract Reasoning + 100 Dragnet chart-based numerical questions |
| Premium Trust | 289 | Numerical, Verbal, Abstract, Logical & Critical Reasoning, Banking, ICT |
| SEPLAT | 271 | Numerical, Quantitative, Verbal, Banking & Finance, General Knowledge |
| Workforce | 245 | Five Workforce ability papers: verbal, numerical, abstract, critical, general |
| Access Bank | 141 | Quantitative, Verbal, Critical Reasoning, patterns, General Knowledge |
| EY (Jobberman) | 100 | Logical, Numerical, Verbal, Critical Reasoning |
| General Aptitude | 84 | Mixed numerical and verbal practice |

## Features

- Dashboard with mock-test cards, completion progress, favourites and practice by topic across all exams
- Timed exam modes, speed drills and untimed practice; pause, skip, a question navigator and keyboard shortcuts (A–E / 1–5, ← →, Space)
- Passages, charts and tables shown with each question; tap a figure to enlarge it
- Explanations for every question, plus notes wherever a source key was corrected
- AI tutor that is given the passage, options, correct answer, your choice and the explanation. With a vision model it also gets the figure.
- Light, dark and system themes, and a responsive layout from phones to desktops
- Progress and history saved in the browser

## Run it

No build step is needed. Either open `index.html` directly, or serve the folder (recommended):

```bash
python -m http.server 8000
```

Then visit http://localhost:8000. Pushing to `master` deploys to GitHub Pages through `.github/workflows/jekyll-gh-pages.yml`. `_config.yml` keeps source documents and tooling off the published site.

## AI tutor (Groq)

1. Get a free API key at [console.groq.com](https://console.groq.com/keys).
2. Paste it into **Settings → AI tutor** or the tutor panel. By default it is kept only for the current tab (`sessionStorage`). Tick *Remember on this device* to store it in `localStorage`.
3. The key is sent only to `api.groq.com`. Anyone with access to the browser profile can read it, so use a key with a spending limit on shared devices.
4. Models are tried in order and can be changed in Settings. The vision model is used first for questions with figures, then the tutor falls back to text-only models.

## Project layout

```text
index.html          App shell (no inline scripts; strict Content-Security-Policy)
style.css           Design tokens, light/dark themes, responsive layout
theme-init.js       Applies the saved theme before first paint
app.js              Dashboard, quiz engine, progress, AI tutor, assessment centre
ac_content.js       First Bank assessment-centre content
data/registry.js    Question counts and topics per exam (loaded up front)
data/<exam>.js      Question banks, loaded on demand when an exam is opened
assets/img/…        Figures for First Bank, Deloitte and Workforce questions
charts/, gtb_figs/  Figures for SEPLAT/General and GTBank questions
```

Question item shape: `{ id, cat, q, opts[], ans (0-based), exp, passage?, img?, imgLabel?, note?, src }`. Keep `id`s stable, because progress and tutor chats are keyed by them.

## Design

Art-directed with the [tasteskill](https://github.com/Leonxlnx/taste-skill) "page is the object" direction (seed 1068551543). The home page is printed like an exam answer sheet, oxblood ink on grey paper, with a timing-mark stripe, A–E bubbles, receipts and a postcard footer. Type is Erode (Indian Type Foundry, via Fontshare), self-hosted in `assets/fonts/`. Light, dark and system themes; square corners; no shadows, gradients or outlines.

Photographs are in `assets/photos/` (credits in `assets/photos/credits.json`), shown in greyscale, all via Wikimedia Commons:

- Students writing an examination at Augustine University, Epe, Lagos, by Addjimedu (CC0). Two views.
- Lagos skyline with marina, by kopee15 (CC BY-SA 2.5)
- University of Lagos lagoon front, by JamesNotin (CC0)
- Bank tower, Victoria Island, by Timmylegend (CC BY-SA 4.0)
- Scantron answer sheet, by Lexilovescaffeine (CC0)

## Security notes

- All question and content text is rendered with `textContent` and DOM nodes, never `innerHTML`.
- The CSP allows scripts and fonts only from this site, and network calls only to this site and `api.groq.com`. Fonts are self-hosted; there are no CDNs.
- GitHub Actions are pinned to commit SHAs, and checkout does not persist credentials.
- Source PDFs are git-ignored. The EY screenshots, `parse_pdf.py` and raw text dumps are excluded from the published site.
