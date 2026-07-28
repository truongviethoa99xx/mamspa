<?php

namespace Database\Seeders;

use App\Models\PolicyPage;
use Illuminate\Database\Seeder;

/**
 * 4 trang chính sách được liên kết ở footer (/chinh-sach/{slug} + /luu-y-dich-vu).
 * Nội dung khởi tạo tối thiểu — admin chỉnh sửa đầy đủ qua Filament (Nội dung ›
 * Trang chính sách), field "content" dùng Quill editor.
 */
class PolicyPageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'slug' => 'chinh-sach-bao-mat',
                'name' => ['vi' => 'Chính sách bảo mật', 'en' => 'Privacy Policy'],
                'content' => [
                    'vi' => '<p>Mầm Spa cam kết bảo mật thông tin cá nhân của khách hàng. Nội dung chi tiết đang được cập nhật.</p>',
                    'en' => '<p>Mầm Spa is committed to protecting customer personal information. Full details coming soon.</p>',
                ],
            ],
            [
                'slug' => 'dieu-khoan-dich-vu',
                'name' => ['vi' => 'Điều khoản dịch vụ', 'en' => 'Terms of Service'],
                'content' => [
                    'vi' => '<p>Điều khoản sử dụng dịch vụ tại Mầm Spa. Nội dung chi tiết đang được cập nhật.</p>',
                    'en' => '<p>Terms governing the use of Mầm Spa services. Full details coming soon.</p>',
                ],
            ],
            [
                'slug' => 'ho-tro-khach-hang',
                'name' => ['vi' => 'Hỗ trợ khách hàng', 'en' => 'Customer Support'],
                'content' => [
                    'vi' => '<p>Mọi thắc mắc vui lòng liên hệ tổng đài đặt lịch hoặc email mamspa.vn@gmail.com.</p>',
                    'en' => '<p>For any questions, please contact our hotline or email mamspa.vn@gmail.com.</p>',
                ],
            ],
            [
                'slug' => 'luu-y-dich-vu',
                'name' => ['vi' => 'Lưu ý dịch vụ', 'en' => 'Service Guidelines'],
                'content' => [
                    'vi' => '<p>Một số lưu ý trước khi trải nghiệm dịch vụ tại Mầm Spa. Nội dung chi tiết đang được cập nhật.</p>',
                    'en' => '<p>A few notes before your treatment at Mầm Spa. Full details coming soon.</p>',
                ],
            ],
        ];

        foreach ($pages as $page) {
            PolicyPage::updateOrCreate(
                ['slug' => $page['slug']],
                ['name' => $page['name'], 'content' => $page['content'], 'is_published' => true]
            );
        }
    }
}
