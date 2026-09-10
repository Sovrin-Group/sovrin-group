# Sovrin Group Website

The official website of Sovrin Group LLC: a static [Astro](https://astro.build)
site with a [Sveltia CMS](https://github.com/sveltia/sveltia-cms) content manager
for self-serve white paper publishing.

The owner's handbook that used to live here is being rewritten after launch, so
that it describes the site as it actually runs rather than as it was first built.

## Quick start (developers)

```bash
npm install
npm run dev        # site at http://localhost:4321 (admin: /admin/index.html)
```

To edit content locally, open `/admin/index.html` in Chrome or Edge and choose
**Work with Local Repository**. Sveltia reads and writes the files directly, so
there is no companion server to run.

Content lives in `src/content/whitepapers/` (one markdown file per paper) with
PDFs in `public/whitepapers/`. Pushing to `main` deploys automatically.
