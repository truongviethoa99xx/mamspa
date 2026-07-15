<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            // "A Place To Pause" — đoạn giới thiệu thương hiệu ngắn, có ảnh minh hoạ.
            $table->json('story_eyebrow')->nullable()->after('branch_intro_caption');
            $table->json('story_body')->nullable()->after('story_eyebrow');
            $table->json('story_cta_text')->nullable()->after('story_body');
            $table->string('story_image')->nullable()->after('story_cta_text');
            $table->boolean('story_visible')->default(true)->after('story_image');

            // "Our Philosophy" — trích dẫn triết lý trị liệu, căn giữa trang.
            $table->json('philosophy_eyebrow')->nullable()->after('story_visible');
            $table->json('philosophy_quote')->nullable()->after('philosophy_eyebrow');
            $table->boolean('philosophy_visible')->default(true)->after('philosophy_quote');

            // Banner "The Art of Vietnamese Healing" — ảnh + copy chia đôi.
            $table->json('art_banner_eyebrow')->nullable()->after('philosophy_visible');
            $table->json('art_banner_heading')->nullable()->after('art_banner_eyebrow');
            $table->json('art_banner_body')->nullable()->after('art_banner_heading');
            $table->json('art_banner_cta_text')->nullable()->after('art_banner_body');
            $table->string('art_banner_image')->nullable()->after('art_banner_cta_text');
            $table->boolean('art_banner_visible')->default(true)->after('art_banner_image');

            // "Why Mầm Spa" — danh sách điểm nổi bật dạng icon.
            $table->json('why_us_items')->nullable()->after('art_banner_visible');
            $table->boolean('why_us_visible')->default(true)->after('why_us_items');

            // Video review (tuỳ chọn) hiển thị cùng khối đánh giá khách hàng.
            $table->string('testimonial_video_url')->nullable()->after('testimonials_visible');

            // Dải ảnh xem trước thư viện ảnh.
            $table->boolean('gallery_visible')->default(true)->after('testimonial_video_url');

            // CTA cuối trang "Take a moment for yourself".
            $table->json('final_cta_heading')->nullable()->after('gallery_visible');
            $table->json('final_cta_cta_text')->nullable()->after('final_cta_heading');
            $table->string('final_cta_cta_link')->nullable()->after('final_cta_cta_text');
            $table->string('final_cta_image')->nullable()->after('final_cta_cta_link');
            $table->boolean('final_cta_visible')->default(true)->after('final_cta_image');
        });

        // Seed nội dung mặc định (vi + en) cho bản ghi hiện có — các ngôn ngữ khác
        // (ja/ko/zh) sẽ tự fallback về vi qua helper `tr()` ở FE cho tới khi admin
        // dịch qua nút "Dịch tự động" trong /admin/home-page-settings.
        DB::table('home_page_contents')->update([
            'story_eyebrow' => json_encode([
                'vi' => 'Một khoảng lặng để nghỉ ngơi',
                'en' => 'A place to pause',
            ], JSON_UNESCAPED_UNICODE),
            'story_body' => json_encode([
                'vi' => "Giữa những chuyển động không ngừng của thành phố,\nMầm Spa là nơi cơ thể được nghỉ ngơi, tâm trí được lắng lại\nvà những giá trị trị liệu Việt được gìn giữ.",
                'en' => "Amid the city's constant motion,\nMầm Spa is where the body rests, the mind settles,\nand Vietnamese healing values are preserved.",
            ], JSON_UNESCAPED_UNICODE),
            'story_cta_text' => json_encode([
                'vi' => 'Về Mầm Spa',
                'en' => 'About Mầm Spa',
            ], JSON_UNESCAPED_UNICODE),

            'philosophy_eyebrow' => json_encode([
                'vi' => 'Triết lý của chúng tôi',
                'en' => 'Our philosophy',
            ], JSON_UNESCAPED_UNICODE),
            'philosophy_quote' => json_encode([
                'vi' => "An lành không phải là điều được trao.\nĐó là điều được đánh thức từ chính bên trong.",
                'en' => "Wellness is not something given.\nIt is something awakened from within.",
            ], JSON_UNESCAPED_UNICODE),

            'art_banner_eyebrow' => json_encode([
                'vi' => 'Nghệ thuật trị liệu Việt',
                'en' => 'The art of Vietnamese healing',
            ], JSON_UNESCAPED_UNICODE),
            'art_banner_heading' => json_encode([
                'vi' => 'Nghệ thuật trị liệu Việt',
                'en' => 'The art of Vietnamese healing',
            ], JSON_UNESCAPED_UNICODE),
            'art_banner_body' => json_encode([
                'vi' => "Được nuôi dưỡng từ những giá trị trị liệu Việt,\nphát triển bằng chuyên môn hiện đại\nvà gìn giữ qua từng đôi tay tận tâm.",
                'en' => "Nurtured by Vietnamese therapeutic heritage,\nrefined with modern expertise\nand carried through every attentive hand.",
            ], JSON_UNESCAPED_UNICODE),
            'art_banner_cta_text' => json_encode([
                'vi' => 'Tìm hiểu thêm',
                'en' => 'Learn more',
            ], JSON_UNESCAPED_UNICODE),

            'why_us_items' => json_encode([
                [
                    'icon' => 'Leaf',
                    'title' => ['vi' => 'Gốc rễ trị liệu Việt', 'en' => 'Rooted in Vietnamese healing traditions'],
                    'description' => ['vi' => 'Kế thừa và gìn giữ giá trị trị liệu truyền thống Việt Nam.', 'en' => 'Preserving the value of traditional Vietnamese therapy.'],
                ],
                [
                    'icon' => 'HeartHandshake',
                    'title' => ['vi' => 'Chăm sóc cá nhân hoá', 'en' => 'Personalized wellness'],
                    'description' => ['vi' => 'Trải nghiệm được cá nhân hoá cho từng nhu cầu riêng biệt.', 'en' => 'An experience tailored to your individual needs.'],
                ],
                [
                    'icon' => 'Sprout',
                    'title' => ['vi' => 'Thảo mộc tự nhiên', 'en' => 'Natural herbs'],
                    'description' => ['vi' => 'Sử dụng thảo mộc thiên nhiên, lành tính và an toàn.', 'en' => 'Using natural, gentle and safe herbal ingredients.'],
                ],
                [
                    'icon' => 'GraduationCap',
                    'title' => ['vi' => 'Đội ngũ chuyên nghiệp', 'en' => 'Professionally trained team'],
                    'description' => ['vi' => 'Trị liệu viên được đào tạo bài bản và giàu kinh nghiệm.', 'en' => 'Well-trained and experienced therapists.'],
                ],
                [
                    'icon' => 'Sparkles',
                    'title' => ['vi' => 'Dịch vụ tận tâm', 'en' => 'Thoughtful hospitality'],
                    'description' => ['vi' => 'Sự chu đáo trong từng chi tiết, chăm sóc bằng cả trái tim.', 'en' => 'Attentive care in every detail, from the heart.'],
                ],
            ], JSON_UNESCAPED_UNICODE),

            'final_cta_heading' => json_encode([
                'vi' => 'Dành một khoảnh khắc cho chính mình',
                'en' => 'Take a moment for yourself',
            ], JSON_UNESCAPED_UNICODE),
            'final_cta_cta_text' => json_encode([
                'vi' => 'Đặt lịch ngay',
                'en' => 'Book now',
            ], JSON_UNESCAPED_UNICODE),
            'final_cta_cta_link' => '/dat-lich/',
        ]);
    }

    public function down(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'story_eyebrow', 'story_body', 'story_cta_text', 'story_image', 'story_visible',
                'philosophy_eyebrow', 'philosophy_quote', 'philosophy_visible',
                'art_banner_eyebrow', 'art_banner_heading', 'art_banner_body', 'art_banner_cta_text', 'art_banner_image', 'art_banner_visible',
                'why_us_items', 'why_us_visible',
                'testimonial_video_url',
                'gallery_visible',
                'final_cta_heading', 'final_cta_cta_text', 'final_cta_cta_link', 'final_cta_image', 'final_cta_visible',
            ]);
        });
    }
};
