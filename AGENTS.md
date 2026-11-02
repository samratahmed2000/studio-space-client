<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace client

Next.js 16.4.3 App Router frontend. No tests and no CI. The API is the sibling repo `../studio-space-server` (Express 5 + MongoDB, port 8000); this app fetches it directly — there are no mocks.

## Commands

- `npm run dev` — Turbopack dev server (port 3000).
- `npm run build` — production build; also runs TypeScript and prerenders `/` and `/studios`, which fetch the API. Start the API or the build fails.
- `npx next typegen && npx tsc --noEmit` — typecheck. `next-env.d.ts` is gitignored; `next typegen` regenerates it and the route types in `.next/` after a fresh clone or new route.
- `npm run lint` — `eslint` only (no `--fix` script).
- `npx shadcn add <component>` — uses the existing `components.json` (`base-nova` style, Base UI, no Radix).
- No test runner or test script exists; verify with lint and build.

## Known pre-existing failures

- `npx tsc --noEmit` is clean. `npm run lint` reports 2 `react-hooks/set-state-in-effect` errors in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`; leave them unless your task touches those files.

## Setup / data flow

- Requires `.env` with `NEXT_PUBLIC_API_URL` (gitignored; currently `http://localhost:8000`).
- `src/data-fetch/*` are server-side fetch helpers (default exports; `.tsx` files with no JSX) using `next: { revalidate: 60 }`. Async server components call them directly. Because of that cache, `router.refresh()` alone serves stale data after a mutation — invalidate with `revalidatePath` in a server action.
- Mutations go through the server actions in `src/actions/studioActions.ts` (POST `/add-studio`, PATCH `/studios/:id`, DELETE `/studios/:id`), which call `revalidatePath` for `/`, `/studios`, and (for updates) the edited detail page. Client components call them from handlers, then `router.refresh()` / `router.push()`. There is no form or validation library.
- The companion API has no dev script: run `npm start` in `../studio-space-server` (plain `node`, needs `MONGODB_URI`).

## Layout / routing

- Routes: `/`, `/studios`, `/studios/[id]`, `/add-studio`, and `/login` + `/register` (the `(dashboard)` and `(auth)` route groups add no URL segment).
- Auth is better-auth mounted at `/api/auth/[...all]` (`src/lib/auth.ts`, Mongo adapter); client helpers come from `src/lib/auth-client.ts`. Auth forms live in `src/components/auth/`; password rules are in `src/lib/validation.ts` and must stay in sync with `emailAndPassword.minPasswordLength`. Google login only works when `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` are set.
- Private routes are guarded by `src/proxy.ts`, which sends logged-out visitors to `/register?redirectTo=<path>` and remembers the path in the `studio-space-redirect` cookie. Registration signs the user out, sends them to `/login` (keeping `redirectTo`), and login returns them to that path; the Navbar profile dropdown only renders once a session exists. `src/lib/redirect.ts` sanitizes `redirectTo` against open redirects.
- The root layout always renders `Navbar`, `Footer`, and `Toaster`.
- `src/components/ui` holds generated shadcn primitives; app components live in `src/components/<domain>`; `src/helper` has `Logo` and `NewsletterForm`.
- `PageProps` / `LayoutProps` are global generated types — don't import them. Next 16 route `params` / `searchParams` are Promises; await them.
- Shared constants: amenities in `src/lib/amenities.ts`, types in `src/types/type.ts`.

## Stack gotchas

- Base UI, not Radix: compose with `render={<Button />}`; there is no `asChild`.
- `cn` comes from the `cn` package (`import { cn } from "cn"`); `src/lib/utils.ts` only re-exports it. No clsx/tailwind-merge stack.
- Tailwind v4 is CSS-first: tokens live in `src/app/globals.css`, there is no `tailwind.config.*` and no PostCSS config. CSS is compiled by the `@tailwindcss/turbopack` rule in `next.config.ts`.
- `cacheComponents` and `partialPrefetching` are explicitly `false`; don't add `<Suspense>` or `'use cache'` expecting the build to enforce them.
- `next/image` accepts any HTTPS host (`images.remotePatterns` in `next.config.ts`); studio images are user-supplied URLs.
- Toasts use Base UI's manager: `toast.add({ title, description })` from `@/components/ui/toast` (not sonner's `toast()`).
- Shiki languages are registered per-language in `src/lib/highlighter.tsx`; add them there instead of importing the full `shiki` bundle.
- `experimental.agentFeedback` is enabled, so `next dev` rewrites the managed Next.js block above. Keep that block and commit this file with your changes.
