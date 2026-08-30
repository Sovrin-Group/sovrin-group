# Sovrin Group — Website

The official website of Sovrin Group LLC: a static [Astro](https://astro.build)
site with a [Decap CMS](https://decapcms.org) content manager for self-serve
white paper publishing.

**📘 Start with [HANDOFF.md](HANDOFF.md)** — the owner's handbook: how the site
works, how to publish, who holds which keys, recovery instructions, and the
launch checklist.

## Quick start (developers)

```bash
npm install
npm run dev        # site at http://localhost:4321 (admin: /admin/index.html)
npx decap-server   # optional: lets the local admin write to disk
```

Content lives in `src/content/whitepapers/` (one markdown file per paper) with
PDFs in `public/whitepapers/`. Pushing to `main` deploys automatically.
