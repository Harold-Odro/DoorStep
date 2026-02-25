# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Doorstep Autowash Service — a mobile car wash booking web app for British Columbia, Canada. Monorepo with separate frontend and backend directories.

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

**Backend: Laravel 11 REST API + Sanctum token auth + SQLite**

- `routes/api.php` — All API routes: auth (`/api/auth/*`), public services (`/api/services`), customer bookings (`/api/bookings`), admin (`/api/admin/*`)
- `app/Http/Controllers/Api/` — Customer-facing controllers; `Admin/` subdirectory for admin controllers
- `app/Http/Middleware/AdminMiddleware.php` — Checks `$user->role === 'admin'`; aliased as `'admin'` in `bootstrap/app.php`
- `app/Http/Requests/` — Form request validation classes
- `app/Http/Resources/` — API resource transformers (UserResource, ServiceResource, StaffResource, BookingResource)
- `app/Models/` — User (has `role` enum: customer/admin), Service, Staff, Booking (with relationships)
- `bootstrap/app.php` — Middleware config: Sanctum stateful API prepended, CSRF disabled for `api/*`, admin alias registered

**Frontend: React 19 + Vite + Tailwind CSS v4**

- `src/context/AuthContext.jsx` — Global auth state via React Context; provides `login`, `register`, `logout`, `user`, `isAdmin`, `isAuthenticated`
- `src/lib/axios.js` — Axios instance with `baseURL: http://localhost:8000`, Bearer token interceptor from localStorage, `withCredentials: true`
- `src/pages/` — Public pages (Home, Services, Login, Register) + protected pages (Book, Dashboard, BookingDetail) + `admin/` subdirectory
- `src/components/` — Reusable UI (Navbar, ServiceCard, BookingCard, StatusBadge, StepIndicator, LoadingSpinner, ProtectedRoute, AdminRoute, AdminLayout)
- `src/App.jsx` — Route definitions with `<ProtectedRoute>` and `<AdminRoute>` wrappers

## Key Technical Details

- **Tailwind CSS v4** (NOT v3): Uses `@import "tailwindcss"` and `@theme {}` block in `src/index.css`. No `tailwind.config.js`. Do not use `@tailwind` directives or v3 config patterns.
- **Auth flow**: Token-based (not SPA/cookie). Frontend stores token in localStorage, attaches as Bearer header. Backend uses `auth:sanctum` middleware.
- **CORS**: Configured in `config/cors.php` with `supports_credentials: true`. Allowed origins include both `:5173` and `:5176`.
- **CSRF**: Explicitly excluded for `api/*` in `bootstrap/app.php` via `validateCsrfTokens(except: ['api/*'])`.
- **Database**: SQLite at `database/database.sqlite`. No MySQL/PostgreSQL setup needed.
- **Design system**: Dark premium theme with custom colors defined in `@theme` block. Uses `glassmorphism`, `shimmer`, `glow-hover` utility classes. Fonts: Bebas Neue (display), DM Sans (body), JetBrains Mono (mono).
- **PHP path on macOS/XAMPP**: Use `/Applications/XAMPP/xamppfiles/bin/php` if `php` is not in PATH.
