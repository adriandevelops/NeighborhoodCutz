# Neighborhood Cutz

Marketing site for Neighborhood Cutz barbershop, Los Angeles. Built by North Code LLC.

Next.js 15, static export, deployed on Netlify.

---

## 1. Running it locally

You need Node 20 or newer. Check with `node -v`.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edits reload automatically.

To see exactly what Netlify will publish:

```bash
npm run build
npx serve out
```

`npm run build` writes plain HTML, CSS and JS into `./out`. That folder is the whole website.

---

## 2. Where to change things

Almost everything the client will ever ask you to change lives in `content/`. You should rarely need to open a component.

| To change | Edit |
|---|---|
| Address, phone, hours, Booksy link, Instagram, about copy | `content/shop.js` |
| Barbers, their ratings, their Booksy links | `content/barbers.js` |
| Service names, prices, descriptions | `content/services.js` |
| Which photos appear in the gallery and their layout | `content/gallery.js` |
| Nav link labels | `content/nav.js` |
| Brand colour, fonts, spacing scale | `styles/tokens.css` |

**Hours** use 24-hour decimals. `9.5` is 9:30 AM, `19` is 7:00 PM. To mark a day closed:

```js
{ day: 'Sunday', closed: true },
```

The open/closed indicator in the hero, the highlighted row in the contact hours, and the schema Google reads all come from that one array.

---

## 3. Adding the photos

Drop files into `public/images/` using these exact names. Nothing else is needed, the paths are already wired up.

```
public/images/
  barbers/    esvin.jpg  cj.jpg  brayan.jpg  david.jpg  johnny.jpg
  services/   haircut.jpg  cut-beard.jpg  skin-fade.jpg  beard.jpg
              lineup.jpg  kids.jpg  shave.jpg  design.jpg
  gallery/    01.jpg  02.jpg  03.jpg  04.jpg  05.jpg  06.jpg  07.jpg  08.jpg
```

Before you commit them:

- **Resize.** Barbers and gallery, 1200px on the long edge is plenty. Nothing needs to be 4000px wide.
- **Compress.** Run them through [Squoosh](https://squoosh.app) and target under 200KB each. This is the single biggest thing you can do for load speed on a phone.
- **Crop barbers to 3:4 portrait.** The card is 3:4 and anchors to the top of the image, so a face near the top survives the crop.

The site works with images missing, tiles just render as neutral grey boxes. Nothing breaks while you wait on the client.

### Hero video

The hero currently plays the placeholder Vimeo clip that came with the design. To use the shop's own footage, upload it to Vimeo and change only the ID in the URL in `components/Hero.jsx`. Self-hosted video and still-image alternatives are described in the comment right above it.

---

## 4. Deploying to Netlify

### First deploy

1. Push this repo to GitHub. **Make it private.**
2. In Netlify: **Add new site → Import an existing project → GitHub**, pick the repo.
3. Netlify reads `netlify.toml` and fills in the settings itself. Confirm they read:
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: 22 (set in `netlify.toml`)
4. **Deploy site.** First build takes two to three minutes.

You get a URL like `neighborhood-cutz-a1b2c3.netlify.app`. Test it fully before pointing the domain at it.

After this, every push to `main` deploys automatically. Pull requests get their own preview URL, which is a good way to show the client a change before it goes live.

### Connecting neighborhoodcutz.com

In Netlify: **Domain management → Add a domain** → enter `neighborhoodcutz.com`.

Then, at whichever registrar holds the domain:

**Option A, Netlify DNS (simpler).** Netlify gives you four nameservers. Replace the registrar's nameservers with those. Netlify then handles all DNS and issues the SSL certificate automatically. Propagation is usually under an hour but can take up to 24.

**Option B, keep your current DNS.** Add these records instead:

| Type | Name | Value |
|---|---|---|
| A | `@` | `75.2.60.5` |
| CNAME | `www` | `your-site-name.netlify.app` |

Verify Netlify's current A record value in their docs when you do this, it has changed before.

Either way, once the domain resolves, go to **Domain management → HTTPS** and confirm the Let's Encrypt certificate issued. Then set `neighborhoodcutz.com` as the primary domain so `www` redirects to it rather than serving a duplicate.

### Deploying without Git

For a quick one-off:

```bash
npm run build
npx netlify-cli deploy --prod --dir=out
```

Use this sparingly. Git-connected deploys are what keep the live site and the repo honest with each other.

---

## 5. Launch checklist

Do not point the domain until all of these are done.

- [ ] Every service price confirmed with the shop (`content/services.js`)
- [ ] Full week of hours confirmed, especially Sunday (`content/shop.js`)
- [ ] Real Instagram handle in `content/shop.js`
- [ ] All photos in place and compressed
- [ ] Phone link tested on an actual phone
- [ ] Every Booksy link opens the right barber
- [ ] Map pin lands on the right suite
- [ ] Tested on iOS Safari and Android Chrome, not just desktop
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev) and fix anything red
- [ ] Google Business Profile updated to point at neighborhoodcutz.com

---

## 6. On keeping the code from being copied

Worth being straight about this, since it was part of why we moved off the single HTML file.

**Any code that runs in a browser can be read.** Minified and hashed bundles are harder to read than one commented HTML file, and nobody is going to casually right-click and lift your whole site the way they could before. But someone determined can still open devtools and reconstruct it. That is true of every website, including ones built by very large companies. No framework changes it.

What the move to Next.js actually buys you:

- Source lives in a **private repo**, not in the shipped page
- Comments, TODOs, client notes and pricing rationale never reach the browser
- Output is minified and split into hashed chunks, so it is not readable or reusable at a glance
- You get versioned history, so you can undo a bad change

What actually protects the work:

- **Keep the GitHub repo private.**
- **Put ownership in the contract.** State who owns the code, that it is licensed to this client for this site, and that reuse elsewhere needs your written permission. This is the real protection, not obfuscation.
- **Keep anything genuinely proprietary off the client.** If North Code builds tooling worth protecting, it belongs in a server or a separate private package, not in a static marketing site.

For a barbershop site, the honest risk is low. The design is the value, and the contract is what protects it.

---

## 7. Handing it to the client

If the shop ever wants to edit copy themselves without touching code, the cheapest path is a headless CMS reading into `content/`. Sanity and Contentful both have free tiers that fit a site this size, and the content layer is already shaped for it: each file is a plain array of objects that maps directly onto CMS documents.

Do not add that until they ask. It adds a monthly account, a build dependency and a support surface, for a site whose facts change maybe twice a year.
