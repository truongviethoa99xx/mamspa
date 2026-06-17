#!/bin/sh
set -e

cd /var/www

# The storage dir may be a fresh named volume → recreate the framework skeleton.
mkdir -p \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/app/public \
    storage/logs \
    bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache || true

# Fail fast if the app key is missing (must be provided via environment).
if [ -z "${APP_KEY}" ]; then
    echo "WARNING: APP_KEY is empty. Set it in your environment (php artisan key:generate --show)."
fi

# Run migrations on boot (disable with RUN_MIGRATIONS=false, e.g. for extra workers).
if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
    echo "Running database migrations..."
    i=0
    until php artisan migrate --force --no-interaction; do
        i=$((i + 1))
        if [ "$i" -ge 20 ]; then
            echo "Database not reachable after 20 attempts — continuing without migrating."
            break
        fi
        echo "Database not ready (attempt $i), retrying in 3s..."
        sleep 3
    done
fi

# Public storage symlink for media library uploads.
php artisan storage:link 2>/dev/null || true

# Warm framework caches.
php artisan config:cache
php artisan route:cache
php artisan view:cache

exec "$@"
