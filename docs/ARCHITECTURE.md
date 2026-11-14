# Kiến trúc hệ thống — Mầm Spa

Tài liệu này mô tả **kiến trúc thật đang chạy trong code**, không phải bản spec ban đầu. Nếu thấy mâu thuẫn với `CLAUDE.md` hoặc `SPRINTS.md`, tin tài liệu này và code trước.

## 1. Tổng quan stack

Laravel 11 (PHP 8.3+) làm backend, Inertia.js v1 làm cầu nối sang React 18 + TypeScript (Vite build), Filament v3 làm admin panel, MySQL là DB chính. Không dùng Redis ở production (cPanel dùng driver `database`/`file`); không dùng REST API công khai (xem mục 3); không dùng shadcn/ui (component Tailwind tự dựng + Headless UI + lucide-react).

## 2. Mô hình nội dung — không phải CMS "block" kiểu WordPress

Spec ban đầu (`CLAUDE.md`, `SPRINTS.md`) mô tả 1 model `Page` chứa nhiều `Block` (hero/service_list/gallery/cta/...) render qua `BlockRenderer.tsx`. **Kiến trúc này đã bị bỏ** trong quá trình làm thực tế. Thay vào đó:

- Mỗi trang công khai có **1 model nội dung riêng, dạng singleton** (1 dòng duy nhất trong bảng), ví dụ `HomePageContent`, `AboutPageContent`, `ServicePageContent`, `ContactPageContent`, `OfferPageContent`, `CustomerExperiencePageContent`, `BlogPageContent`, `MenuPageContent`.
- Mỗi model đó có **1 trang cài đặt tương ứng trong Filament** (`app/Filament/Pages/*Settings.php`) — admin sửa trực tiếp field của trang đó (hero, tiêu đề, ảnh...), không có khái niệm "thêm block".
- Field đa ngôn ngữ là **cột JSON cast `array` dạng `{"vi": "...", "en": "..."}`**, sửa qua helper dùng chung `App\Filament\Forms\TranslatableField::group()` (sinh cặp ô nhập VI/EN + nút dịch tự động). **Không dùng** trait `HasTranslations` của `spatie/laravel-translatable` dù package này có trong `composer.json` — kiểm tra lại field cast trước khi viết thêm code giả định ngược lại.
- Ngoại lệ có danh sách con riêng (không phải singleton): `ServiceResource`/`ServiceCategoryResource` (dịch vụ), `BlogPostResource` (bài viết), `CustomPageResource` (trang tuỳ biến tự do, admin tạo bao nhiêu tuỳ ý), `PolicyPageResource` (trang chính sách), `MenuBranchPageResource` (mỗi chi nhánh 1 trang menu PDF riêng, xem mục 4).

Không có model `Branch`/bảng `branches` nữa — migration `2026_07_18_130000_remove_branches_and_google_reviews.php` đã xoá bảng này. **2 chi nhánh vật lý hiện là 1 mảng JSON `branches` nằm trong `SiteSetting` (singleton)**, sửa ở trang "Thiết lập chung".

## 3. Routes (`routes/web.php`)

- Trang tĩnh: `/`, `/gioi-thieu`, `/dich-vu` (+ cây danh mục tối đa 3 cấp `/dich-vu/{a}/{b?}/{c?}`), `/uu-dai`, `/dat-lich` (+ success/voucher), `/tin-tuc` (+ chi tiết), `/gallery`, `/trai-nghiem-khach-hang`, `/lien-he`, 4 trang chính sách ở root (`/chinh-sach-bao-mat`, `/dieu-khoan-dich-vu`, `/ho-tro-khach-hang`, `/luu-y-dich-vu`).
- Redirect 301 giữ SEO cho URL cũ: `/services`, `/bang-gia`, `/booking`, `/blog`, `/contact`, `/huong-dan-thanh-toan`.
- **Route catch-all `/{slug}`** nằm **cuối cùng** trong file — thử lần lượt `MenuPageContent` → `MenuBranchPage` → `CustomPageController::show()`. **Bất kỳ route nào thêm sau route catch-all này sẽ không bao giờ được gọi tới** — có comment giải thích ngay trong file kèm 1 bug thật đã gặp (curried closure + `route:cache`). Luôn thêm route mới **trước** dòng catch-all.
- `routes/auth.php`: Breeze login/register (đăng ký bật/tắt qua `AUTH_REGISTRATION_ENABLED`), Google OAuth, logout, `my-bookings` (khách vãng lai xem lại booking qua cookie — `App\Support\GuestBookings`), khởi tạo/callback thanh toán VNPay.
- `routes/api.php`: **chỉ có `/user` (Sanctum) đang hoạt động**. Nhóm `v1` (bookings/branches/services/vouchers/blog/pages) mô tả trong `CLAUDE.md` là **placeholder rỗng, chưa triển khai** — đừng dựa vào REST API này cho mobile/third-party tới khi thực sự code nó.

## 4. Menu PDF theo chi nhánh

`MenuController` + model `MenuBranchPage`: mỗi chi nhánh là 1 record (`slug`, `image`, `name`, `street`, `desc`, 5 cột `pdf_vi/en/zh/ko/ja`). Trang `/menu/` liệt kê chi nhánh kèm nút tải PDF trực tiếp theo ngôn ngữ (`resources/js/Components/Menu/MenuBranches.tsx` + `resources/js/Lib/menuPdf.ts`); mỗi chi nhánh còn có trang riêng `/menu/{slug}/` (`MenuBranch.tsx`) để chia sẻ link/QR riêng. Quản lý trong Filament ở "Chi nhánh menu PDF" (`MenuBranchPageResource`).

## 5. SSR cho bot

`App\Support\Ssr\ProcessGateway` thay thế `HttpGateway` mặc định của Inertia. Chỉ bật SSR khi User-Agent khớp pattern bot thật (Googlebot, Facebook, WhatsApp, Telegram...) — **cố tình loại trừ** Lighthouse/PageSpeed để điểm hiệu năng phản ánh đúng trải nghiệm người dùng thật (luôn CSR). Mỗi request bot spawn **1 tiến trình `node` riêng** qua `proc_open` (không chạy daemon thường trực — do giới hạn cPanel shared hosting), timeout 5s, cờ `--no-experimental-fetch` (né một lỗi OOM của undici/WASM trên host này). Nếu Node lỗi, bật cờ cache 300 giây để tạm ngưng thử SSR (circuit breaker), **luôn fallback về CSR**, không bao giờ làm hỏng response.

Kiểm tra thủ công sau mỗi lần deploy (chưa có test tự động cho `isCrawlerRequest()`):

```bash
# Bot — phải trả HTML render sẵn, dung lượng lớn
curl -s -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://mamspa.vn/ | wc -c

# Trình duyệt thường — chỉ trả shell rỗng (client-render)
curl -s -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" https://mamspa.vn/ | wc -c
```

Biến môi trường bắt buộc trên cPanel: `INERTIA_SSR_NODE_BINARY` (đường dẫn tuyệt đối tới `node`, vì PATH của PHP-FPM thường không có).

## 6. Đa ngôn ngữ (i18n)

Hai lớp tách biệt:

1. **Nội dung trang / dữ liệu (DB)** — field JSON `{vi, en}` như mục 2, dịch tự động qua `App\Services\Translation\TranslationManager` (cache 7 ngày), chọn provider bằng `TRANSLATE_PROVIDER` (`google` | `deepl` | `openai` | `gemini`).
2. **Chuỗi giao diện tĩnh (UI labels)** — bảng `TranslationString` + `react-i18next`, serve qua `/i18n/{lang}`. Dev thêm chuỗi mới bằng `t('group.key')` trong code, sau đó chạy:
   - `php artisan translate:scan` — quét `.tsx`/`.ts` tìm `t('group.key')` chưa có trong DB, tự thêm (thêm `--auto-translate` để dịch VI→EN luôn).
   - `php artisan translate:missing --target=en` — dịch hàng loạt mọi chuỗi còn thiếu ngôn ngữ đích.
   Admin có thể tự sửa bất kỳ chuỗi nào ở Filament → "Chuỗi giao diện" mà không cần deploy code.

## 7. Tối ưu ảnh

`App\Support\HomeImageOptimizer` lắng nghe event `saved()` trên các model có field ảnh dạng string path (`HomePageContent`, `ServiceCategory`, `CustomPage`, `SiteSetting`...) — tự sinh bản `.webp` resize, dùng `Spatie\Image` với `Constraint::DoNotUpsize` (không phóng to ảnh gốc nhỏ hơn kích thước đích). Chạy lại thủ công toàn bộ bằng:

```bash
php artisan images:optimize-home --force
```

(hữu ích khi đổi kích thước đích trong code và cần sinh lại ảnh cũ).

## 8. Phân quyền & công tắc admin

- Role: `superadmin`, `admin`, `editor`, `staff`, `receptionist`, `customer` (`app/Models/User.php`). Nhóm vai trò dùng để gate từng Resource/Page:
  - `superAdminRoles()` = `[superadmin]`
  - `adminRoles()` = `[superadmin, admin, staff]`
  - `frontDeskRoles()` = `adminRoles() + [receptionist]`
  - `contentRoles()` = `[superadmin, admin, editor]`
  - `internalRoles()` = tất cả trừ `customer`
- Editor có thể bị giới hạn chỉ sửa một tập trang nhất định qua cột JSON `editable_pages` + enum `App\Filament\Support\EditablePage` (null = không giới hạn, để tương thích ngược).
- `App\Http\Middleware\EnsureAdminEnabled` + `config('app.admin_enabled')` (env `IS_ACTIVE_ADMIN`, mặc định bật) — tắt biến này sẽ 404 toàn bộ `/admin` kể cả `/admin/login`, dùng làm "kill switch" khẩn cấp.
- Chi tiết từng mục sidebar → xem [ADMIN_RESOURCES.md](ADMIN_RESOURCES.md).

## 9. Realtime

`laravel/reverb` **đang thực sự được dùng** (không phải dependency thừa) — job `SendBookingNotifications` và `NotifyAdminsOfContactSubmission` bắn thông báo realtime cho admin khi có booking/liên hệ mới. Cần cấu hình `REVERB_*` + `VITE_REVERB_*` đúng thì tính năng này mới chạy trên production.

## 10. Test

Pest, tại `tests/Feature/`: `BookingFlowTest`, `SecurityHardeningTest`, `PublicRouteSmokeTest`, `NewsletterTest`, `FilamentAccessTest`, `TranslatableFieldTest`, `BookingAdminNotificationTest`, `GuestBookingCookieTest`, `BlogPostResourceTest`, `ContactAdminNotificationTest`, `HealthTest`, `PolicyPageResourceTest`. Chạy bằng `./vendor/bin/pest`.

**Chưa có**: test tự động cho SSR/`isCrawlerRequest()` (chỉ kiểm tra thủ công bằng `curl`, xem mục 5), test suite JS/E2E (không có Playwright/Vitest, không có script `test` trong `package.json`).

## 11. Thư mục/tài sản không commit

`service-menu-web/` — mockup thiết kế tĩnh gốc (HTML/CSS/ảnh) dùng làm tham chiếu khi dựng tính năng Menu PDF. Chỉ là tài liệu thiết kế tham khảo local, cố tình không commit, có thể giữ lại hoặc xoá tuỳ ý mà không ảnh hưởng ứng dụng.
