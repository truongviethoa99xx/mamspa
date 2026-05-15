# CLAUDE.md — Maha Spa Website Project Spec
> File này được đọc tự động bởi Claude Code mỗi khi khởi động trong thư mục project.
> Chứa toàn bộ spec kỹ thuật, module list, API routes và convention của dự án.
---
## 📌 Tổng quan dự án
- **Tên:** Maha Spa — mahaspa.vn
- **Loại:** Website spa booking + CMS có dashboard chỉnh sửa nội dung (kiểu WordPress)
- **Thành lập:** 2018 · Đà Nẵng, Việt Nam
- **Chi nhánh:**
  - Maha Heritage — 26 Nguyễn Văn Thoại · (+84) 934 743 026
  - Maha Signature — 185 Hồ Nghinh · (+84) 978 456 185
- **Tagline:** "The Beginning of the Journey to Balance Body - Mind - Spirit"
- **Ngôn ngữ:** Tiếng Việt (default) + English (`?lang=en`)
---
## 🛠️ Tech Stack
### Backend
- **Framework:** Laravel 11 (PHP 8.3+)
- **Database:** MySQL 8 (hoặc PostgreSQL 16)
- **ORM:** Eloquent
- **Auth:** Laravel Breeze (Inertia + React preset) + Laravel Sanctum
- **Admin Panel / CMS:** **Filament v3** — dashboard kiểu WordPress, CRUD content blocks, media library, form builder
- **Đa ngôn ngữ (DB):** `spatie/laravel-translatable` — field lưu JSON `{ "vi": "...", "en": "..." }`
- **Permissions/Roles:** `spatie/laravel-permission`
- **Media:** `spatie/laravel-medialibrary`
- **Queue/Jobs:** Laravel Queue + Redis (gửi email/SMS bất đồng bộ)
- **Email:** Laravel Mail + SMTP / Mailgun / SendGrid
- **SMS:** Twilio hoặc VIETTEL SMS API
### Frontend
- **Bridge:** **Inertia.js** (Laravel ↔ React, không cần build REST API riêng)
- **Framework:** React 18 + TypeScript
- **Build tool:** Vite
- **Styling:** TailwindCSS 3 + shadcn/ui
- **i18n (FE):** `react-i18next` — query param `?lang=vi|en`
- **State:** Zustand (nếu cần global state ngoài Inertia shared props)
- **HTTP:** Axios (chỉ dùng cho external API; nội bộ ưu tiên Inertia)
### DevOps / Infra
- **Protocol:** HTTP/2 + HTTPS
- **Charset:** UTF-8
- **Analytics:** Google Tag Manager (GTM-TTGB95P9) + GA4
- **Hosting:** VPS Ubuntu 22.04 + Nginx + PHP-FPM + MySQL (VN region)
- **Cache:** Redis
- **Storage:** Local hoặc S3-compatible (Cloudflare R2)
- **Deploy:** Laravel Forge / Ploi / GitHub Actions
---
## 📁 Project Structure (Laravel monorepo)
```
mahaspa/
├── CLAUDE.md                       # ← file này
├── app/
│   ├── Models/
│   │   ├── Branch.php
│   │   ├── Service.php
│   │   ├── Booking.php
│   │   ├── User.php
│   │   ├── Voucher.php
│   │   ├── Slot.php
│   │   ├── Promotion.php
│   │   ├── BlogPost.php
│   │   ├── Page.php                # CMS page (chứa nhiều block)
│   │   └── Block.php               # CMS block (hero, gallery, cta...)
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── HomeController.php
│   │   │   ├── BranchController.php
│   │   │   ├── ServiceController.php
│   │   │   ├── BookingController.php
│   │   │   ├── VoucherController.php
│   │   │   ├── PromotionController.php
│   │   │   ├── BlogController.php
│   │   │   └── Auth/...
│   │   ├── Requests/               # Form requests (validation)
│   │   ├── Resources/              # API resources (nếu cần JSON API)
│   │   └── Middleware/
│   │       ├── SetLocale.php       # đọc ?lang=vi|en
│   │       └── HandleInertiaRequests.php
│   ├── Filament/                   # Admin panel (Filament v3)
│   │   ├── Resources/
│   │   │   ├── BranchResource.php
│   │   │   ├── ServiceResource.php
│   │   │   ├── BookingResource.php
│   │   │   ├── VoucherResource.php
│   │   │   ├── PromotionResource.php
│   │   │   ├── BlogPostResource.php
│   │   │   ├── PageResource.php    # CRUD page + repeater block
│   │   │   └── UserResource.php
│   │   ├── Pages/
│   │   │   └── Dashboard.php
│   │   └── Widgets/
│   │       ├── BookingStats.php
│   │       └── RevenueChart.php
│   ├── Services/                   # Business logic
│   │   ├── BookingService.php
│   │   ├── VoucherService.php
│   │   ├── NotificationService.php # email + sms
│   │   └── SlotService.php
│   └── Mail/
│       ├── BookingConfirmation.php
│       └── BookingReminder.php
│
├── database/
│   ├── migrations/
│   ├── seeders/
│   │   ├── BranchSeeder.php        # seed 2 chi nhánh
│   │   ├── ServiceSeeder.php       # seed 5-10 dịch vụ
│   │   ├── SlotSeeder.php
│   │   └── PageSeeder.php          # seed home page + blocks
│   └── factories/
│
├── resources/
│   ├── js/                         # React + Inertia
│   │   ├── Pages/                  # Inertia pages (1 file = 1 route)
│   │   │   ├── Home.tsx
│   │   │   ├── AboutUs.tsx
│   │   │   ├── Services/
│   │   │   │   ├── Index.tsx
│   │   │   │   └── Show.tsx
│   │   │   ├── Booking.tsx
│   │   │   ├── Voucher.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── Promotions.tsx
│   │   │   ├── Blog/
│   │   │   │   ├── Index.tsx
│   │   │   │   └── Show.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   └── MyBookings.tsx
│   │   ├── Components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   ├── BookingForm.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── BranchCard.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── ChatWidget.tsx          # Zalo/WhatsApp floating
│   │   │   ├── PromoBanner.tsx
│   │   │   └── Blocks/                 # render CMS blocks
│   │   │       ├── HeroBlock.tsx
│   │   │       ├── ServiceListBlock.tsx
│   │   │       ├── GalleryBlock.tsx
│   │   │       ├── TestimonialBlock.tsx
│   │   │       ├── CtaBlock.tsx
│   │   │       └── BlockRenderer.tsx   # switch type → render block
│   │   ├── Layouts/
│   │   │   ├── PublicLayout.tsx
│   │   │   └── AuthLayout.tsx
│   │   ├── Hooks/
│   │   │   ├── useBooking.ts
│   │   │   ├── useAuth.ts
│   │   │   └── useLocale.ts
│   │   ├── i18n/
│   │   │   ├── index.ts
│   │   │   ├── vi.json
│   │   │   └── en.json
│   │   ├── Lib/
│   │   │   └── api.ts                  # axios instance (nếu cần)
│   │   └── app.tsx                     # Inertia entry
│   ├── views/
│   │   └── app.blade.php               # root template cho Inertia
│   └── lang/
│       ├── vi.json
│       └── en.json
│
├── routes/
│   ├── web.php                     # Inertia routes (public + auth)
│   ├── api.php                     # REST API (mobile/external)
│   └── auth.php
│
├── config/
├── public/
└── composer.json
```
---
## 🧩 CMS Block Schema (kiểu WordPress)
> Admin chỉnh sửa nội dung từng block trong dashboard Filament; FE render qua `BlockRenderer.tsx`.

**Page model** chứa nhiều **Block** (polymorphic hoặc JSON column):
```php
// Page: slug, title (translatable), is_published
// Block: page_id, type, order, data (JSON), is_active
```

**Các block type cố định:**
| Type | Mô tả | Fields |
|------|-------|--------|
| `hero` | Banner trang chủ | title, subtitle, image, cta_text, cta_link |
| `service_list` | Grid dịch vụ nổi bật | title, service_ids[], columns |
| `gallery` | Lightbox ảnh | title, images[] |
| `testimonial` | Reviews khách hàng | items[{name, avatar, content, rating}] |
| `cta` | Call-to-action | title, description, button_text, button_link |
| `text` | Rich text content | body (HTML) |
| `branches` | Hiển thị 2 chi nhánh | (auto fetch) |
| `promo_banner` | Banner khuyến mãi | image, link, expires_at |

→ Admin vào Filament → Pages → chọn page → thêm/sửa/xóa/sắp xếp block → publish.
---
## 🗂️ Tất cả Module (24 modules / 7 nhóm)
### ① Public Pages
| Module | Route | Mô tả |
|--------|-------|--------|
| **Home Page** | `/?lang=vi\|en` | Hero banner, giới thiệu thương hiệu, highlight dịch vụ, CTA booking — toàn bộ render từ CMS blocks |
| **About / Chi nhánh** | `/about-us/{branch:slug}` | Chi tiết từng chi nhánh — fetch từ DB |
**Known branches (slug):**
- `heritage` — Maha Heritage
- `signature` — Maha Signature
---
### ② Services
| Module | Route | Mô tả |
|--------|-------|--------|
| **Danh sách dịch vụ** | `/services` | Liệt kê tất cả, lọc theo category/chi nhánh |
| **Chi tiết dịch vụ** | `/services/{service:slug}` | Mô tả, nguyên liệu, giá, thời gian, nút booking |
**Danh mục dịch vụ:**
- Body Massage (Dầu thơm, Đá nóng, Thai massage)
- Facial / Gua Sha / Chăm sóc da mặt
- Head Spa / Gội đầu dưỡng sinh 21 bước
- Foot Spa / Massage chân
- Combo packages (Shampoo + Massage, v.v.)
---
### ③ Booking
| Module | Route | Mô tả |
|--------|-------|--------|
| **Đặt lịch online** | `/booking` | Chọn chi nhánh → dịch vụ → ngày/giờ → thông tin → xác nhận |
| **Gift Voucher** | `/voucher` | Mua voucher, nhập mã giảm giá, tích hợp Klook |
| **Thanh toán** | `/checkout` | Thẻ Visa/Master, tiền mặt, VNPay/MoMo |
**Booking flow (5 bước):**
1. Chọn chi nhánh
2. Chọn dịch vụ / combo
3. Chọn ngày & khung giờ (calendar)
4. Nhập thông tin khách (tên, SĐT, email, ghi chú)
5. Xác nhận → email/SMS confirmation (queue job)
---
### ④ Content
| Module | Route | Mô tả |
|--------|-------|--------|
| **Gallery** | `/gallery` | Lightbox ảnh không gian 2 chi nhánh |
| **Khuyến mãi** | `/promotions` | Ưu đãi theo mùa, Tết, Holiday |
| **Blog** | `/blog` | Bài viết wellness, press coverage |
| **Blog chi tiết** | `/blog/{post:slug}` | Bài viết đầy đủ, SEO meta per-article |
---
### ⑤ User
| Module | Route | Mô tả |
|--------|-------|--------|
| **Đăng ký / Đăng nhập** | `/login` · `/register` | Laravel Breeze + Sanctum, có thể OAuth Google/Facebook (Socialite) |
| **Lịch sử booking** | `/my-bookings` | Xem, hủy, đổi lịch; xem receipt |
---
### ⑥ Communication
| Module | Route | Mô tả |
|--------|-------|--------|
| **Contact** | `/contact` | Địa chỉ, hotline, Google Maps, form liên hệ |
| **Chat Widget** | Floating button | Zalo (VN), WhatsApp (khách quốc tế), Messenger |
| **Email/SMS Notification** | Queue jobs | Auto confirm booking, reminder, newsletter |
---
### ⑦ Analytics & Admin
| Module | Route | Mô tả |
|--------|-------|--------|
| **Google Tag Manager** | GTM-TTGB95P9 | GA4, conversion tracking, Facebook Pixel |
| **Admin Panel (Filament)** | `/admin` (private) | CRUD services, branches, bookings, vouchers, pages/blocks, staff |
| **REST API** | `/api/v1/...` | Sanctum auth (cho mobile/external) |
| **i18n** | `?lang=vi\|en` | spatie/laravel-translatable + react-i18next |
---
## 🔌 REST API Endpoints (Sanctum)
> Public site chủ yếu dùng Inertia (không cần REST). API dưới đây phục vụ mobile app / external integrations.
```
# Auth
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/verify-otp

# Branches
GET    /api/v1/branches
GET    /api/v1/branches/{id}

# Services
GET    /api/v1/services
GET    /api/v1/services/{id}
GET    /api/v1/services?branch={branchId}&category={cat}

# Bookings (auth required)
GET    /api/v1/bookings
GET    /api/v1/bookings/{id}
POST   /api/v1/bookings
PATCH  /api/v1/bookings/{id}/cancel
PATCH  /api/v1/bookings/{id}/reschedule

# Available Slots
GET    /api/v1/slots?branch={id}&date={date}&service={id}

# Vouchers
POST   /api/v1/vouchers/validate
POST   /api/v1/vouchers/purchase
GET    /api/v1/vouchers/{code}

# Promotions
GET    /api/v1/promotions
GET    /api/v1/promotions/{id}

# Blog
GET    /api/v1/blog
GET    /api/v1/blog/{slug}

# Pages (CMS — public)
GET    /api/v1/pages/{slug}        # trả về blocks[]
```
---
## 🗄️ Eloquent Models (MySQL)
> Field translatable lưu JSON `{"vi": "...", "en": "..."}` qua `spatie/laravel-translatable`.

### Branch
```php
// migrations: id, slug, name(JSON), address, phone, open_hours, lat, lng, is_active, timestamps
// images: spatie/laravel-medialibrary
protected $translatable = ['name'];
```
### Service
```php
// id, slug, name(JSON), description(JSON), category, duration, price,
// ingredients(JSON array), is_active, timestamps
// branches: belongsToMany (pivot: service_branch)
protected $translatable = ['name', 'description'];
// category enum: 'massage' | 'facial' | 'head-spa' | 'foot-spa' | 'combo'
```
### Booking
```php
// id, user_id (nullable), guest_name, guest_phone, guest_email, note,
// branch_id, service_id, date, time_slot, status, total_price,
// voucher_code, payment_method, therapist_id (nullable), timestamps
// status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
// payment_method: 'card' | 'cash' | 'vnpay' | 'momo'
```
### User
```php
// id, name, email, phone, password, role, preferred_lang, timestamps
// role: 'customer' | 'staff' | 'admin' (spatie/laravel-permission)
// preferred_lang: 'vi' | 'en'
```
### Voucher
```php
// id, code (unique), type, value, min_order_value, expires_at,
// used_at, used_by, source, is_active, timestamps
// type: 'fixed' | 'percent' | 'service'
// source: 'internal' | 'klook' | 'traveloka'
```
### Page (CMS)
```php
// id, slug (unique), title(JSON), is_published, seo_meta(JSON), timestamps
// hasMany blocks (ordered by `order`)
protected $translatable = ['title'];
```
### Block (CMS)
```php
// id, page_id, type, order, data(JSON), is_active, timestamps
// type: 'hero' | 'service_list' | 'gallery' | 'testimonial' | 'cta' | 'text' | 'branches' | 'promo_banner'
// data: nội dung block, có thể chứa field translatable
```
---
## 🌐 i18n Convention
- **URL param:** `?lang=vi` (default) hoặc `?lang=en`
- **Middleware:** `SetLocale.php` đọc query param → `App::setLocale()`
- **Backend translatable fields:** spatie/laravel-translatable lưu JSON
- **UI strings (FE labels):** lưu trong DB table `translation_strings`, admin sửa qua Filament. JSON tĩnh `resources/js/i18n/{vi,en}.json` chỉ là fallback khi API fail. FE tự fetch `/i18n/{lang}` và merge vào i18next.
- **Laravel translations (validation, mail):** `resources/lang/{vi,en}.json`

### 🤖 Auto-translate (100% văn bản đều tuỳ biến từ dashboard)
- **Provider:** chọn qua `TRANSLATE_PROVIDER` (`null` | `google` | `deepl` | `openai`)
- **`TranslationManager::translate()`** có cache 7 ngày → tránh gọi API trùng
- **Trên mọi Filament Resource có field translatable** (Branch, Service, Promotion, BlogPost, Page): mỗi cặp field VI/EN có nút "Dịch tự động từ VI →" qua helper `TranslatableField::group()`
- **UI strings:** Filament Translation Manager (`/admin/translation-strings`) → bulk action "Auto-translate EN còn trống"
- **CLI:**
  - `php artisan translate:scan` quét toàn bộ `.tsx`/`.ts` tìm `t('group.key')` chưa có trong DB → tự insert (kèm `--auto-translate` để dịch luôn VI→EN). Dev thêm chuỗi mới chỉ cần dùng `t('foo.bar')` → chạy scan → admin chỉnh trong dashboard.
  - `php artisan translate:missing --target=en` dịch hàng loạt mọi model + UI strings còn thiếu EN.
- **Convention:** mọi chuỗi hiển thị trên FE đều phải dùng `t('group.key')` thay vì hardcode. Admin sửa text bất kỳ tại `/admin/translation-strings` mà không cần deploy code.
- **Usage React:**
  ```tsx
  const { t } = useTranslation();
  <h1>{t('home.hero.title')}</h1>
  ```
- **Usage Laravel:**
  ```php
  $service->name; // tự trả vi hoặc en theo locale hiện tại
  $service->getTranslation('name', 'en');
  ```
**Key naming convention:** `[page].[section].[key]`
- `home.hero.title`
- `services.category.massage`
- `booking.steps.selectDate`
---
## 📱 Social Media & External Integrations
| Platform | Handle / ID |
|----------|-------------|
| Facebook | facebook.com/mahaSpa.danang |
| Instagram | @mahaspa.danang |
| Klook | Có listing — nhận voucher từ Klook |
| Google Maps | 2 chi nhánh có pin riêng |
| Google Tag Manager | GTM-TTGB95P9 |
| Zalo | Floating chat widget |
---
## ✅ Coding Conventions
- **PHP:** PSR-12, Laravel Pint format
- **TypeScript:** strict mode, ESLint + Prettier
- **API Response format (REST API):**
  ```json
  {
    "success": true,
    "data": { },
    "message": "OK",
    "meta": { "page": 1, "total": 50 }
  }
  ```
- **Error format:**
  ```json
  {
    "success": false,
    "error": "BOOKING_SLOT_UNAVAILABLE",
    "message": "Khung giờ này đã được đặt"
  }
  ```
- **Date format:** ISO 8601 — `2025-05-15T10:00:00+07:00`
- **Currency:** VND (số nguyên, không dùng float — cột `BIGINT`)
- **Env vars:** Dùng `.env` — không commit
- **Migration naming:** `YYYY_MM_DD_HHMMSS_create_xxx_table.php`
- **Commit message:** Conventional Commits (feat:, fix:, chore:, docs:...)
---
## 🚀 Getting Started (cho Claude Code)
Khi được yêu cầu scaffold project, ưu tiên thứ tự:
1. `composer create-project laravel/laravel .` + cài Laravel Breeze (Inertia + React + TypeScript preset)
2. Cài packages: `filament/filament`, `spatie/laravel-translatable`, `spatie/laravel-permission`, `spatie/laravel-medialibrary`
3. Tạo migrations + models (Branch, Service, Booking, User, Voucher, Slot, Promotion, BlogPost, Page, Block)
4. Seed data mẫu (2 branches, 5-10 services, 3 slots/ngày, 1 trang Home với các block)
5. Build Filament admin: Resources cho từng model, Page resource có repeater block
6. Tạo Inertia pages + components ở `resources/js/Pages/`
7. Implement `BlockRenderer.tsx` switch theo `block.type`
8. Thêm i18n (vi + en) cả backend & frontend, middleware `SetLocale`
9. Booking flow + queue job gửi email/SMS
10. Tích hợp GTM, chat widget, Google Maps cuối cùng
