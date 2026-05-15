# CLAUDE.md — Maha Spa Website Project Spec
> File này được đọc tự động bởi Claude Code mỗi khi khởi động trong thư mục project.
> Chứa toàn bộ spec kỹ thuật, module list, API routes và convention của dự án.
---
## 📌 Tổng quan dự án
- **Tên:** Maha Spa — mahaspa.vn
- **Loại:** Website spa booking (Single Page Application)
- **Thành lập:** 2018 · Đà Nẵng, Việt Nam
- **Chi nhánh:**
  - Maha Heritage — 26 Nguyễn Văn Thoại · (+84) 934 743 026
  - Maha Signature — 185 Hồ Nghinh · (+84) 978 456 185
- **Tagline:** "The Beginning of the Journey to Balance Body - Mind - Spirit"
- **Ngôn ngữ:** Tiếng Việt (default) + English (`?lang=en`)
---
## 🛠️ Tech Stack
### Frontend
- **Framework:** React (hoặc Vue.js) — SPA, client-side routing
- **Routing:** React Router v6 (hoặc Vue Router)
- **i18n:** i18next (React) hoặc vue-i18n — query param `?lang=vi|en`
- **Styling:** TailwindCSS hoặc CSS Modules
- **HTTP Client:** Axios
### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (JSON Web Token)
- **Email:** Nodemailer hoặc SendGrid
- **SMS:** Twilio hoặc VIETTEL SMS API
### DevOps / Infra
- **Protocol:** HTTP/2 + HTTPS
- **Charset:** UTF-8
- **Analytics:** Google Tag Manager (GTM-TTGB95P9) + GA4
- **Hosting:** VPS/Cloud (VN region)
---
## 📁 Project Structure
```
mahaspa/
├── CLAUDE.md                  # ← file này
├── client/                    # Frontend (React/Vue SPA)
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AboutUs.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── ServiceDetail.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── Voucher.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Promotions.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogPost.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── MyBookings.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LanguageSwitcher.jsx
│   │   │   ├── BookingForm.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── BranchCard.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── ChatWidget.jsx        # Zalo/WhatsApp floating button
│   │   │   └── PromoBanner.jsx
│   │   ├── hooks/
│   │   │   ├── useBooking.js
│   │   │   ├── useAuth.js
│   │   │   └── useServices.js
│   │   ├── store/                    # Zustand hoặc Redux
│   │   ├── i18n/
│   │   │   ├── vi.json
│   │   │   └── en.json
│   │   ├── api/                      # Axios API calls
│   │   │   ├── services.api.js
│   │   │   ├── booking.api.js
│   │   │   ├── auth.api.js
│   │   │   └── voucher.api.js
│   │   └── utils/
│   └── package.json
│
├── server/                    # Backend (Node.js + Express)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── branches.routes.js
│   │   │   ├── services.routes.js
│   │   │   ├── bookings.routes.js
│   │   │   ├── vouchers.routes.js
│   │   │   ├── slots.routes.js
│   │   │   ├── promotions.routes.js
│   │   │   └── blog.routes.js
│   │   ├── controllers/
│   │   ├── models/
│   │   │   ├── Branch.model.js
│   │   │   ├── Service.model.js
│   │   │   ├── Booking.model.js
│   │   │   ├── User.model.js
│   │   │   ├── Voucher.model.js
│   │   │   ├── Slot.model.js
│   │   │   ├── Promotion.model.js
│   │   │   └── BlogPost.model.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js     # JWT verify
│   │   │   └── i18n.middleware.js
│   │   ├── services/
│   │   │   ├── email.service.js
│   │   │   ├── sms.service.js
│   │   │   └── notification.service.js
│   │   └── app.js
│   └── package.json
│
└── admin/                     # Admin Panel (nội bộ)
    └── src/
        ├── pages/
        │   ├── Dashboard.jsx
        │   ├── ManageBookings.jsx
        │   ├── ManageServices.jsx
        │   ├── ManageBranches.jsx
        │   ├── ManageVouchers.jsx
        │   ├── ManagePromotions.jsx
        │   ├── ManageStaff.jsx
        │   └── Reports.jsx
        └── ...
```
---
## 🗂️ Tất cả Module (24 modules / 7 nhóm)
### ① Public Pages
| Module | Route | Mô tả |
|--------|-------|--------|
| **Home Page** | `/home?lang=vi\|en` | Hero banner, giới thiệu thương hiệu, highlight dịch vụ, CTA booking |
| **About / Chi nhánh** | `/about-us/:branchId` | Chi tiết từng chi nhánh — fetch MongoDB theo ObjectID |
**Known branch IDs (MongoDB ObjectID):**
- Heritage: `683081b42427a66e073ffe64`
- Signature: `683081dc2427a66e073ffe66`
---
### ② Services
| Module | Route | Mô tả |
|--------|-------|--------|
| **Danh sách dịch vụ** | `/services` | Liệt kê tất cả, lọc theo loại/chi nhánh |
| **Chi tiết dịch vụ** | `/services/:serviceId` | Mô tả, nguyên liệu, giá, thời gian, nút booking |
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
5. Xác nhận → email/SMS confirmation
---
### ④ Content
| Module | Route | Mô tả |
|--------|-------|--------|
| **Gallery** | `/gallery` | Lightbox ảnh không gian 2 chi nhánh |
| **Khuyến mãi** | `/promotions` | Ưu đãi theo mùa, Tết, Holiday |
| **Blog** | `/blog` | Bài viết wellness, press coverage |
| **Blog chi tiết** | `/blog/:slug` | Bài viết đầy đủ, SEO meta per-article |
---
### ⑤ User
| Module | Route | Mô tả |
|--------|-------|--------|
| **Đăng ký / Đăng nhập** | `/login` · `/register` | JWT auth, có thể OAuth Google/Facebook |
| **Lịch sử booking** | `/my-bookings` | Xem, hủy, đổi lịch; xem receipt |
---
### ⑥ Communication
| Module | Route | Mô tả |
|--------|-------|--------|
| **Contact** | `/contact` | Địa chỉ, hotline, Google Maps, form liên hệ |
| **Chat Widget** | Floating button | Zalo (VN), WhatsApp (khách quốc tế), Messenger |
| **Email/SMS Notification** | Backend service | Auto confirm booking, reminder, newsletter |
---
### ⑦ Analytics & Admin
| Module | Route | Mô tả |
|--------|-------|--------|
| **Google Tag Manager** | GTM-TTGB95P9 | GA4, conversion tracking, Facebook Pixel |
| **Admin Panel** | `/admin` (private) | CRUD services, branches, bookings, staff |
| **REST API** | `/api/v1/...` | Node.js + Express, JWT auth |
| **i18n** | `?lang=vi\|en` | i18next, toàn bộ routes hỗ trợ |
---
## 🔌 REST API Endpoints
```
# Auth
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/verify-otp
# Branches
GET    /api/v1/branches
GET    /api/v1/branches/:id
# Services
GET    /api/v1/services
GET    /api/v1/services/:id
GET    /api/v1/services?branch=:branchId&category=:cat
# Bookings
GET    /api/v1/bookings                     # (auth required)
GET    /api/v1/bookings/:id
POST   /api/v1/bookings
PATCH  /api/v1/bookings/:id/cancel
PATCH  /api/v1/bookings/:id/reschedule
# Available Slots
GET    /api/v1/slots?branch=:id&date=:date&service=:id
# Vouchers
POST   /api/v1/vouchers/validate
POST   /api/v1/vouchers/purchase
GET    /api/v1/vouchers/:code
# Promotions
GET    /api/v1/promotions
GET    /api/v1/promotions/:id
# Blog
GET    /api/v1/blog
GET    /api/v1/blog/:slug
# Admin (JWT + role=admin required)
GET    /api/v1/admin/bookings
POST   /api/v1/admin/services
PUT    /api/v1/admin/services/:id
DELETE /api/v1/admin/services/:id
GET    /api/v1/admin/reports/revenue
GET    /api/v1/admin/reports/bookings
```
---
## 🗄️ MongoDB Models
### Branch
```js
{
  _id: ObjectId,
  name: { vi: String, en: String },
  address: String,
  phone: String,
  openHours: String,         // "09:00 - 21:00"
  images: [String],
  location: { lat, lng },
  isActive: Boolean,
  createdAt, updatedAt
}
```
### Service
```js
{
  _id: ObjectId,
  name: { vi: String, en: String },
  description: { vi: String, en: String },
  category: String,           // 'massage' | 'facial' | 'head-spa' | 'foot-spa' | 'combo'
  duration: Number,           // phút
  price: Number,              // VND
  ingredients: [String],
  images: [String],
  branches: [ObjectId],       // ref: Branch
  isActive: Boolean,
  createdAt, updatedAt
}
```
### Booking
```js
{
  _id: ObjectId,
  user: ObjectId,             // ref: User (optional nếu guest)
  guestInfo: { name, phone, email, note },
  branch: ObjectId,           // ref: Branch
  service: ObjectId,          // ref: Service
  date: Date,
  timeSlot: String,           // "10:00"
  status: String,             // 'pending' | 'confirmed' | 'completed' | 'cancelled'
  totalPrice: Number,
  voucher: String,
  paymentMethod: String,      // 'card' | 'cash' | 'vnpay' | 'momo'
  therapist: ObjectId,        // ref: Staff (optional)
  createdAt, updatedAt
}
```
### User
```js
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  passwordHash: String,
  role: String,               // 'customer' | 'staff' | 'admin'
  preferredLang: String,      // 'vi' | 'en'
  createdAt, updatedAt
}
```
### Voucher
```js
{
  _id: ObjectId,
  code: String,               // unique
  type: String,               // 'fixed' | 'percent' | 'service'
  value: Number,
  minOrderValue: Number,
  expiresAt: Date,
  usedAt: Date,
  usedBy: ObjectId,
  source: String,             // 'internal' | 'klook' | 'traveloka'
  isActive: Boolean
}
```
---
## 🌐 i18n Convention
- **URL param:** `?lang=vi` (default) hoặc `?lang=en`
- **JSON files:** `src/i18n/vi.json` và `src/i18n/en.json`
- **Lib:** `i18next` + `react-i18next`
- **Usage:**
  ```jsx
  const { t } = useTranslation();
  <h1>{t('home.hero.title')}</h1>
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
- **Language:** JavaScript (ES2022+) — có thể dùng TypeScript
- **API Response format:**
  ```json
  {
    "success": true,
    "data": { ... },
    "message": "OK",
    "pagination": { "page": 1, "total": 50 }
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
- **Currency:** VND (số nguyên, không dùng float)
- **Env vars:** Dùng `.env` — không commit lên git
---
## 🚀 Getting Started (cho Claude Code)
Khi được yêu cầu scaffold project, ưu tiên thứ tự:
1. Tạo `server/` trước — models + routes + controllers
2. Seed data mẫu (2 branches, 5-10 services, 3 slots mỗi ngày)
3. Tạo `client/` — pages + components
4. Kết nối API
5. Thêm i18n (vi + en)
6. Tạo `admin/` panel cuối cùng
