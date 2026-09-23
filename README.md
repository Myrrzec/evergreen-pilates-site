# Evergreen Pilates Studio — Portfolio Project

A hand-coded static marketing site (home, about, classes/pricing, contact with a
working form, a 4-post blog, terms, privacy) built as a portfolio piece
demonstrating **site launch + domain/email setup + technical SEO** — the kind
of "deploy and make it Google-ready" work that's common on freelance
platforms, distinct from building an app from scratch.

No CMS, no framework, no build step — plain HTML/CSS/JS, matching how most
real small-business sites of this kind actually arrive (a finished set of
static files that need to go live correctly, not be rebuilt).

**This is a demo business. "Evergreen Pilates Studio," its address, phone
number, and team are fictional.**

## Technical SEO checklist (already done in the code)

- Unique `<title>` and `<meta name="description">` on every page
- `<link rel="canonical">` on every page
- Open Graph tags for link previews
- `LocalBusiness` and `Article` JSON-LD structured data (home page + each blog post)
- `sitemap.xml` and `robots.txt`, sitemap referenced from `robots.txt`
- One canonical URL per page — no `www`/bare-domain duplication (see DNS step below)
- Semantic heading structure (one `<h1>` per page, no skipped levels)
- `noindex` on Terms/Privacy (thin boilerplate content, deliberately excluded from the index and from the sitemap)
- Custom `404.html`
- Mobile-first responsive CSS, no horizontal overflow, no JS framework to slow down first paint
- Security/caching headers via `_headers` (works on both Netlify and Cloudflare Pages)
- Contact form works with JS on (inline success message) and with JS off (normal form POST)

## Before going live

1. **Pick and buy a domain.** Any registrar works (Cloudflare Registrar, Namecheap, Porkbun, etc.) — this step needs your own payment method, so it's not something to script.
2. **Set the real domain everywhere at once:**
   ```bash
   ./scripts/set-domain.sh yourdomain.com
   ```
   This replaces every `YOUR-DOMAIN-HERE` placeholder (canonical tags, Open Graph URLs, sitemap, robots.txt) in one pass.
3. **Set up a real form endpoint** — see "Contact form" below; replace `REPLACE_WITH_YOUR_FORM_ID` in `contact.html`.

## Deploy

**Recommended: Cloudflare Pages** (free, fast, HTTPS automatic, DNS/email/Pages all in one dashboard).

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: Workers & Pages → Create → Pages → connect the GitHub repo. Build command: none. Output directory: `/` (repo root).
3. Once deployed, add your custom domain under the Pages project's **Custom domains** tab — this also creates the right DNS records automatically if the domain's nameservers are on Cloudflare.
4. Set the **primary domain** (apex vs. `www`) in the same tab so the other version redirects to it — this is what gives you one canonical URL instead of two.

Netlify or Vercel work the same way (drag-and-drop deploy or connect the repo; no build command needed) if you'd rather use those.

## DNS

- If the domain's nameservers point to Cloudflare, Pages manages the DNS records for you when you add the custom domain.
- Otherwise, add a `CNAME` (or the records your host's dashboard specifies) at your registrar, and set the `www`/apex redirect in the host's dashboard as in step 4 above.
- Confirm `https://yourdomain.com/sitemap.xml` and `https://yourdomain.com/robots.txt` both load before submitting to Search Console.

## Email (forward to Gmail, send from your domain)

1. **Receiving:** Cloudflare Email Routing (free) — forward `hello@yourdomain.com` to your Gmail. Requires the domain's nameservers on Cloudflare.
2. **Sending as that address from Gmail:** Gmail can't send from a custom domain on its own. Use a free-tier SMTP relay (e.g. Brevo) and add it under Gmail Settings → Accounts → "Send mail as."
3. **SPF:** one single TXT record combining every sender you use (Cloudflare Email Routing + your SMTP relay) — two separate SPF records will break delivery. Each service's setup docs give you the exact string to merge.
4. **DKIM:** add the DKIM TXT record your SMTP relay provides.
5. **Test both directions** — send yourself an email from Gmail as the new address, and send an email to `hello@yourdomain.com` from another account.

## Contact form (Formspree)

1. Create a free account at formspree.io, create a form, copy its endpoint (`https://formspree.io/f/xxxxxxx`).
2. In `contact.html`, replace `REPLACE_WITH_YOUR_FORM_ID` in the form's `action` attribute.
3. Submit a test message and confirm it arrives at your inbox.

## Google Search Console

1. Add the domain as a property (DNS verification is easiest if the domain is on Cloudflare — add the TXT record Search Console gives you).
2. Submit `sitemap.xml` under Sitemaps.
3. Use URL Inspection on the homepage to request indexing once the site is live.

## QA checklist before calling it done

- [ ] Every nav link and internal link works, on desktop and mobile
- [ ] Contact form submits and the message arrives
- [ ] No horizontal scroll/overflow at 375px width
- [ ] No console errors on any page
- [ ] `robots.txt` and `sitemap.xml` load and only one canonical domain version is live (check `www` redirects to apex, or vice versa)
- [ ] Lighthouse run (Chrome DevTools) with no obvious performance/accessibility flags

## Updating content later

Every page is a plain `.html` file — open it in any text editor, edit the
text between the tags, save, commit, and push (the host redeploys
automatically on push). There's no admin panel or database.
