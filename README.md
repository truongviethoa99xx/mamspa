# Maha Spa — mahaspa.vn

Website spa booking + CMS (kiểu WordPress) cho Maha Spa Đà Nẵng.

**Stack:** Laravel 11 · Inertia.js · React 18 + TypeScript · TailwindCSS · Filament v3 · MySQL · Redis

## Quick start

```bash
# Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve

# Frontend (mở tab mới)
npm install
npm run dev
```

- Public site: <http://localhost:8000>
- Admin Filament: <http://localhost:8000/admin> — `admin@mahaspa.vn` / `password`

## Cấu trúc chính

```
app/
├── Filament/            # Admin panel (Pages, Resources, Widgets)
├── Http/Controllers/    # Inertia controllers (Home, Booking, Service, ...)
├── Jobs/                # Queue jobs (SendBookingNotifications)
├── Mail/                # Mailables (BookingConfirmation, ContactMessage)
├── Models/              # Eloquent (Branch, Service, Booking, Page, Block, ...)
├── Services/            # Business logic (BookingService, SlotService, VNPayService)
└── Providers/
resources/
├── js/
│   ├── Components/
│   │   └── Blocks/      # CMS block renderers (Hero, ServiceList, Gallery, ...)
│   ├── Layouts/         # PublicLayout, AuthLayout
│   ├── Pages/           # Inertia pages (Home, Booking, Services, Blog, ...)
│   ├── Hooks/           # useLocale
│   └── i18n/            # vi.json, en.json
database/
├── migrations/          # 11 migrations (users, branches, services, bookings, pages, blocks, ...)
└── seeders/             # Seed data (2 branches, 8 services, 1 home page, voucher, promo, ...)
```

## Features

- **CMS kiểu WordPress:** admin chỉnh sửa block (hero, service_list, gallery, testimonial, cta, text, branches, promo_banner) trong Filament → FE render qua `BlockRenderer.tsx`
- **Đa ngôn ngữ:** `spatie/laravel-translatable` (DB JSON `{vi, en}`) + `react-i18next` (UI strings), switch qua `?lang=vi|en`
- **Booking 5 bước:** chi nhánh → dịch vụ → ngày/giờ → thông tin → xác nhận → email/SMS queue job
- **Thanh toán:** VNPay (HMAC-SHA512 signature) + Cash
- **User account:** Breeze auth, MyBookings (xem/huỷ/thanh toán)
- **Admin dashboard:** Filament widgets (booking stats, revenue chart 30 ngày, top services)
- **SEO:** sitemap.xml động, schema.org LocalBusiness, OG tags, GTM + GA4

## Tài liệu

- [`CLAUDE.md`](./CLAUDE.md) — spec kỹ thuật chi tiết
- [`SPRINTS.md`](./SPRINTS.md) — roadmap 6 sprint MVP
- [`docs/DEPLOY.md`](./docs/DEPLOY.md) — hướng dẫn deploy production

## Test & lint

```bash
./vendor/bin/pest            # PHP tests
./vendor/bin/pint            # PHP code style
npm run lint                 # ESLint
npm run build                # Production build
```

## License

Proprietary © Maha Spa.
