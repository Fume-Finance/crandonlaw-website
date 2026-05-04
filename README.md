# Crandon Law — Website

Marketing site for **Crandon Law**, a boutique San Francisco law firm focused
on fund formation, SPVs, management‑company work, and complex structuring.

Static HTML/CSS/JS. No build step. Deployed on Vercel.

## Structure

```
index.html       Single‑page site
styles.css       Design system + sections
script.js        Nav, reveal animations, booking‑form handler
assets/          Logo + team photos
vercel.json      Static hosting config
```

## Local preview

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Deploy

```bash
vercel --prod
```
