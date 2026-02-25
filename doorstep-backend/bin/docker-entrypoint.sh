#!/bin/bash
set -e

# Change Apache port to match Render's PORT env var (default 8080)
PORT=${PORT:-8080}
sed -i "s/Listen 80/Listen ${PORT}/" /etc/apache2/ports.conf
sed -i "s/:80/:${PORT}/" /etc/apache2/sites-available/000-default.conf

# If DATABASE_URL is set, export as DB_URL so Laravel picks it up natively
if [ -n "$DATABASE_URL" ]; then
    export DB_CONNECTION=pgsql
    export DB_URL="$DATABASE_URL"
fi

# Run migrations
php artisan migrate --force

# Seed if the users table is empty (first deploy only)
php artisan tinker --execute="exit(App\Models\User::count() > 0 ? 0 : 1);" 2>/dev/null || php artisan db:seed --force

# Cache config and routes
php artisan config:cache
php artisan route:cache

# Start Apache
apache2-foreground
