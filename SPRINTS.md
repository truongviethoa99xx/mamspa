# SPRINTS.md — Maha Spa Roadmap

> Kế hoạch phát triển Maha Spa website theo 6 sprint (mỗi sprint ~1 tuần, ~6 tuần MVP).
> Stack: **Laravel 11 + Inertia + React + TypeScript + Filament v3 + MySQL**.
> Xem chi tiết stack & convention tại [`CLAUDE.md`](./CLAUDE.md).

---

## Sprint 0 — Setup & Scaffolding (3 ngày)

**Mục tiêu:** Có project chạy được + admin panel rỗng.

- [ ] `composer create-project laravel/laravel .`
- [ ] Cài Laravel Breeze (Inertia + React + TypeScript preset)
- [ ] Cài Filament v3: `composer require filament/filament`
- [ ] Cài spatie packages: `laravel-translatable`, `laravel-permission`, `laravel-medialibrary`
- [ ] Config `.env`: MySQL, Redis, mail
- [ ] Vite + TailwindCSS + shadcn/ui
- [ ] CI/CD cơ bản: GitHub Actions (lint PHP + ESLint + test)
- [ ] Tạo user admin đầu tiên

**Deliverable:** project chạy được `php artisan serve`, login `/admin` Filament thành công.

---

## Sprint 1 — Database & Admin Foundation (1 tuần)

**Mục tiêu:** Admin có thể CRUD toàn bộ entity chính.

- [ ] Migrations + models:
  - [ ] `branches`, `services`, `service_branch` (pivot)
  - [ ] `users` (mở rộng), `vouchers`, `promotions`, `blog_posts`, `slots`
  - [ ] `pages`, `blocks` (CMS)
- [ ] Cấu hình `spatie/laravel-translatable` cho field name, description, title
- [ ] Seeders:
  - [ ] 2 chi nhánh (Heritage, Signature)
  - [ ] 8 services (massage, facial, head spa, foot spa, combo)
  - [ ] 1 home page với các block mẫu (hero, service_list, gallery, cta)
- [ ] Filament Resources:
  - [ ] BranchResource, ServiceResource, UserResource
  - [ ] VoucherResource, PromotionResource, BlogPostResource
  - [ ] PageResource (có repeater block với BlockType enum)
- [ ] Middleware `SetLocale` đọc `?lang=vi|en`
- [ ] Spatie permission: roles `admin`, `staff`, `customer`

**Deliverable:** admin tạo/sửa dịch vụ, chi nhánh, page blocks được; dữ liệu seed sẵn.

---

## Sprint 2 — Public Site & CMS Render (1 tuần)

**Mục tiêu:** Trang chủ + danh sách dịch vụ chạy 2 ngôn ngữ, admin sửa block thấy đổi ngay.

- [ ] Layout: `PublicLayout.tsx` (Navbar, Footer, LanguageSwitcher)
- [ ] Pages:
  - [ ] `Home.tsx` (render blocks từ Page slug=home)
  - [ ] `AboutUs.tsx`
  - [ ] `Services/Index.tsx` (filter category/branch)
  - [ ] `Services/Show.tsx`
- [ ] Block components + `BlockRenderer.tsx`:
  - [ ] HeroBlock, ServiceListBlock, GalleryBlock
  - [ ] CtaBlock, TextBlock, BranchesBlock
- [ ] i18n frontend: `react-i18next` + `vi.json` / `en.json`
- [ ] Inertia shared props (locale, auth user, flash)
- [ ] Responsive mobile-first

**Deliverable:** Home + Services chạy 2 ngôn ngữ; admin sửa hero title → FE reload thấy đổi.

---

## Sprint 3 — Booking Flow (1 tuần) ⭐ Core nghiệp vụ

**Mục tiêu:** Đặt lịch end-to-end, nhận email/SMS confirmation.

- [ ] Migration `bookings` + model
- [ ] `BookingService.php` (business logic)
- [ ] `SlotService.php` — tính khung giờ trống theo branch + date + service duration
- [ ] API endpoint `GET /slots?branch=&date=&service=`
- [ ] UI 5-step booking:
  1. Chọn chi nhánh
  2. Chọn dịch vụ/combo
  3. Calendar + time slots
  4. Form thông tin khách (name, phone, email, note)
  5. Confirm + summary
- [ ] Voucher validate + apply discount
- [ ] Queue job: `SendBookingConfirmation` (Mail + SMS)
- [ ] Cấu hình mail driver (Mailgun/SendGrid)
- [ ] SMS provider integration (Twilio hoặc Viettel)
- [ ] Filament: BookingResource (view + update status)

**Deliverable:** khách đặt lịch hoàn chỉnh, nhận email + SMS xác nhận; admin thấy booking mới.

---

## Sprint 4 — Content & Marketing (1 tuần)

**Mục tiêu:** Đầy đủ content pages phục vụ SEO + marketing.

- [ ] Blog:
  - [ ] `Blog/Index.tsx` (list, pagination)
  - [ ] `Blog/Show.tsx` (rich content, SEO meta translatable)
- [ ] Gallery (lightbox: yet-another-react-lightbox)
- [ ] Promotions page (list active promotions)
- [ ] Contact page:
  - [ ] Form liên hệ → gửi mail admin
  - [ ] Embed Google Maps 2 chi nhánh
- [ ] ChatWidget floating: Zalo + WhatsApp + Messenger
- [ ] PromoBanner component (top banner cho khuyến mãi đang chạy)

**Deliverable:** website đầy đủ nội dung phục vụ marketing.

---

## Sprint 5 — User Account & Payment (1 tuần)

**Mục tiêu:** User tự quản lý booking + thanh toán online.

- [ ] Auth UI (Breeze stock):
  - [ ] Login, Register, Forgot password
  - [ ] Email verification (optional)
- [ ] `MyBookings.tsx`:
  - [ ] List bookings của user hiện tại
  - [ ] Cancel booking (policy: trước 24h)
  - [ ] Reschedule booking
  - [ ] View receipt / invoice
- [ ] Payment integration (chọn 1 gateway trước):
  - [ ] VNPay hoặc MoMo (web flow)
  - [ ] Webhook callback verify signature
  - [ ] Update booking status `paid`
- [ ] Filament Dashboard widgets:
  - [ ] BookingStats (today, this week, this month)
  - [ ] RevenueChart (line chart 30 ngày)

**Deliverable:** user đăng nhập, xem/sửa booking, thanh toán online.

---

## Sprint 6 — Polish & Launch (1 tuần)

**Mục tiêu:** Website live tại mahaspa.vn.

- [ ] Analytics:
  - [ ] GTM container `GTM-TTGB95P9`
  - [ ] GA4 events: view_service, begin_checkout, purchase
  - [ ] Facebook Pixel
- [ ] SEO:
  - [ ] Sitemap.xml (dynamic)
  - [ ] robots.txt
  - [ ] OG tags + Twitter cards (per page)
  - [ ] Structured data (LocalBusiness, Service schema.org)
- [ ] Performance:
  - [ ] Image optimization (WebP, lazy load)
  - [ ] Route caching, view caching, opcache
  - [ ] Lighthouse score > 90
- [ ] Admin reports:
  - [ ] Revenue by branch/service
  - [ ] Booking conversion funnel
  - [ ] Export CSV
- [ ] Deploy production:
  - [ ] VPS Ubuntu 22.04 + Nginx + PHP 8.3-FPM + MySQL 8 + Redis
  - [ ] Laravel Forge hoặc Ploi
  - [ ] SSL (Let's Encrypt)
  - [ ] Domain mahaspa.vn trỏ về
  - [ ] Backup tự động (DB + media)

**Deliverable:** website live, mahaspa.vn truy cập được, đủ analytics, đủ SEO.

---

## Sau MVP (Backlog / Phase 2)

- Gift voucher purchase + Klook/Traveloka sync
- Mobile app (React Native dùng REST API có sẵn)
- Therapist scheduling (gán nhân viên cụ thể cho từng booking)
- Loyalty points / membership tier
- Email newsletter (Mailchimp integration)
- Multi-payment: thêm Visa/Master, cash on arrival
- Admin advanced reports + export Excel
- A/B testing landing pages
- PWA / offline support

---

## Tiến độ

| Sprint | Trạng thái | Bắt đầu | Kết thúc |
|--------|-----------|---------|----------|
| 0 — Setup | ✅ Hoàn thành | 2026-05-15 | 2026-05-15 |
| 1 — DB & Admin | ✅ Hoàn thành | 2026-05-15 | 2026-05-15 |
| 2 — Public site | ✅ Hoàn thành | 2026-05-15 | 2026-05-15 |
| 3 — Booking | ✅ Hoàn thành | 2026-05-15 | 2026-05-15 |
| 4 — Content | ✅ Hoàn thành | 2026-05-15 | 2026-05-15 |
| 5 — User & Payment | ✅ Hoàn thành | 2026-05-15 | 2026-05-15 |
| 6 — Launch | ✅ Hoàn thành | 2026-05-15 | 2026-05-15 |
