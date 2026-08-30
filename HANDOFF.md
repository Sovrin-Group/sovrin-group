# Sovrin Group Website — Owner's Handbook

*Plain-English guide to how this website works, who holds the keys, and what to do
if something needs fixing. Written for the site's owner and for any future
developer taking over. Last updated: August 2026.*

---

## What this is

The Sovrin Group website: a static site (pre-built pages — no database, no
server-side code) with a self-serve content manager for publishing white papers.

- **Live site:** https://sovrin-group.netlify.app (temporary address until the
  custom domain is connected)
- **Content manager (admin):** https://sovrin-group.netlify.app/admin/

## How the machine works

1. The master copy of every file lives in a **GitHub repository**:
   `github.com/Sovrin-Group/sovrin-group`
2. **Netlify** (the host) watches that repository. Any change triggers an
   automatic rebuild; the updated site is live worldwide about a minute later.
3. The **admin page** (`/admin`) is a friendly form that saves changes into the
   repository — which triggers step 2. No one ever edits code to publish.

There is no server to maintain, patch, or renew. Monthly hosting cost: $0.
The only recurring cost is the domain name (~$10–15/year, at Cloudflare).

## How to publish a white paper

1. Go to `/admin` on the site and click **Login** (signs in with your GitHub
   account — you must be a member of the Sovrin-Group GitHub organization)
2. Click **White Papers → + White Paper**
3. Fill in: Title, Category (dropdown), Summary (1–2 sentences shown on the
   card), Publication Date, and upload the **PDF**
4. Click **Publish**
5. ~1 minute later the paper is live on the White Papers page — newest ones
   also appear automatically on the home page

Editing and deleting work the same way: open the entry in the admin, change or
delete, publish. Every change is kept in history and can be undone by a
developer, so nothing is ever permanently lost.

## Who holds which keys

| Thing | Where | Who controls it |
|---|---|---|
| Domain name | Cloudflare | **Owner's personal account** (most important key — keep it) |
| Website files + history | GitHub org `Sovrin-Group` | Organization **owners** (multiple people — any owner has full control) |
| Hosting | Netlify project `sovrin-group` | Netlify account (login shared via password manager) |
| Admin login | GitHub OAuth app "Sovrin Group CMS" (in the org's settings) | Org owners; its secret can be **regenerated** anytime, never needs storing |

Principles this setup follows:
- **No passwords or secrets are stored in the website files.** Ever.
- The domain stays in the owner's own account — never a contractor's.
- The GitHub organization has multiple owners so no single person's absence
  can lock anyone out.

## If something breaks

- **Site looks wrong after a publish:** in Netlify → Deploys, click any earlier
  deploy → "Publish deploy" to instantly restore the previous version.
- **A publish didn't go live:** check Netlify → Deploys for a failed build
  (Netlify also emails on failure). The old site stays up automatically;
  a developer fixes the error and re-publishes.
- **Locked out of the admin:** confirm your GitHub account is still a member of
  the Sovrin-Group organization; re-login at `/admin`.

## For a future developer

- Stack: **Astro** (static output) + **Decap CMS** (git-based, GitHub backend).
- Local dev: `npm install && npm run dev` — then http://localhost:4321
  (admin at `/admin/index.html`, CMS local testing: `npx decap-server`).
- White papers = markdown files in `src/content/whitepapers/` + PDFs in
  `public/whitepapers/`. The CMS config is `public/admin/config.yml`.
- Contact form uses Netlify Forms (`data-netlify` attribute).
- `public/_redirects` serves a blocking robots.txt **only** on the
  `*.netlify.app` address; a custom domain automatically gets the indexable
  `robots.txt`. No launch-day robots action is needed.
- Moving hosts someday: it's a static site — build with `npm run build`,
  deploy `dist/` anywhere. Re-wire the CMS OAuth for the new host
  (see Decap CMS docs → GitHub backend).

## Launch checklist (custom domain go-live)

- [ ] Replace placeholder PDFs and "coming soon" summaries via the admin
- [ ] Real phone number on the Contact page (currently placeholder xxx's)
- [ ] Set form notification email: Netlify → Forms → notifications, and submit
      one test through the live contact form
- [ ] In Netlify → Domain management: add the custom domain
- [ ] In Cloudflare DNS: add the two records Netlify specifies, set to
      **DNS only** (grey cloud, not proxied)
- [ ] Update `site_url` in `public/admin/config.yml` and `site` in
      `astro.config.mjs` to the real domain
- [ ] Confirm https loads with the padlock, and `yourdomain.com/robots.txt`
      says `Allow` (search indexing switches on by itself)
