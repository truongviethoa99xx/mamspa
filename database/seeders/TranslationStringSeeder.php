<?php

namespace Database\Seeders;

use App\Models\TranslationString;
use Illuminate\Database\Seeder;

class TranslationStringSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            ['nav', 'home', ['vi' => 'Trang chủ', 'en' => 'Home']],
            ['nav', 'about', ['vi' => 'Giới thiệu', 'en' => 'About']],
            ['nav', 'services', ['vi' => 'Dịch vụ', 'en' => 'Services']],
            ['nav', 'booking', ['vi' => 'Đặt lịch', 'en' => 'Book Now']],
            ['nav', 'voucher', ['vi' => 'Voucher', 'en' => 'Voucher']],
            ['nav', 'gallery', ['vi' => 'Thư viện', 'en' => 'Gallery']],
            ['nav', 'promotions', ['vi' => 'Khuyến mãi', 'en' => 'Promotions']],
            ['nav', 'blog', ['vi' => 'Tin tức', 'en' => 'Blog']],
            ['nav', 'contact', ['vi' => 'Liên hệ', 'en' => 'Contact']],
            ['nav', 'myBookings', ['vi' => 'Lịch của tôi', 'en' => 'My Bookings']],
            ['nav', 'login', ['vi' => 'Đăng nhập', 'en' => 'Sign In']],
            ['nav', 'register', ['vi' => 'Đăng ký', 'en' => 'Sign Up']],
            ['nav', 'logout', ['vi' => 'Đăng xuất', 'en' => 'Sign Out']],
            ['common', 'loading', ['vi' => 'Đang tải...', 'en' => 'Loading...']],
            ['common', 'submit', ['vi' => 'Gửi', 'en' => 'Submit']],
            ['common', 'cancel', ['vi' => 'Huỷ', 'en' => 'Cancel']],
            ['common', 'save', ['vi' => 'Lưu', 'en' => 'Save']],
            ['common', 'back', ['vi' => 'Quay lại', 'en' => 'Back']],
            ['common', 'next', ['vi' => 'Tiếp tục', 'en' => 'Next']],
            ['common', 'bookNow', ['vi' => 'Đặt lịch ngay', 'en' => 'Book now']],
            ['common', 'readMore', ['vi' => 'Đọc thêm', 'en' => 'Read more']],
            ['home.hero', 'title', ['vi' => 'Hành trình cân bằng Thân - Tâm - Trí', 'en' => 'The Journey to Balance Body - Mind - Spirit']],
            ['home.hero', 'subtitle', ['vi' => 'Maha Spa — Trải nghiệm spa truyền thống Việt giữa lòng Đà Nẵng', 'en' => 'Maha Spa — Traditional Vietnamese spa experience in Da Nang']],
            ['footer', 'tagline', ['vi' => 'The Beginning of the Journey to Balance Body - Mind - Spirit', 'en' => 'The Beginning of the Journey to Balance Body - Mind - Spirit']],
            ['footer', 'branches', ['vi' => 'Chi nhánh', 'en' => 'Branches']],
            ['footer', 'contact', ['vi' => 'Liên hệ', 'en' => 'Contact']],
            ['footer', 'follow', ['vi' => 'Theo dõi chúng tôi', 'en' => 'Follow us']],
            ['footer', 'rights', ['vi' => '© {{year}} Maha Spa. All rights reserved.', 'en' => '© {{year}} Maha Spa. All rights reserved.']],
        ];

        foreach ($rows as [$group, $key, $values]) {
            TranslationString::updateOrCreate(
                ['group' => $group, 'key' => $key],
                ['values' => $values, 'is_auto_translated' => false]
            );
        }
    }
}
