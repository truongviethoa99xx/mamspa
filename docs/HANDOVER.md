# Hồ sơ bàn giao kỹ thuật — Mầm Spa

Checklist cho người/đội kế tiếp tiếp quản codebase. Đi kèm [ARCHITECTURE.md](ARCHITECTURE.md) (kiến trúc), [ADMIN_RESOURCES.md](ADMIN_RESOURCES.md) (bản đồ admin), [DEPLOY-CPANEL.md](../DEPLOY-CPANEL.md) (quy trình deploy thật).

## 1. Tài khoản & khoá cần được chuyển giao

Đánh dấu khi đã chuyển cho chủ sở hữu mới / đổi sang tài khoản của họ:

- [ ] **Domain** `mamspa.vn` — quyền quản lý DNS tại nhà đăng ký.
- [ ] **Hosting cPanel (Tino)** — tài khoản quản trị, SSH nếu có.
- [ ] **GitHub repo** `truongviethoa99xx/mamspa` — quyền owner/admin (đổi owner hoặc thêm chủ mới làm admin).
- [ ] **Google OAuth app** (`GOOGLE_CLIENT_ID/SECRET`) — dùng cho đăng nhập Google, kiểm tra project trên Google Cloud Console thuộc tài khoản nào.
- [ ] **Google Tag Manager** (`GTM_ID`) + **GA4** (`GA4_ID`) — quyền quản trị container/property.
- [ ] **SMS provider** (`SMS_PROVIDER`, Twilio `TWILIO_SID/TOKEN/FROM`) — tài khoản + số dư.
- [ ] **Cổng thanh toán**: VNPay (`VNPAY_TMN_CODE/HASH_SECRET`) — **kiểm tra lại** trước khi bàn giao; biến `MOMO_*` có trong `.env.example` nhưng **chưa xác nhận có `MomoService` thực thi hay không** — xem mục 4.
- [ ] **Dịch vụ dịch tự động** (`TRANSLATE_PROVIDER` + key tương ứng: `DEEPL_*` / `GOOGLE_TRANSLATE_KEY` / `OPENAI_KEY` / `GEMINI_*`).
- [ ] **Mail** (`MAIL_*`) — hộp thư gửi email xác nhận booking.
- [ ] **Reverb (realtime)** (`REVERB_*`, `VITE_REVERB_*`) — nếu self-host, kiểm tra process reverb đang chạy trên server bằng cách nào (supervisor/cron trên cPanel).

## 2. Đổi ngay sau khi bàn giao (bảo mật)

- [ ] **`database/seeders/AdminUserSeeder.php`** hiện hardcode 2 tài khoản admin, một trong số đó dùng **email cá nhân thật** và mật khẩu đơn giản dạng chuỗi cố định, commit thẳng vào source. Cần: đổi mật khẩu các tài khoản này trên production ngay, và cân nhắc xoá/thay email cá nhân trong file seeder để tránh lộ thông tin khi repo được chia sẻ tiếp.
- [ ] Xoay toàn bộ API key/secret ở mục 1 nếu nghi ngờ đã từng lộ (ví dụ từng dán vào chat, ticket hỗ trợ...).
- [ ] Xác nhận `.env` thật trên production **không** nằm trong git (chỉ `.env.example`/`.env.cpanel.example` được commit).

## 3. Biến môi trường cần cấu hình (tên biến — xem `.env.example`)

Nhóm chính: `APP_*` (gồm `APP_AVAILABLE_LOCALES`, `APP_FALLBACK_LOCALE`), `DB_*`, `CACHE_DRIVER`/`SESSION_DRIVER`/`QUEUE_DRIVER`/`BROADCAST_CONNECTION` (production dùng `database`/`file`, **không dùng Redis**), `FILESYSTEM_DISK`, `LOG_*`, `IS_ACTIVE_ADMIN`, `AUTH_REGISTRATION_ENABLED`, `GOOGLE_CLIENT_ID/SECRET/REDIRECT_URI`, `MAIL_*`, `SMS_PROVIDER` + `TWILIO_*`, `VNPAY_*`, `MOMO_*`, `TRANSLATE_PROVIDER` + key theo provider, `GTM_ID`, `GA4_ID`, `REVERB_*` + `VITE_REVERB_*`.

Riêng cPanel còn cần (chỉ có trong `.env.cpanel.example`): **`INERTIA_SSR_NODE_BINARY`** — đường dẫn tuyệt đối tới `node` trên host, bắt buộc để SSR cho bot hoạt động (PATH của PHP-FPM không có `node`).

## 4. Việc cần xác minh / nợ kỹ thuật

- [ ] **Xác nhận tích hợp Momo có thực sự hoạt động** — biến `MOMO_*` có trong env nhưng chưa tìm thấy `MomoService`/controller xử lý rõ ràng trong lần audit gần nhất. Nếu không dùng, nên dọn biến thừa; nếu có dùng, bổ sung vào `ARCHITECTURE.md`.
- [ ] **`spatie/laravel-translatable` được cài nhưng dường như không model nào dùng trait `HasTranslations`** (các model nội dung dùng cột `array` cast tự quản lý qua `TranslatableField::group()`). Nên xác nhận lại ở `Service`/`BlogPost` cụ thể, và cân nhắc gỡ package nếu thật sự không dùng, hoặc ghi chú rõ lý do giữ lại.
- [ ] **Không có test tự động cho `isCrawlerRequest()`/SSR** — chỉ kiểm tra thủ công bằng `curl` sau mỗi lần deploy (xem `ARCHITECTURE.md` mục 5). Nên viết 1 test Pest xác nhận regex nhận diện bot đúng, tránh tái diễn lỗi do sửa nhầm pattern.
- [ ] **Không có test suite JS/E2E** (không Playwright/Vitest). Các luồng quan trọng (booking, đổi ngôn ngữ, menu PDF) hiện chỉ test tay.
- [ ] **`docs/DEPLOY.md` (cũ)** mô tả hạ tầng Ubuntu/Nginx/Redis chưa từng được dùng — đã đánh dấu superseded trong file đó, trỏ sang `DEPLOY-CPANEL.md`. Khuyến nghị xoá hẳn khi không còn cần tham chiếu lịch sử.
- [ ] **`CLAUDE.md`** (spec Claude Code tự đọc) còn vài mục lỗi thời so với code thật: mô tả model `Branch` riêng (đã bị xoá), REST API `v1` đầy đủ endpoint (hiện chỉ là placeholder rỗng), kiến trúc CMS "block" (đã thay bằng model/trang riêng từng loại), dùng shadcn/ui (thực tế không dùng), khuyến nghị deploy VPS Ubuntu+Nginx+Redis (thực tế deploy cPanel). Nên cập nhật lại để các phiên làm việc sau (kể cả AI) không bị dẫn sai hướng.

## 5. Quy trình deploy thật (tóm tắt — chi tiết xem `DEPLOY-CPANEL.md`)

Code (gồm cả `vendor/`, `public/build/`, `bootstrap/ssr/`) được **commit thẳng vào git** vì server cPanel không có Composer/npm. Sau mỗi lần build + push:

```bash
cd ~/repositories/mamspa
git pull origin main
php artisan migrate --force          # chỉ khi có migration mới
php artisan optimize:clear
php artisan config:cache && php artisan route:cache && php artisan view:cache
php artisan filament:optimize
```

Kiểm tra lại bot-SSR sau mỗi lần deploy bằng 2 lệnh `curl` ở `ARCHITECTURE.md` mục 5.

## 6. Liên hệ hỗ trợ kỹ thuật ban đầu

Điền thông tin người/đội phát triển ban đầu và kênh liên hệ ưu tiên (email/Zalo/...) khi bàn giao chính thức, để chủ dự án mới biết liên hệ ai nếu phát sinh vấn đề trong giai đoạn chuyển giao.
