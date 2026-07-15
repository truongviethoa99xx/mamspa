# Deploy Maha Spa lên hosting cPanel (không Docker)

> cPanel shared hosting **không build được Docker / Vite / Node nền** và **thường
> không có Composer**. Cách làm: build + cài dependency ở máy local, **commit cả
> `vendor/` và `public/build/` vào git**, rồi trên cPanel chỉ cần `git pull`.
> Project đã gỡ bỏ hoàn toàn Docker — chỉ chạy PHP/MySQL thuần.

> ⚠️ **KHÔNG cần chạy `composer install` / `npm install` trên cPanel.** Vì `vendor/`
> và `public/build/` đã nằm sẵn trong git, server chỉ pull về là đủ. Mọi lệnh
> `composer`/`npm` chỉ chạy ở **máy local** trước khi push (xem mục 2).
> Nếu thật sự cần Composer trên server: xem mục 9 (tải `composer.phar`).

---

## 0. Những gì đã chỉnh cho cPanel

| Hạng mục | Trước | Sau (cPanel-ready) |
|---|---|---|
| `public/.htaccess` | **trống → 404 mọi route** | rewrite chuẩn Laravel + HTTPS + cache |
| `.htaccess` gốc | không có | route vào `/public` khi không đổi được document root |
| Build script | `vite build && vite build --ssr` | `vite build` (bỏ SSR — cPanel không chạy Node nền) |
| Cache / Session / Queue | `redis` | `database` / `file` / `database` (xem `.env.cpanel.example`) |
| Đóng gói | — | `scripts/deploy/build-cpanel.sh` tạo zip upload |
| Docker | `Dockerfile`, `docker-compose.yml`, `docker/` | **đã xoá toàn bộ** |

SSR không được dùng ở runtime (blade dùng `@inertia` client-side) nên bỏ `--ssr` an toàn.

---

## 1. Yêu cầu phía hosting

- PHP **8.3+** (cPanel → *MultiPHP Manager* chọn 8.3), bật extension: `pdo_mysql`,
  `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`, `fileinfo`, `gd`,
  **`intl`** (bắt buộc — Filament dùng cho phân trang, thiếu là 500 mọi trang admin có bảng).
  Kiểm tra ở cPanel → *Select PHP Version* → tab *Extensions* → tick `intl` + `fileinfo`.
- MySQL 8 (hoặc MariaDB 10.6+).
- Cho phép tạo **Cron Job** (gần như host nào cũng có).
- *(Khuyến nghị)* SSH access — chạy `artisan` tiện hơn. Nếu không có SSH, mục 6 có cách
  chạy `artisan` qua file PHP tạm.

---

## 2. Build artifact ở máy LOCAL

```bash
bash scripts/deploy/build-cpanel.sh
```

Script sẽ: `npm ci && npm run build` → `composer install --no-dev --optimize-autoloader`
→ xoá `public/hot` → nén `dist/mahaspa-cpanel-<timestamp>.zip`.

> Đã có sẵn `vendor/` và `public/build/` production trong zip vì server **không**
> cài Composer / build Vite được.

---

## 3. Chọn cách bố trí thư mục (QUAN TRỌNG)

### Cách A — Đổi được document root (KHUYẾN NGHỊ, sạch & an toàn nhất)

cPanel → *Domains* → domain của bạn → *Manage* → đổi **Document Root** thành
`mahaspa/public`.

```
/home/cpaneluser/
└── mahaspa/              ← giải nén artifact vào đây (NGOÀI public_html)
    ├── app/  bootstrap/  config/  vendor/ …
    └── public/           ← document root trỏ vào ĐÂY
```

Toàn bộ code nằm ngoài web root → không ai truy cập trực tiếp `.env`, `vendor`…
Với cách này **xoá file `.htaccess` ở thư mục gốc** (không cần tới).

### Cách B — KHÔNG đổi được document root (host khoá `public_html`)

Giải nén toàn bộ artifact thẳng vào `public_html/`. File `.htaccess` ở gốc (đã tạo sẵn)
sẽ tự route request vào `public/` và chặn truy cập file nhạy cảm.

```
/home/cpaneluser/public_html/
├── .htaccess            ← route → public/ (giữ lại ở cách B)
├── app/  vendor/ …
└── public/.htaccess     ← rewrite Laravel
```

> Cách B kém an toàn hơn — chỉ dùng khi host không cho đổi document root.

---

## 4. Upload & giải nén

1. cPanel → *File Manager* → upload `mahaspa-cpanel-*.zip` vào thư mục đích (mục 3).
2. Chuột phải → *Extract*.
3. Xoá file zip sau khi giải nén.

---

## 5. Cấu hình `.env`

1. Copy mẫu: đổi tên `.env.cpanel.example` → `.env`.
2. Điền: `DB_*` (tạo DB & user ở cPanel → *MySQL Databases*, nhớ prefix `cpaneluser_`),
   `APP_URL=https://mahaspa.vn`, `MAIL_*`, các key thanh toán / SMS / translate.
3. **Tạo APP_KEY** (xem mục 6).

---

## 6. Chạy lệnh artisan trên server

> 🚫 **Không cần Composer ở bước này.** `vendor/` đã pull về cùng git nên artisan
> chạy được ngay — các lệnh dưới chỉ cần **PHP CLI**.
> Nếu host thiếu cả PHP CLI: xem mục 6.4. Nếu thật sự cần Composer: mục 9.

### Có SSH

```bash
cd ~/mahaspa            # hoặc ~/public_html ở cách B
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force          # chỉ chạy LẦN ĐẦU (2 branch, services, trang Home…)
php artisan storage:link             # tạo public/storage → storage/app/public
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan filament:optimize
```

Tạo tài khoản admin Filament:

```bash
php artisan make:filament-user
```

### Không có SSH — chạy qua Terminal của cPanel

cPanel → *Terminal* (nếu host bật) → chạy y hệt các lệnh trên.

### Không có cả Terminal lẫn SSH

Tạo tạm file `public/__setup.php` để chạy 1 lần:

```php
<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
foreach ([
    ['key:generate', []],
    ['migrate', ['--force' => true]],
    ['db:seed', ['--force' => true]],
    ['storage:link', []],
    ['config:cache', []],
    ['route:cache', []],
    ['view:cache', []],
] as [$cmd, $opts]) {
    $kernel->call($cmd, $opts);
    echo "✔ $cmd\n<br>".nl2br($kernel->output())."\n<hr>";
}
```

Mở `https://mahaspa.vn/__setup.php` một lần, kiểm tra output, rồi **XOÁ NGAY** file này.
(Tạo admin Filament sau qua Terminal, hoặc thêm `['make:filament-user', [...]]` tương tự.)

> ⚠️ Mỗi lần deploy bản mới có đổi `.env`/route/config: chạy lại
> `config:cache route:cache view:cache` (hoặc `optimize:clear` rồi cache lại).

---

## 7. Cron Job (scheduler + queue)

cPanel → *Cron Jobs*. Đường dẫn PHP đúng phiên bản thường là
`/usr/local/bin/ea-php83` (kiểm tra ở *MultiPHP Manager*).

**a) Laravel scheduler** — mỗi phút:

```
* * * * * /usr/local/bin/ea-php83 /home/cpaneluser/mahaspa/artisan schedule:run >> /dev/null 2>&1
```

**b) Queue worker** (vì booking gửi email/SMS qua job `database`) — mỗi phút xử lý
hàng đợi rồi thoát (an toàn cho shared hosting, tránh process treo):

```
* * * * * /usr/local/bin/ea-php83 /home/cpaneluser/mahaspa/artisan queue:work --stop-when-empty --max-time=55 >> /dev/null 2>&1
```

> Không set được cron worker? → đổi `QUEUE_CONNECTION=sync` trong `.env`: job chạy
> ngay trong request (đặt lịch sẽ chậm thêm ~1-3s do gửi mail, nhưng vẫn hoạt động).

---

## 8. Quyền thư mục

`storage/` và `bootstrap/cache/` phải ghi được:

```bash
find storage bootstrap/cache -type d -exec chmod 755 {} \;
find storage bootstrap/cache -type f -exec chmod 644 {} \;
```

cPanel chạy PHP dưới user của bạn nên `755/644` là đủ (đừng dùng `777`).

---

## 9. Sự cố thường gặp

| Triệu chứng | Nguyên nhân & cách xử lý |
|---|---|
| **Trắng trang / asset không tải, console trỏ `localhost:5173`** | File `public/hot` bị upload. Xoá nó đi. Script build đã tự xoá, nhưng kiểm tra lại. |
| **404 mọi route trừ trang chủ** | Thiếu `public/.htaccess` hoặc host tắt `mod_rewrite` (`AllowOverride All`). |
| **500 Internal Server Error** | `.env` sai DB, thiếu `APP_KEY`, hoặc `storage/` không ghi được. Xem `storage/logs/laravel.log`. Tạm `APP_DEBUG=true` để xem lỗi rồi tắt lại. |
| **Ảnh upload không hiện** | Chưa chạy `php artisan storage:link`. Ở host không cho symlink: copy `storage/app/public/*` → `public/storage/`. |
| **Admin `/admin` lỗi** | Chưa `php artisan filament:optimize` hoặc chưa tạo user. |
| **500 ở các trang danh sách admin (blog-posts, bookings...), log báo `The "intl" PHP extension is required`** | Extension `intl` bị tắt. cPanel → *Select PHP Version* → *Extensions* → tick `intl`. |
| **Log báo `Class "finfo" not found` khi upload ảnh** | Extension `fileinfo` bị tắt. Bật tương tự như `intl` ở trên. |
| **Đổi `.env` không ăn** | Đang cache config. Chạy `php artisan config:clear` rồi `config:cache`. |
| **Mail không gửi** | Sai `MAIL_*`. Shared hosting thường chặn SMTP ngoài — ưu tiên SMTP nội bộ host (port 465/ssl) hoặc Mailgun/SendGrid API. |
| **`composer: command not found`** | **Bình thường — không cần Composer trên cPanel.** `vendor/` đã có sẵn qua `git pull`. Đừng chạy `composer install`. Nếu thật sự cần, dùng `composer.phar` (ngay dưới). |
| **Class mới (vừa thêm ở local) báo "not found" trên server** | Quên build lại autoloader trước khi push. Ở **local** chạy `composer dump-autoload --no-dev --optimize` rồi commit `vendor/composer/*` + push. |

### 9.1. Nếu thật sự cần Composer trên cPanel

Hầu như không cần (vendor đã commit). Nhưng nếu muốn có, tải `composer.phar` về home:

```bash
cd ~
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
# Gọi qua PHP (không có lệnh `composer` global):
php ~/composer.phar install --no-dev --optimize-autoloader
```

---

## 10. Quy trình cho lần deploy SAU (Git pull)

**Ở máy LOCAL** — build lại artifact rồi commit (vì `vendor/` + `public/build/` là
source được track):

```bash
composer install --no-dev --optimize-autoloader   # cập nhật vendor/
npm install --include=dev && npm run build         # cập nhật public/build/
rm -f public/hot
git add -A && git commit -m "deploy: rebuild vendor + assets" && git push origin main
```

**Trên cPanel** — chỉ pull + làm mới cache (KHÔNG composer/npm):

```bash
cd ~/repositories/mamspa
git pull origin main
php artisan migrate --force            # nếu có migration mới
php artisan optimize:clear
php artisan config:cache && php artisan route:cache && php artisan view:cache
php artisan filament:optimize
```

> Cách đóng gói zip (`scripts/deploy/build-cpanel.sh`) vẫn dùng được nếu host
> không bật Git Version Control — xem nhánh "zip" ở mục 2–4. Còn nếu dùng Git pull
> thì bỏ qua bước zip.

Không seed lại — `db:seed` chỉ chạy đúng một lần ở mục 6.
