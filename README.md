# Doorstep Autowash Service

A full-stack mobile car wash booking web application built for British Columbia, Canada. Professional car wash and detailing services delivered right to your doorstep.

## Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS v4
- **Backend:** Laravel 11 (REST API)
- **Database:** SQLite
- **Auth:** Laravel Sanctum (token-based)

## Prerequisites

- PHP 8.2+ with SQLite extension
- Composer
- Node.js 18+
- npm

## Backend Setup

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

## Frontend Setup

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
│   └── routes/api.php
│
├── doorstep-frontend/         # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   └── pages/
│   │       └── admin/
│   └── index.html
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
- `POST /api/bookings` — Create booking
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
- Customer dashboard with upcoming appointments and booking history
- Admin panel with dashboard stats, booking management, service CRUD, and staff management
- Booking confirmation emails (logged in development)
- Responsive design with premium dark theme
- Animated UI with glassmorphism effects, floating bubbles, and shimmer buttons
# DoorStep
