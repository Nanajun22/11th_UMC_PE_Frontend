# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm**.

- `pnpm dev` — Next.js dev server (Turbopack)
- `pnpm build` — production build, including the TypeScript check; the route table it prints shows which routes are static (○) vs partial prerender (◐)
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint (`eslint-config-next` core-web-vitals + typescript)

There is no test runner configured.

This is **Next.js 16.4** (App Router, `cacheComponents: true`). APIs differ from older Next versions — check the bundled docs in `node_modules/next/dist/docs/` before using an unfamiliar API.

## Environment

`src/config/env.ts` reads `NEXT_PUBLIC_TMDB_API_BASE_URL`, `NEXT_PUBLIC_TMDB_ACCESS_TOKEN` (throws at import if missing) and `NEXT_PUBLIC_API_BASE_URL` (member backend) from `.env` / `.env.local`. `NEXT_PUBLIC_*` values are inlined at build time, so they must be referenced literally as `process.env.NEXT_PUBLIC_X`.

## Architecture

UMCine: a movie app (UI text is Korean) using TMDB data plus a separate member backend (auth, favorites, ratings). Migrated from Vite + TanStack Router in week 9; all data fetching is still client-side via TanStack Query.

- **Routing (`src/app/`)**: `page.tsx` files are thin Server Components that set `metadata` and render a Client Component from `src/views/<area>/`. Do not create `src/pages/` — Next would treat it as the Pages Router. Dynamic params are awaited in the server page and passed as props (`movies/[movieId]/page.tsx` + `loading.tsx`).
- **Cache Components / Suspense rules**: client hooks that read URL data must sit inside a `Suspense` boundary or the build fails — `useSearchParams` in `/search` is wrapped in `app/search/page.tsx`, and the header's `usePathname` nav (`components/layout/header-nav.tsx`) is wrapped in `Suspense` because `/movies/[movieId]` is dynamic.
- **Auth**: the JWT lives in a persisted Zustand store (`stores/auth-store.ts`, localStorage). Since the server can't see it, route protection is client-side: `app/(auth)/layout.tsx` uses `AuthGuard` (redirects to `/login`), and `/login` uses `GuestGuard` (redirects to `/`). `api/auth-api.ts` is a `ky` client that attaches the token and clears it on 401.
- **Browser-only state**: both persisted stores use `skipHydration: true`. `providers/app-providers.tsx` calls `persist.rehydrate()` in `useEffect`, and the auth store sets `isHydrated` when done. Anything that branches on login state must wait for `isHydrated` to avoid hydration mismatches. Keep `localStorage`/`alert`/`window` usage inside effects or event handlers.
- **Providers**: `AppProviders` (client) creates the `QueryClient` with `useState` (default `staleTime` 1 min) and mounts the React Query devtools. Query keys follow `["movies", "detail", id]`, `["members", "me"]`, `["favorites", ...]`, `["ratings", memberId]`; mutation hooks in `src/hooks/` invalidate them.
- **HTTP (`ky`)**: `api/tmdb-client.ts` (TMDB, Bearer header; request paths have no leading slash, e.g. `"movie/popular"`, with `language: "ko-KR"`) and `api/api-client.ts` (backend; responses use an `{ isSuccess, code, message, result }` envelope, except `getMemberRatings`, which returns a bare array). One API function per file under `src/api/<domain>/`.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/turbopack` (configured in `next.config.ts`, imported in `src/app/globals.css`). Use `cn()` from `utils/cn.ts`.
- **Imports**: `@/` → `src/`.

### Unused legacy files

These are left over from earlier weeks and aren't used by the app: `src/utils/bookmark-storage.ts`, `src/data/movies.ts`, `src/types/movie.ts`, `src/examples/`, `src/api/movies/get-movies-with-fetch.ts` and `src/components/layout/footer.tsx`.
