<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace client

Next.js 16.4.3 App Router frontend (client only). The companion API is the sibling repo `../studio-space-server` (Express + MongoDB); nothing in this repo calls it yet. There is no test runner or test script.

## Commands

- `npm run dev` — Turbopack dev server.
- `npm run build` — production build; also runs TypeScript and prerendering checks.
- `npx tsc --noEmit` — typecheck only. On a fresh clone (or after adding routes), run `npx next typegen` first: `next-env.d.ts` is gitignored and `PageProps` / `LayoutProps` types are generated into `.next/`.
- `npm run lint` — ESLint. It currently reports two pre-existing `react-hooks/set-state-in-effect` errors in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`; don't "fix" them unless the task touches those files.
- `npx shadcn add <component>` — add UI primitives using the installed CLI and existing `components.json` (`base-nova`, Base UI).

## Layout

- `src/app` — App Router. The root layout (`src/app/layout.tsx`) renders `src/components/shared/Navbar` on every page.
- `src/components/ui` — generated shadcn components (mostly `"use client"`), keyed by `data-slot`.
- `src/components/shared` — app-specific components, PascalCase filenames (`Navbar.tsx`).
- `@/*` maps to `src/*`.
- `PageProps` / `LayoutProps` are global route helpers — do not import them.

## Stack gotchas

- `next.config.ts` enables `cacheComponents` and `partialPrefetching`. Uncached async data must sit inside `<Suspense>` or the build fails; use `'use cache'` plus `cacheLife()` for cacheable data. See `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`. Links prefetch only the static app shell by default; add `prefetch={true}` when a page needs `params` / `searchParams` prefetched.
- `experimental.agentFeedback` is enabled, so `next dev` rewrites the managed Next.js block above. Keep that block and commit this file with your changes.
- UI primitives are Base UI (`@base-ui/react`), not Radix. Compose with `render={<Button />}`; there is no `asChild`.
- `cn` comes from the `cn` package (`import { cn } from "cn"`). `src/lib/utils.ts` only re-exports it; there is no clsx/tailwind-merge stack.
- Tailwind v4 is CSS-first: theme tokens live in `src/app/globals.css`, and there is no `tailwind.config.*`. CSS is compiled by the `@tailwindcss/turbopack` rule in `next.config.ts`; don't add a PostCSS config.
- Shiki is imported per-language in `src/lib/highlighter.tsx`. Register new languages/aliases there instead of importing the full `shiki` bundle.
