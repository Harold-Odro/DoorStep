#!/bin/bash
set -e

# Change Apache port to match Render's PORT env var (default 8080)
PORT=${PORT:-8080}
sed -i "s/Listen 80/Listen ${PORT}/" /etc/apache2/ports.conf
sed -i "s/:80/:${PORT}/" /etc/apache2/sites-available/000-default.conf

# Run migrations
php artisan migrate --force

# Cache config and routes
php artisan config:cache
php artisan route:cache

# Start Apache
apache2-foreground
