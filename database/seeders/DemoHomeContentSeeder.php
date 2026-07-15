<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\HomePageContent;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Database\Seeder;

/**
 * Dữ liệu demo tạm thời để xem trang chủ đầy đủ section sau khi `migrate:fresh`
 * xoá sạch chi nhánh/dịch vụ thật. KHÔNG được gọi từ DatabaseSeeder mặc định —
 * chỉ chạy thủ công (`php artisan db:seed --class=DemoHomeContentSeeder`) khi
 * cần xem trước giao diện cục bộ. Nội dung phỏng theo mockup trang chủ; cần
 * thay bằng nội dung + ảnh thật qua /admin trước khi dùng thật.
 */
class DemoHomeContentSeeder extends Seeder
{
    public function run(): void
    {
        $branchIntro = [
            'home_intro_title' => ['vi' => 'Khám phá các không gian Mầm Spa', 'en' => 'Explore the Mầm Spa spaces'],
            'home_intro_eyebrow' => ['vi' => 'A retreat for body, mind & soul', 'en' => 'A retreat for body, mind & soul'],
            'home_intro_subheading' => ['vi' => 'Không gian chữa lành', 'en' => 'A healing space'],
            'home_intro_cta' => ['vi' => 'Khám phá không gian', 'en' => 'Explore the space'],
        ];

        $phuNhuan = Branch::updateOrCreate(['slug' => 'phu-nhuan'], [
            'name' => ['vi' => 'Phú Nhuận', 'en' => 'Phú Nhuận'],
            'address' => '12 Lê Văn Sỹ, Phường Phú Nhuận, TP. Hồ Chí Minh',
            'phone' => '(+84) 965 80 6166',
            'open_hours' => '09:00 - 21:00',
            'is_active' => true,
            'page_content' => $branchIntro + [
                'home_intro_heading' => ['vi' => 'Một góc bình yên trong lòng phố.', 'en' => 'A peaceful corner in the city.'],
                'home_intro_body_1' => ['vi' => 'Một không gian ấm cúng trong con hẻm nhỏ, dễ tìm về sự bình yên giữa nhịp sống hối hả.', 'en' => 'A cosy space tucked in a small alley, easy to find peace amid the rush of city life.'],
                'home_intro_body_2' => ['vi' => 'Nơi mọi giác quan được đánh thức nhẹ nhàng bởi hương thảo mộc và ánh sáng tự nhiên.', 'en' => 'A place where every sense is gently awakened by herbal scents and natural light.'],
            ],
        ]);

        $benThanh = Branch::updateOrCreate(['slug' => 'ben-thanh'], [
            'name' => ['vi' => 'Bến Thành', 'en' => 'Bến Thành'],
            'address' => '45 Phạm Ngũ Lão, Phường Bến Thành, TP. Hồ Chí Minh',
            'phone' => '(+84) 965 80 6166',
            'open_hours' => '09:00 - 21:00',
            'is_active' => true,
            'page_content' => $branchIntro + [
                'home_intro_heading' => ['vi' => 'Nét thanh tĩnh giữa lòng thành phố.', 'en' => 'Quiet elegance in the heart of the city.'],
                'home_intro_body_1' => ['vi' => 'Không gian thanh tịnh giữa lòng thành phố, nơi từng chi tiết đều được chăm chút.', 'en' => 'A serene space in the heart of the city, where every detail is thoughtfully cared for.'],
                'home_intro_body_2' => ['vi' => 'Một điểm dừng chân lý tưởng để tạm gác lại nhịp sống hối hả.', 'en' => 'An ideal stop to set aside the rush of daily life.'],
            ],
        ]);

        // "Four Healing Journeys" — gán vào 4 danh mục gốc đã có sẵn từ migration.
        $journeys = [
            'massage' => [
                'description' => ['vi' => 'Liệu pháp trị liệu cổ truyền Việt đánh thức khả năng tự chữa lành của cơ thể.', 'en' => "Traditional Vietnamese healing therapy awakens the body's self-healing ability."],
                'service' => ['vi' => 'Massage trị liệu cổ truyền Việt', 'en' => 'Vietnamese Healing Therapy'],
            ],
            'head-spa' => [
                'description' => ['vi' => 'Gội đầu dưỡng sinh chuẩn Nhật, chăm sóc chuyên sâu cho sức khoẻ da đầu.', 'en' => 'Japanese-standard scalp therapy, deep care for scalp health.'],
                'service' => ['vi' => 'Head Spa & Scalp Care', 'en' => 'Head Spa & Scalp Care'],
            ],
            'facial' => [
                'description' => ['vi' => 'Chăm sóc da thuần tự nhiên, lành tính và an toàn cho làn da khoẻ đẹp từ bên trong.', 'en' => 'Pure natural skincare, gentle and safe for healthy skin from within.'],
                'service' => ['vi' => 'Chăm sóc da mặt tự nhiên', 'en' => 'Natural Facial Care'],
            ],
            'combo' => [
                'description' => ['vi' => 'Nghi thức trị liệu thư giãn toàn diện cho thân - tâm, cân bằng và tái tạo năng lượng.', 'en' => 'A signature full-body ritual balancing body and mind, restoring energy.'],
                'service' => ['vi' => 'Signature Rituals', 'en' => 'Signature Rituals'],
            ],
        ];

        foreach ($journeys as $slug => $info) {
            $category = ServiceCategory::whereNull('parent_id')->where('slug', $slug)->first();
            if (! $category) {
                continue;
            }

            $category->update(['description' => $info['description']]);

            $service = Service::updateOrCreate(['slug' => $slug.'-signature'], [
                'name' => $info['service'],
                'short_description' => $info['description'],
                'description' => $info['description'],
                'service_category_id' => $category->id,
                'duration' => 60,
                'price' => 590000,
                'is_featured' => true,
                'is_active' => true,
            ]);

            $service->branches()->sync([$phuNhuan->id, $benThanh->id]);
        }

        // Cập nhật hero cho khớp tinh thần bản mockup (vẫn giữ thương hiệu Mầm Spa).
        HomePageContent::current()->update([
            'hero_eyebrow' => ['vi' => 'Bắt nguồn từ truyền thống chữa bệnh của Việt Nam', 'en' => 'Rooted in Vietnamese healing traditions'],
            'hero_title' => ['vi' => "Hành trình chữa lành\ntừ thiên nhiên", 'en' => "Rooted in Vietnamese\nHealing Traditions"],
            'hero_subtitle' => ['vi' => 'Một khoảng lặng giữa nhịp sống thành phố.', 'en' => 'A quiet pause amid the rhythm of city life.'],
        ]);
    }
}
