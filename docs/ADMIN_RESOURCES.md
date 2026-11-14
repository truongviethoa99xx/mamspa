# Bản đồ Admin (`/admin`) — tham chiếu kỹ thuật

Danh sách đầy đủ mọi mục trong sidebar Filament, đúng theo code hiện tại (không phải spec). Dùng file này làm nguồn cho tài liệu hướng dẫn sử dụng gửi khách, và để tra nhanh khi cần sửa 1 mục cụ thể.

Vai trò viết tắt: SA = superadmin, A = admin, E = editor, S = staff, R = receptionist. Xem định nghĩa nhóm vai trò ở `app/Models/User.php:116-142`.

## Nhóm "Hệ thống"

| Sidebar | Class | File | Vai trò xem được | Mô tả |
|---|---|---|---|---|
| Thiết lập chung | `SiteSettings` | `app/Filament/Pages/SiteSettings.php` | SA, A, S | Tên thương hiệu, hotline, email, mạng xã hội, nút liên hệ nổi (Zalo/WhatsApp/...), menu dịch vụ ở header, **2 chi nhánh (mảng JSON — không còn là bảng riêng)**, bật/tắt ngôn ngữ. |
| Nhân sự & phân quyền | `UserResource` | `app/Filament/Resources/UserResource.php` | SA | Tạo/sửa tài khoản nhân viên, gán role, giới hạn `editable_pages` cho editor. |

## Nhóm "Nội dung" (mỗi mục = 1 trang công khai hoặc dữ liệu đi kèm)

| Sidebar | Class | File | Vai trò xem được | Mô tả |
|---|---|---|---|---|
| Quản lý header | `HeaderSettings` | `app/Filament/Pages/HeaderSettings.php` | SA, A, E | Logo, màu nền/chữ header, chế độ trong suốt, nút CTA. |
| Trang chủ | `HomePageSettings` | `app/Filament/Pages/HomePageSettings.php` | SA, A, E | Nội dung trang `/` — hero, các khối giới thiệu. |
| Trang Giới thiệu | `AboutPageSettings` | `app/Filament/Pages/AboutPageSettings.php` | SA, A, E | Nội dung trang `/gioi-thieu`. |
| Trang Dịch vụ | `ServicePageSettings` | `app/Filament/Pages/ServicePageSettings.php` | SA, A, E | Nội dung khung trang `/dich-vu` (không phải từng dịch vụ — xem "Dịch vụ" bên dưới). |
| Danh mục dịch vụ | `ServiceCategoryResource` | `app/Filament/Resources/ServiceCategoryResource.php` | SA, A, E | Cây danh mục dịch vụ tối đa 3 cấp, ứng với URL `/dich-vu/{a}/{b}/{c}`. |
| Dịch vụ | `ServiceResource` | `app/Filament/Resources/ServiceResource.php` | SA, A, E | Từng dịch vụ cụ thể: tên, mô tả, giá, thời lượng, ảnh, thuộc danh mục nào. |
| Trang Ưu đãi | `OfferPageSettings` | `app/Filament/Pages/OfferPageSettings.php` | SA, A, E | Nội dung trang `/uu-dai`. |
| Trang Blog | `BlogPageSettings` | `app/Filament/Pages/BlogPageSettings.php` | SA, A, E | Nội dung khung trang `/tin-tuc` (không phải từng bài — xem "Bài viết"). |
| Bài viết | `BlogPostResource` | `app/Filament/Resources/BlogPostResource.php` | SA, A, E | CRUD từng bài blog. |
| Trang Menu | `MenuPageSettings` | `app/Filament/Pages/MenuPageSettings.php` | SA, A, E | Khung trang `/menu/` (hero, giới thiệu, bật/tắt khối chi nhánh, dải liên hệ cuối trang). |
| Chi nhánh menu PDF | `MenuBranchPageResource` | `app/Filament/Resources/MenuBranchPageResource.php` | SA, A, E | Mỗi chi nhánh 1 record: ảnh, tên, địa chỉ, mô tả, 5 file PDF menu theo ngôn ngữ (vi/en/zh/ko/ja). Quyết định nội dung thẻ chi nhánh ở `/menu/` và trang riêng `/menu/{slug}/`. |
| Trang Customer Experience | `CustomerExperiencePageSettings` | `app/Filament/Pages/CustomerExperiencePageSettings.php` | SA, A, E | Nội dung trang `/trai-nghiem-khach-hang`. |
| Trang Liên hệ | `ContactPageSettings` | `app/Filament/Pages/ContactPageSettings.php` | SA, A, E | Nội dung trang `/lien-he` (bản đồ, thông tin liên hệ hiển thị). |
| Trang chính sách | `PolicyPageResource` | `app/Filament/Resources/PolicyPageResource.php` | SA, A, E | 4 trang chính sách ở root: bảo mật, điều khoản dịch vụ, hỗ trợ khách hàng, lưu ý dịch vụ. |
| Trang tuỳ biến | `CustomPageResource` | `app/Filament/Resources/CustomPageResource.php` | SA, A, E | Tạo trang mới tự do theo slug (không giới hạn số lượng), dùng khi cần 1 trang nội dung đơn giản mà không muốn sửa code. |
| Chuỗi giao diện | `TranslationStringResource` | `app/Filament/Resources/TranslationStringResource.php` | SA, A, E | Sửa trực tiếp mọi label/nút/chuỗi tĩnh hiển thị trên site theo từng ngôn ngữ, không cần deploy code. |
| Thư viện | `MediaLibrary` | `app/Filament/Pages/MediaLibrary.php` | SA, A, E | Thư viện ảnh/video dùng chung giữa các trang. |

## Nhóm "Vận hành"

| Sidebar | Class | File | Vai trò xem được | Mô tả |
|---|---|---|---|---|
| Lịch hẹn | `BookingResource` | `app/Filament/Resources/BookingResource.php` | SA, A, S, R | Danh sách booking khách đặt, trạng thái, chi tiết dịch vụ/giờ/chi nhánh. Có thông báo realtime khi có booking mới (Reverb). |
| Lời nhắn liên hệ | `ContactSubmissionResource` | `app/Filament/Resources/ContactSubmissionResource.php` | SA, A, S, R | Form liên hệ khách gửi từ `/lien-he`. Có thông báo realtime. |
| Đăng ký nhận tin | `NewsletterSubscriberResource` | `app/Filament/Resources/NewsletterSubscriberResource.php` | SA, A, S, R | Danh sách email đăng ký nhận tin từ footer. |

## Nhóm "Bán hàng"

| Sidebar | Class | File | Vai trò xem được | Mô tả |
|---|---|---|---|---|
| Voucher | `VoucherResource` | `app/Filament/Resources/VoucherResource.php` | SA, A, S | Mã giảm giá/voucher. |

## Nhóm "Khách hàng"

| Sidebar | Class | File | Vai trò xem được | Mô tả |
|---|---|---|---|---|
| Khách hàng | `CustomerResource` | `app/Filament/Resources/CustomerResource.php` | SA, A, S | Danh sách khách hàng đã từng booking/liên hệ. |

## Khác (không nằm trong sidebar nhóm thường)

| Trang | Class | File | Ghi chú |
|---|---|---|---|
| Dashboard | `Dashboard` | `app/Filament/Pages/Dashboard.php` | Trang mặc định sau khi login, widget tổng quan. Vai trò xem: tất cả trừ `customer`. |

## Công tắc khẩn cấp

`IS_ACTIVE_ADMIN=false` trong `.env` sẽ 404 toàn bộ `/admin` (kể cả trang đăng nhập) ngay lập tức, không cần deploy lại code — dùng khi cần khoá khẩn cấp quyền truy cập dashboard. Xem `app/Http/Middleware/EnsureAdminEnabled.php`.
