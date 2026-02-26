# Doorstep Autowash Service

A full-stack mobile car wash booking web application built for British Columbia, Canada. Professional car wash and detailing services delivered right to your doorstep.

## Live Demo

- **Frontend:** [door-step-lilac.vercel.app](https://door-step-lilac.vercel.app)
- **Backend API:** [doorstep-f62y.onrender.com](https://doorstep-f62y.onrender.com)

## Tech Stack

- **Frontend:** React 19 + Vite + Tailwind CSS v4
- **Backend:** Laravel 11 (REST API)
- **Database:** SQLite (local) / PostgreSQL (production)
- **Auth:** Laravel Sanctum (token-based)
- **Email:** Resend (HTTP API via `resend/resend-laravel`)
- **Hosting:** Vercel (frontend) + Render (backend, Docker)

## Prerequisites

- PHP 8.2+ with SQLite extension
- Composer
- Node.js 18+
- npm

## Local Development

### Backend Setup

```bash
cd doorstep-backend
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan serve
# API running at http://localhost:8000
```

### Frontend Setup

```bash
cd doorstep-frontend
npm install
npm run dev
# App running at http://localhost:5173
```

## Test Credentials

| Role     | Email                      | Password |
|----------|----------------------------|----------|
| Admin    | admin@doorstepauto.ca      | password |
| Customer | customer@doorstepauto.ca   | password |

## Sample Data Included

- **4 services:** Exterior Wash (CAD $19), Full Wash (CAD $39), Interior Detailing (CAD $79), Premium Package (CAD $119)
- **2 staff members:** Tyler Bennett, Mei-Ling Park
- **5 sample bookings** across all statuses (pending, confirmed, completed, cancelled)

## Project Structure

```
DoorStep/
├── doorstep-backend/          # Laravel 11 API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/
│   │   │   ├── Middleware/
│   │   │   ├── Requests/
│   │   │   └── Resources/
│   │   ├── Mail/
│   │   └── Models/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/api.php
│   ├── Dockerfile             # Docker config for Render
│   ├── Procfile               # Web process definition
│   └── nixpacks.toml          # Railway build config
│
├── doorstep-frontend/         # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   └── pages/
│   │       └── admin/
│   ├── index.html
│   └── vercel.json            # SPA rewrite rules
│
└── README.md
```

## API Endpoints

### Auth
- `POST /api/auth/register` — Register new customer
- `POST /api/auth/login` — Login (returns token)
- `POST /api/auth/logout` — Logout (auth required)
- `GET /api/auth/me` — Get current user (auth required)

### Services
- `GET /api/services` — List active services (public)

### Bookings (auth required)
- `GET /api/bookings` — List user's bookings
- `POST /api/bookings` — Create booking (sends confirmation email)
- `GET /api/bookings/{id}` — View booking detail
- `PUT /api/bookings/{id}/cancel` — Cancel booking

### Admin (auth + admin role required)
- `GET /api/admin/dashboard` — Dashboard stats
- `GET /api/admin/bookings` — All bookings (filterable by status)
- `PUT /api/admin/bookings/{id}` — Update booking status/staff
- `GET /api/admin/staff` — List staff
- `POST /api/admin/staff` — Create staff
- `PUT /api/admin/staff/{id}` — Update staff
- `DELETE /api/admin/staff/{id}` — Delete staff
- `POST /api/admin/services` — Create service
- `PUT /api/admin/services/{id}` — Update service
- `DELETE /api/admin/services/{id}` — Delete service

## Features

- Multi-step booking wizard with service selection, date/time picker, and address input
- Booking confirmation emails via Resend
- Promotional banner (10% new customer discount, 15% referral discount)
- Customer dashboard with upcoming appointments and booking history
- Admin panel with dashboard stats, booking management, service CRUD, and staff management
- Responsive design with premium dark theme
- Animated UI with glassmorphism effects, floating bubbles, and shimmer buttons

## Deployment

### Backend (Render — Docker)

1. Push to GitHub
2. Create a new **Web Service** on Render, set root directory to `doorstep-backend`, language to **Docker**
3. Add a **PostgreSQL** database on Render
4. Set environment variables:

| Variable | Value |
|----------|-------|
| `APP_KEY` | `php artisan key:generate --show` |
| `APP_ENV` | `production` |
| `APP_DEBUG` | `false` |
| `APP_URL` | Your Render URL |
| `DB_CONNECTION` | `pgsql` |
| `DATABASE_URL` | Internal DB URL from Render PostgreSQL |
| `FRONTEND_URL` | Your Vercel URL |
| `SANCTUM_STATEFUL_DOMAINS` | Your Vercel domain |
| `MAIL_MAILER` | `resend` |
| `RESEND_API_KEY` | Your Resend API key |
| `MAIL_FROM_ADDRESS` | `onboarding@resend.dev` (or verified domain) |
| `MAIL_FROM_NAME` | `Doorstep Autowash Service` |
| `SEED_DB` | `true` (remove after first deploy) |

### Frontend (Vercel)

1. Push to GitHub
2. Import repo on Vercel, set root directory to `doorstep-frontend`
3. Set environment variable: `VITE_API_URL` = your Render backend URL
4. Deploy (Vercel auto-detects Vite)

### Email Setup (Resend)

- Uses Resend HTTP API (not SMTP) — Render's free tier blocks SMTP ports
- Sign up at [resend.com](https://resend.com), get API key
- Free tier: 3,000 emails/month
- `onboarding@resend.dev` sender only delivers to your Resend account email
- Verify your own domain in Resend to send to any email address
