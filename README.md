# shabanakhtar.github.io

Personal portfolio site for Shaban Akhtar — projects, writing, and current work in development, AI, ML, and FinTech.

Live at [shabanakhtar.github.io](https://shabanakhtar.github.io)

## Changes (Portfolio Redesign)

This PR replaces the previous multi-page portfolio with a redesigned single-page site built from the `portfolio-design` private staging repo.

**What changed:**
- Complete visual redesign using the Amber Continuity dark palette (`#121212` background, `#D9A441` accent, `#F5D999` sparkle)
- Single-page homepage with Hero, About, Projects, Writing, and Contact sections
- Separate full article page for "AI Is Real. The Math Around It Might Not Be." with three embedded charts
- Motion system: drifting stars, scroll-linked signal path, section reveals on scroll, cursor-following card tilt, page-load fade-in, reading progress bar on article page
- Responsive layout for desktop and mobile
- `prefers-reduced-motion` support and `no-js` fallback
- Static HTML/CSS/JS — no build step, no framework

**Files:**
- `index.html` — homepage
- `article-ai-bubble.html` — full article page
- `styles.css` — all styles
- `main.js` — scroll animations, IntersectionObserver, card tilt
- `assets/` — article chart images

## Connect

- [GitHub](https://github.com/shabanakhtar)
- [LinkedIn](https://www.linkedin.com/in/shabanakhtar28a)
- Email: shaban.akhtar2006@gmail.com
