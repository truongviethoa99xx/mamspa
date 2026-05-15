# Deployment — Maha Spa

## Yêu cầu server

- Ubuntu 22.04 LTS
- PHP 8.3 + extensions: `mbstring`, `xml`, `bcmath`, `mysql`, `gd`, `redis`, `intl`
- MySQL 8 hoặc PostgreSQL 16
- Redis 6+
- Nginx 1.22+
- Node.js 22 + npm 10 (chỉ cần khi build assets — có thể build trên CI)
- Composer 2.5+

## Bước deploy

```bash
# 1. Clone & install
git clone git@github.com:truongviethoa99xx/mahaspa.git
cd mahaspa
composer install --no-dev --optimize-autoloader
npm ci && npm run build

# 2. Env
cp .env.example .env
# → sửa: APP_ENV=production, APP_DEBUG=false, DB_*, REDIS_*, MAIL_*, VNPAY_*
php artisan key:generate

# 3. Database
php artisan migrate --force
php artisan db:seed --class=RolePermissionSeeder --force
php artisan db:seed --class=AdminUserSeeder --force
# Có thể seed dữ liệu mẫu nếu cần: php artisan db:seed --force

# 4. Storage
php artisan storage:link
chown -R www-data:www-data storage bootstrap/cache

# 5. Cache
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan filament:optimize
```

## Nginx config (mahaspa.vn)

```nginx
server {
    listen 80;
    server_name mahaspa.vn www.mahaspa.vn;
    return 301 https://mahaspa.vn$request_uri;
}

server {
    listen 443 ssl http2;
    server_name mahaspa.vn;

    ssl_certificate /etc/letsencrypt/live/mahaspa.vn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mahaspa.vn/privkey.pem;

    root /var/www/mahaspa/public;
    index index.php;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    location ~ /\.(?!well-known).* { deny all; }

    client_max_body_size 16M;
}
```

## Queue worker (systemd)

`/etc/systemd/system/mahaspa-queue.service`:

```ini
[Unit]
Description=Maha Spa Laravel queue worker
After=redis.service

[Service]
User=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/mahaspa/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600

[Install]
WantedBy=multi-user.target
```

```bash
systemctl enable --now mahaspa-queue
```

## Scheduler (cron)

```cron
* * * * * cd /var/www/mahaspa && php artisan schedule:run >> /dev/null 2>&1
```

## SSL

```bash
certbot --nginx -d mahaspa.vn -d www.mahaspa.vn
```

## Backup

Script `/usr/local/bin/backup-mahaspa.sh` (cron daily 03:00):

```bash
#!/bin/bash
DATE=$(date +%F)
mysqldump -u root mahaspa | gzip > /backups/mahaspa-db-$DATE.sql.gz
tar czf /backups/mahaspa-storage-$DATE.tar.gz /var/www/mahaspa/storage/app
find /backups -mtime +14 -delete
```

## Health check

- `GET /up` → Laravel health endpoint
- `GET /sitemap.xml` → kiểm tra SEO
- Filament `/admin` → login bằng admin@mahaspa.vn

## Rollback

```bash
git checkout <previous-tag>
composer install --no-dev --optimize-autoloader
php artisan migrate:rollback --step=1   # nếu cần
php artisan config:cache && php artisan route:cache
systemctl restart php8.3-fpm mahaspa-queue
```
