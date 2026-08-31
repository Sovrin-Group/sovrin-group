# The Next 3 Steps

*What she needs to have ready on her end to take the site live. Everything
happens in a web browser — nothing to install, nothing technical.*

---

## Phase 1 — Getting her publishing access *(anytime, before launch)*

- A **GitHub account** (free, [github.com/signup](https://github.com/signup)) —
  she needs her email, a password of her choosing, and a few minutes for the
  verification dance
- Then she texts me the **username** so I can send the owner invite
  (github.com/orgs/Sovrin-Group/people → Invite member → role: **Owner**)

## Phase 2 — Loading her real content *(the bulk of her work)*

- Her **white paper PDFs** as files on her PC — final versions, reasonable
  file sizes (each under ~25MB keeps things smooth)
- For **each** paper, three decisions ready before she sits down:
  1. Its exact **title**
  2. Which **category** it belongs in (Unified Architecture / Governed
     Identity / Other Research)
  3. A **1–2 sentence summary** for the card
- Also her decisions on:
  - The real **phone number** for the Contact page
  - **Which email inbox** gets contact-form submissions
  - Whether she wants the "Classification: Public / AI-Assisted" line back in
    the footer (currently removed)

## Phase 3 — Launch day *(her 5 minutes)*

- A working **Cloudflare login** — email, password, and if she set up
  two-factor back when, access to whatever device the codes go to.
  **Have her verify this well ahead of time** — a locked-out Cloudflare
  account on launch day is the only thing that could actually delay us
- The **two DNS records I'll text her** (Claude will format them
  ready-to-paste when Netlify provides the values)
- The path she'll follow:
  **dash.cloudflare.com → click her domain → DNS → Records → Add record**
  (twice) — setting each record's cloud icon to **grey / "DNS only"**
