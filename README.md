# Mầm Spa — mamspa.vn

Website spa booking + CMS cho Mầm Spa, Hồ Chí Minh (2 chi nhánh: Lê Văn Sỹ / Phú Nhuận và Lê Thị Riêng / Bến Thành).

**Stack thực tế:** Laravel 11 · Inertia.js v1 · React 18 + TypeScript · Vite · TailwindCSS (component tự dựng + Headless UI, **không dùng shadcn/ui**) · Filament v3 · MySQL · `laravel/reverb` (realtime) · Pest (test)

> Dự án **không** dùng kiến trúc "CMS block kiểu WordPress" (hero/gallery/cta/...) như bản spec ban đầu trong `CLAUDE.md`. Mỗi trang công khai (Trang chủ, Giới thiệu, Dịch vụ, Ưu đãi, Blog, Menu, Liên hệ, Customer Experience...) có **1 model nội dung riêng** (`HomePageContent`, `AboutPageContent`, ...) và 1 trang cài đặt riêng trong Filament. Xem [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Quick start (local)

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

- Site công khai: <http://localhost:8000>
- Admin Filament: <http://localhost:8000/admin> — tài khoản seed sẵn: `admin@mamspa.vn` / `password` (role `admin`). **Đổi mật khẩu/email này trước khi đưa vào production** — xem `database/seeders/AdminUserSeeder.php` và mục cảnh báo bảo mật trong [docs/HANDOVER.md](docs/HANDOVER.md).
- SSR (render cho bot) chỉ chạy khi có `INERTIA_SSR_NODE_BINARY` trỏ đúng tới node trên máy — xem [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#ssr-cho-bot).

## Cấu trúc chính

```
app/
├── Filament/
│   ├── Pages/           # 1 trang cài đặt / 1 trang công khai (HomePageSettings, MenuPageSettings, SiteSettings, HeaderSettings, MediaLibrary, Dashboard...)
│   └── Resources/       # CRUD danh sách (ServiceResource, BookingResource, VoucherResource, MenuBranchPageResource, UserResource, ...)
├── Http/Controllers/    # Controller Inertia theo trang (HomeController, MenuController, BookingController, ...)
├── Support/
│   ├── Ssr/ProcessGateway.php     # SSR bot-only, spawn node riêng mỗi request
│   ├── HomeImageOptimizer.php     # tự sinh ảnh .webp khi lưu model có ảnh
│   └── GuestBookings.php          # cho khách vãng lai xem lại booking qua cookie
├── Services/Translation/TranslationManager.php  # auto-translate (Google/DeepL/OpenAI/Gemini)
├── Models/              # User, SiteSetting, Service, ServiceCategory, Booking, Voucher, Customer,
│                         # BlogPost, CustomPage, PolicyPage, MenuPageContent, MenuBranchPage,
│                         # *PageContent (1 model/trang công khai), TranslationString
└── Console/Commands/    # translate:scan, translate:missing, images:optimize-home
resources/js/
├── Components/          # Component UI tự dựng theo khối (Header, Footer, Menu/, Services/, ...)
├── Layouts/             # PublicLayout, AuthLayout
├── Pages/               # 1 file = 1 route Inertia (Home.tsx, Menu.tsx, MenuBranch.tsx, Booking.tsx, ...)
├── Hooks/               # useLocale, useReveal
└── Lib/                 # utils.ts, menuPdf.ts, ...
database/migrations/     # 118 migration (2025_01 → 2026_11), schema đã qua nhiều vòng chỉnh sửa thực tế
tests/Feature/           # Pest — booking flow, phân quyền Filament, SSR-adjacent, notification, ...
service-menu-web/        # Mockup thiết kế gốc tĩnh (HTML/CSS) — KHÔNG commit, chỉ tham khảo local
```

## Tính năng chính đã triển khai

- **Đặt lịch (booking)** — chọn chi nhánh/dịch vụ/ngày giờ, xác nhận, thông báo realtime cho admin qua Reverb, email/SMS.
- **Menu dịch vụ dạng PDF theo chi nhánh** — mỗi chi nhánh có trang riêng `/menu/{slug}/` + nút tải PDF theo 5 ngôn ngữ (vi/en/zh/ko/ja), quản lý ở Filament → "Chi nhánh menu PDF".
- **Trang tuỳ biến (Custom Page) & Trang chính sách** — admin tự tạo trang mới qua slug, không cần deploy code.
- **Đa ngôn ngữ hai lớp**: nội dung (field JSON `{vi, en}` tự dựng — không dùng `HasTranslations` của spatie dù package có cài) + chuỗi giao diện (`TranslationString` + `react-i18next`, auto-translate qua `php artisan translate:scan` / `translate:missing`).
- **SSR chỉ dành cho bot** — Googlebot/Facebook/... nhận HTML render sẵn để SEO, người dùng thật luôn nhận CSR (tốc độ, PageSpeed không bị ảnh hưởng). Có circuit breaker tự tắt SSR 5 phút nếu Node lỗi.
- **Phân quyền CMS theo role**: `superadmin`, `admin`, `editor`, `staff`, `receptionist`, `customer` — editor có thể bị giới hạn chỉ sửa một số trang nhất định. Có công tắc `IS_ACTIVE_ADMIN` để tắt hẳn `/admin` khi cần.
- **Tối ưu ảnh tự động**: lưu ảnh ở các trang nội dung chính sẽ tự sinh bản `.webp` resize, không phóng to ảnh gốc nhỏ hơn kích thước đích.
- **SEO**: sitemap động, meta description theo trang, GTM + GA4.

Chi tiết từng mục trong `/admin` → xem [docs/ADMIN_RESOURCES.md](docs/ADMIN_RESOURCES.md).

## Tài liệu

| File | Nội dung |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Kiến trúc hệ thống thực tế: routes, models, SSR, i18n, ảnh, test |
| [docs/ADMIN_RESOURCES.md](docs/ADMIN_RESOURCES.md) | Bản đồ đầy đủ sidebar `/admin` → class → vai trò được phép → mô tả |
| [docs/HANDOVER.md](docs/HANDOVER.md) | Checklist bàn giao: biến môi trường, tài khoản/khoá cần chuyển giao, nợ kỹ thuật, khuyến nghị |
| [DEPLOY-CPANEL.md](DEPLOY-CPANEL.md) | Quy trình deploy thực tế lên Tino cPanel (đã kiểm chứng, dùng cái này) |
| `CLAUDE.md` | Spec kỹ thuật ban đầu đọc tự động bởi Claude Code — **một số mục đã lỗi thời**, xem cảnh báo trong `docs/HANDOVER.md` |
| `SPRINTS.md` | Kế hoạch 6 sprint ban đầu — chỉ còn giá trị lịch sử, kiến trúc blocks mô tả trong đó đã bị thay thế |

> ⚠️ `docs/DEPLOY.md` (file cũ) mô tả hạ tầng Ubuntu/Nginx/Redis **chưa từng được dùng thật** — đã đánh dấu superseded, dùng `DEPLOY-CPANEL.md`.

## Test & lint

```bash
./vendor/bin/pest            # PHP tests (tests/Feature — booking, phân quyền, notification, ...)
./vendor/bin/pint             # PHP code style
npm run lint                  # ESLint (resources/js)
npm run build                 # Build production (client)
npm run build:ssr              # Build production + bundle SSR (bootstrap/ssr/ssr.js)
```

Không có test suite JS/E2E (chưa cấu hình Playwright/Vitest) — kiểm thử frontend hiện tại làm thủ công (xem `docs/HANDOVER.md`).

## License

Proprietary © Mầm Spa.
