# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## AutoNxt Website (`artifacts/autonxt`)

Full corporate website for AutoNxt (Indian electric tractor company).

### Tech stack
- React + Vite + TypeScript + Tailwind CSS
- framer-motion for animations
- wouter for routing
- shadcn/ui components
- `@assets` alias → `attached_assets/`

### Theme
- Light/dark mode with `ThemeProvider` (default: light)
- Metallic red (`hsl 0 72% 40%`) primary, steel blue accent
- Dark mode: `bg-background`, `bg-card`, `bg-popover` semantic tokens throughout

### Multi-language support (i18n)
- Languages: English (EN), Hindi (हिंदी), Marathi (मराठी)
- Context: `src/contexts/LanguageContext.tsx` — `useLang()` hook returns `{ lang, setLang, t }`
- Translations: `src/i18n/translations.ts` — `translations.en/hi/mr` objects
- Language saved to `localStorage` key `autonxt-lang`
- Language switcher in Navbar dropdown (desktop) and buttons (mobile)

### Pages
- `/` — Home (hero, stats, features, videos, FAQ, CTA)
- `/product` — Product page
- `/industry` — Industry verticals
- `/gallery` — Photos / Events / Videos tabs + lightbox
- `/contribution` — Sustainability/ESG
- `/about` — Team, advisors, mission, process
- `/book` — Book a demo form
- `/news` — Press & announcements
- `/blog` — AutoNxt blog
- `/ev-blog` — EV knowledge hub

### Key assets
- Tractor images, gallery event photos (June 29, 2025 handover ceremony)
- YouTube videos: 3PVEHTybb_o, 9Px1KnfeBdY, kia8cxkaUJc, u2a1EoXayrk, UHtiUSmO27I, Z6107d2ygF0
- Team portraits for all members + advisors
- LinkedIn: `https://www.linkedin.com/company/autonxt-automation`

### Routing
- Web app mounted at root `/` (preview path `/`)
- API server at `/api`
