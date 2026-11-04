# StudioSpace

A full-stack marketplace for discovering, booking, and listing creative studio spaces.

## Overview

StudioSpace is a full-stack marketplace where creative professionals discover, book, and list production spaces. Hosts publish studios with photos, amenities, pricing, capacity, and availability, while visitors browse a curated catalog and reserve a space by date and time. The application pairs a Next.js front end with a dedicated Express and MongoDB API, keeping data fetching, authentication, and business rules cleanly separated. No mock data is used; the client talks directly to the running API.

The client is built on the Next.js App Router with React Server Components. Server-side fetch helpers read live data with no caching, so listings, bookings, and wishlist entries always reflect the current database. The interface uses Tailwind CSS v4 and shadcn components built on Base UI, with a responsive layout, dark and light themes, route-level loading skeletons, and a custom not-found page. Layouts adapt from mobile to desktop without losing any controls.

Authentication is handled by better-auth with email and password plus optional Google sign-in. Sessions are stored in MongoDB and issued as JWTs. A route proxy protects private pages, preserving the intended destination through registration and login, and the API verifies every token against the auth server's JWKS endpoint before allowing a write. Tokens are fetched on the client for mutations and on the server for scoped reads.

Ownership and integrity are enforced on the server. Studio hosts are recorded from the verified token, so a user cannot create, edit, or delete another host's listing, and hosts cannot book their own space. Booking requests are checked for time overlaps before insertion, cancelled reservations stay visible until removed, and wishlists are scoped to the signed-in account. Every list has loading, empty, and error states, and destructive actions ask for confirmation before running. The result is a compact, production-shaped application with real CRUD, real auth, and real database rules.

## Main Features

- **Authentication & Protected Routes** — Email/password registration and login through better-auth, with optional Google OAuth. Private pages (`/add-studio`, `/my-listings`, `/my-bookings`, `/studio-wishlist`) are guarded by `src/proxy.ts`, which redirects guests to registration and returns them to the original path after login.

- **JWT-Secured API** — Every write request carries a short-lived JWT issued by the auth server. The Express API verifies it against the JWKS endpoint with `jose`, resolves the user from the token payload, and rejects missing or expired tokens with `401`. User identity is never trusted from the request body.

- **Full Studio CRUD** — Hosts can create listings with multiple image URLs, category, hourly rate, security deposit, capacity, location, description, and amenities. Listings can be viewed, edited, and deleted, with validation feedback and toast notifications throughout.

- **Listing Ownership** — `POST /add-studio` stamps `hostEmail` from the verified token, so ownership cannot be spoofed. Cross-owner `PATCH` and `DELETE /studios/:id` requests return `403`. Public `/studios` hides the viewer's own listings, while `/my-listings` is private and reads the JWT-scoped `GET /my-studios`.

- **Booking & Availability Checks** — Signed-in users reserve a studio by date, start time, end time, and group size. The API rejects overlapping reservations for the same studio and date with `409`, enforces ownership rules, and blocks hosts from booking their own space with `403`.

- **My Bookings Management** — Users see only their own reservations, each with a status badge, schedule, member count, and total cost. Active bookings can be cancelled, cancelled bookings remain visible for reference, and a remove (X) action deletes them permanently.

- **Wishlist** — A database-backed wishlist lets users save studios with a heart toggle on any studio card. Entries are tied to the signed-in account, and `/studio-wishlist` renders the saved studios through dedicated cards.

- **Discovery & UX** — Server-side search across title, category, and location, plus featured studios and category browsing on the homepage. The app includes responsive layouts, dark/light theme switching, route-level skeleton loaders, a custom 404 page, accessible Base UI dialogs, and consistent toast feedback.

## Tech Stack

**Client**

- Next.js 16 (App Router, Turbopack) and React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui components built on Base UI
- better-auth with the MongoDB adapter and JWT plugin
- `next-themes`, `lucide-react`, `date-fns`

**Server**

- Node.js with Express 5
- MongoDB (official driver)
- `jose` for JWT verification
- CORS and dotenv

## Live URL

> `https://studiospace-ass-08.vercel.app`

## Local Setup

The project is two repositories that run side by side:

```
assignment-08/
├── studio-space-client/   # Next.js frontend (port 3000)
└── studio-space-server/   # Express API (port 8000)
```

### 1. Clone both repositories

```bash
git clone https://github.com/samratahmed2000/studio-space-client.git
git clone https://github.com/samratahmed2000/studio-space-server.git
```

### 2. Install dependencies

```bash
cd studio-space-client && npm install
cd ../studio-space-server && npm install
```

### 3. Configure the API

Create `studio-space-server/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
PORT=8000
```

### 4. Configure the client

Create `studio-space-client/.env` (see `.env.example`):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=optional_google_client_id
GOOGLE_CLIENT_SECRET=optional_google_client_secret
```

Google sign-in is optional; email/password works without those two values.

### 5. Run both apps

```bash
# Terminal 1 — API
cd studio-space-server
npm start

# Terminal 2 — client
cd studio-space-client
npm run dev
```

Open `http://localhost:3000`. The API must be running for listings, bookings, and wishlist data to load.

## Examiner Test Credentials

| Role | Email               | Password       |
| ---- | ------------------- | -------------- |
| User | `testuser@mail.com` | `testUser1234` |

#### You can direct login using Google Login.
