# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Doorstep Autowash Service — a mobile car wash booking web app for British Columbia, Canada. Monorepo with separate frontend and backend directories.

- **Live frontend:** https://door-step-lilac.vercel.app
- **Live backend:** https://doorstep-f62y.onrender.com

## Development Commands

### Backend (doorstep-backend/)
```bash
# Start Laravel dev server
cd doorstep-backend && php artisan serve
# API at http://localhost:8000

# Run migrations
php artisan migrate

# Seed database (admin@doorstepauto.ca / password, customer@doorstepauto.ca / password)
php artisan db:seed

# Run tests
php artisan test

# List routes
php artisan route:list --path=api

# Clear config cache (do this after .env changes)
php artisan config:clear
```

### Frontend (doorstep-frontend/)
```bash
cd doorstep-frontend && npm run dev
# App at http://localhost:5173

npm run build
npm run lint
```

## Architecture

**Backend: Laravel 11 REST API + Sanctum token auth + SQLite (local) / PostgreSQL (production)**

- `routes/api.php` — All API routes: auth (`/api/auth/*`), public services (`/api/services`), customer bookings (`/api/bookings`), admin (`/api/admin/*`). Also has debug routes (`/api/debug/mail`, `/api/debug/test-email`) — remove these before production.
- `app/Http/Controllers/Api/` — Customer-facing controllers; `Admin/` subdirectory for admin controllers
- `app/Http/Controllers/Api/BookingController.php` — Creates bookings and sends confirmation email (try/catch so email failure doesn't break the booking)
- `app/Http/Middleware/AdminMiddleware.php` — Checks `$user->role === 'admin'`; aliased as `'admin'` in `bootstrap/app.php`
- `app/Http/Requests/` — Form request validation classes
- `app/Http/Resources/` — API resource transformers (UserResource, ServiceResource, StaffResource, BookingResource)
- `app/Models/` — User (has `role` enum: customer/admin), Service, Staff, Booking (with relationships)
- `app/Mail/BookingConfirmationMail.php` — Mailable sent on booking creation; template at `resources/views/emails/booking-confirmation.blade.php`
- `bootstrap/app.php` — Middleware config: Sanctum stateful API prepended, CSRF disabled for `api/*`, admin alias registered

**Frontend: React 19 + Vite + Tailwind CSS v4**

- `src/context/AuthContext.jsx` — Global auth state via React Context; provides `login`, `register`, `logout`, `user`, `isAdmin`, `isAuthenticated`
- `src/lib/axios.js` — Axios instance with `baseURL` from `VITE_API_URL` env var (falls back to `http://localhost:8000`), Bearer token interceptor from localStorage, `withCredentials: true`
- `src/pages/` — Public pages (Home, Services, Login, Register) + protected pages (Book, Dashboard, BookingDetail) + `admin/` subdirectory
- `src/components/` — Reusable UI (Navbar, ServiceCard, BookingCard, StatusBadge, StepIndicator, LoadingSpinner, ProtectedRoute, AdminRoute, AdminLayout)
- `src/App.jsx` — Route definitions with `<ProtectedRoute>` and `<AdminRoute>` wrappers

## Key Technical Details

- **Tailwind CSS v4** (NOT v3): Uses `@import "tailwindcss"` and `@theme {}` block in `src/index.css`. No `tailwind.config.js`. Do not use `@tailwind` directives or v3 config patterns.
- **Auth flow**: Token-based (not SPA/cookie). Frontend stores token in localStorage, attaches as Bearer header. Backend uses `auth:sanctum` middleware.
- **CORS**: Configured in `config/cors.php` with `supports_credentials: true`. Allowed origins are env-driven via `FRONTEND_URL`, plus localhost fallbacks.
- **CSRF**: Explicitly excluded for `api/*` in `bootstrap/app.php` via `validateCsrfTokens(except: ['api/*'])`.
- **Database**: SQLite locally (`database/database.sqlite`), PostgreSQL in production. `DATABASE_URL` is mapped to `DB_URL` in `bin/docker-entrypoint.sh`.
- **Email**: Uses `resend/resend-laravel` package (HTTP API, not SMTP). Render's free tier blocks SMTP ports. Set `MAIL_MAILER=resend` and `RESEND_API_KEY` in production. Locally uses `MAIL_MAILER=log`.
- **Seeders**: Use `firstOrCreate` to be idempotent (safe to re-run). Seeding in production is triggered by `SEED_DB=true` env var.
- **Design system**: Dark premium theme with custom colors defined in `@theme` block. Uses `glassmorphism`, `shimmer`, `glow-hover` utility classes. Fonts: Bebas Neue (display), DM Sans (body), JetBrains Mono (mono).
- **PHP path on macOS/XAMPP**: Use `/Applications/XAMPP/xamppfiles/bin/php` if `php` is not in PATH.

## Deployment

- **Frontend**: Vercel (auto-deploys from GitHub). Set `VITE_API_URL` env var to backend URL. `vercel.json` handles SPA rewrites.
- **Backend**: Render (Docker). `Dockerfile` + `bin/docker-entrypoint.sh` handle build, migrations, seeding, config caching, and Apache startup. `DATABASE_URL` is parsed into `DB_URL` for Laravel.
- **Email**: Resend HTTP API. `onboarding@resend.dev` sender for testing; verify own domain for production sending.
