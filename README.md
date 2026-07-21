# Silicon Zoo

A playful unofficial registry of animals already claimed by tech brands, products, and open-source projects.

> Every tech company wants a cute animal. Most of the good ones are already taken.

## Stack

- Next.js App Router + TypeScript
- Plain CSS design tokens from the HTML prototype
- Zod-validated JSON data
- Fuse.js fuzzy search fallback
- Vitest + Playwright
- Vercel Analytics + optional PostHog

No database, CMS, auth, or Tailwind in V1.

## Develop

```bash
npm install
npm run dev
```

Useful scripts:

```bash
npm test
npm run validate:assets
npm run build
npm run test:e2e
```

## Data

- Prototype seed: `silicon-zoo.html`
- Product specification: `Silicon-Zoo-Product-Specification-HE.docx`
- Normalized data: `src/data/animals.json`, `src/data/uses.json`
- Remigrate: `npm run migrate:data`
- Download tier-1 assets: `npm run assets:tier1`

## License

- Code: MIT (`LICENSE`)
- Original content/data: CC BY 4.0 (`CONTENT_LICENSE`)
- Third-party brand assets: not licensed by this repo (`THIRD_PARTY_ASSETS.md`)
