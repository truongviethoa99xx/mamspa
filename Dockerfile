# syntax=docker/dockerfile:1

##############################################
# Stage 1 — Build frontend assets (Vite)     #
##############################################
FROM node:20-alpine AS assets
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Client-only build (no SSR) → outputs public/build
RUN npm run build:client

##############################################
# Stage 2 — PHP dependencies (Composer)      #
##############################################
FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install \
        --no-dev --no-scripts --prefer-dist \
        --no-interaction --no-progress --optimize-autoloader
COPY . .
RUN composer dump-autoload --no-dev --optimize --classmap-authoritative

##############################################
# Stage 3 — Runtime (PHP-FPM + Nginx)        #
##############################################
FROM php:8.3-fpm-alpine AS app

# Runtime + build libraries, then PHP extensions
RUN apk add --no-cache \
        nginx supervisor \
        libpng libjpeg-turbo freetype libzip icu-libs oniguruma \
    && apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS libpng-dev libjpeg-turbo-dev freetype-dev libzip-dev icu-dev oniguruma-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" pdo_mysql gd zip bcmath intl exif pcntl opcache \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del .build-deps

WORKDIR /var/www

# Application source (respects .dockerignore)
COPY . .
# Bring in compiled deps + built assets from previous stages
COPY --from=vendor /app/vendor ./vendor
COPY --from=assets /app/public/build ./public/build

# Container configuration
COPY docker/php/php.ini       /usr/local/etc/php/conf.d/zzz-app.ini
COPY docker/php/www.conf      /usr/local/etc/php-fpm.d/zz-www.conf
COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf
COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/entrypoint.sh     /usr/local/bin/entrypoint
RUN chmod +x /usr/local/bin/entrypoint \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 80

ENTRYPOINT ["entrypoint"]
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
