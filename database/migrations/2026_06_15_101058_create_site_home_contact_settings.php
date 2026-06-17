<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('brand_name')->nullable();
            $table->string('tagline')->nullable();
            $table->string('hotline')->nullable();
            $table->string('email')->nullable();
            $table->string('chat_url')->nullable();
            $table->json('social_links')->nullable();
            $table->json('service_menu')->nullable();
            $table->timestamps();
        });

        Schema::create('home_page_contents', function (Blueprint $table) {
            $table->id();
            $table->json('hero_title')->nullable();
            $table->json('hero_subtitle')->nullable();
            $table->json('hero_eyebrow')->nullable();
            $table->json('hero_cta_text')->nullable();
            $table->string('hero_cta_link')->nullable();
            $table->string('hero_image')->nullable();
            $table->json('service_list_title')->nullable();
            $table->unsignedTinyInteger('testimonial_rating')->nullable();
            $table->unsignedInteger('testimonial_review_count')->nullable();
            $table->string('testimonial_source')->nullable();
            $table->json('testimonials')->nullable();
            $table->timestamps();
        });

        Schema::create('contact_page_contents', function (Blueprint $table) {
            $table->id();
            $table->json('seo_description')->nullable();
            $table->json('heading')->nullable();
            $table->string('email')->nullable();
            $table->string('map_embed_url')->nullable();
            $table->timestamps();
        });

        Schema::table('service_page_contents', function (Blueprint $table) {
            $table->json('listing_categories')->nullable()->after('faqs');
            $table->json('massage_cards')->nullable()->after('listing_categories');
            $table->json('head_spa_cards')->nullable()->after('massage_cards');
            $table->json('other_care_items')->nullable()->after('head_spa_cards');
            $table->string('massage_eyebrow')->nullable()->after('other_care_items');
            $table->string('head_spa_eyebrow')->nullable()->after('massage_eyebrow');
            $table->string('head_spa_title')->nullable()->after('head_spa_eyebrow');
            $table->string('other_care_eyebrow')->nullable()->after('head_spa_title');
            $table->string('other_care_title')->nullable()->after('other_care_eyebrow');
        });

        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->string('review_video_url')->nullable()->after('instagram_handles');
            $table->string('review_video_image')->nullable()->after('review_video_url');
            $table->json('review_cards')->nullable()->after('review_video_image');
        });

        DB::table('site_settings')->insert([
            'brand_name' => 'Mầm Spa',
            'tagline' => 'Rooted in Vietnamese Healing Traditions',
            'hotline' => '(+84) 965 80 6166',
            'email' => 'info@mamspa.vn',
            'chat_url' => 'https://zalo.me/0865806166',
            'social_links' => json_encode([
                ['label' => 'Facebook', 'href' => 'https://facebook.com/mahaSpa.danang'],
                ['label' => 'Instagram', 'href' => 'https://instagram.com/mahaspa.danang'],
                ['label' => 'Zalo OA', 'href' => 'https://zalo.me/0865806166'],
            ]),
            'service_menu' => json_encode([
                ['label' => 'Mầm Combo', 'href' => '/dich-vu?category=combo'],
                ['label' => 'Traditional Massage', 'href' => '/dich-vu?category=massage'],
                ['label' => 'Head Spa', 'href' => '/dich-vu?category=head-spa'],
                ['label' => 'Facial Care', 'href' => '/dich-vu?category=facial'],
                ['label' => 'Mother Care', 'href' => '/dich-vu?category=mother-care'],
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('home_page_contents')->insert([
            'hero_title' => json_encode(['vi' => 'Hành trình cân bằng Thân – Tâm – Trí', 'en' => 'The Journey to Balance Body – Mind – Spirit']),
            'hero_subtitle' => json_encode(['vi' => 'Mầm Spa — Trải nghiệm spa truyền thống Việt giữa lòng Đà Nẵng', 'en' => 'Traditional Vietnamese spa experience in Da Nang']),
            'hero_cta_text' => json_encode(['vi' => 'Đặt lịch ngay', 'en' => 'Book now']),
            'hero_cta_link' => '/dat-lich',
            'service_list_title' => json_encode(['vi' => 'Dịch vụ nổi bật', 'en' => 'Featured Services']),
            'testimonial_rating' => 5,
            'testimonial_review_count' => 821,
            'testimonial_source' => 'google',
            'testimonials' => json_encode([
                ['name' => 'B H', 'time' => '8 months ago', 'rating' => 5, 'content' => ['vi' => 'Mầm Massage Therapy & Healing Spa ist ein Ort, bei dem man sich verwöhnen lassen sollte! Die Atmosphäre ist ruhig und entspannend, das Personal sehr aufmerksam.']],
                ['name' => '2201_Nguyễn Phi Lân', 'time' => '8 months ago', 'rating' => 5, 'content' => ['vi' => 'Tối đi làm về thấy bảng hiệu nên ghé thử vì muốn massage cổ vai do phải ngồi lâu. Liệu trình làm khá dễ chịu, thấy hiệu quả rõ rệt, tuy chưa đặt lịch trước mà vẫn được phục vụ chu đáo.']],
                ['name' => 'Oanh Hoang', 'time' => '8 months ago', 'rating' => 5, 'content' => ['vi' => 'Lần đầu đi massage hơi bỡ ngỡ xíu kkkk. Mấy bạn ở đây tư vấn nhiệt tình mà đúng với nhu cầu của mình, hông có bị upsale, chạy KPI. Kỹ thuật viên tay nghề tốt, sẽ quay lại.']],
                ['name' => 'Trần Mỹ Linh', 'time' => '6 months ago', 'rating' => 5, 'content' => ['vi' => 'Không gian yên tĩnh, thơm mùi thảo mộc rất dễ chịu. Head spa 21 bước thư giãn đỉnh cao, ngủ quên luôn. Nhân viên nhẹ nhàng, chuyên nghiệp.']],
                ['name' => 'James P.', 'time' => '5 months ago', 'rating' => 5, 'content' => ['vi' => 'A hidden gem in Da Nang. The foot spa and shoulder massage were exactly what I needed after a long flight. Will definitely come back.']],
                ['name' => 'Phạm Thu Hà', 'time' => '4 months ago', 'rating' => 5, 'content' => ['vi' => 'Giá hợp lý, chất lượng vượt mong đợi. Combo gội + massage làm mình thư giãn hoàn toàn. Sẽ giới thiệu cho bạn bè.']],
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('contact_page_contents')->insert([
            'heading' => json_encode(['vi' => 'Liên hệ', 'en' => 'Contact']),
            'seo_description' => json_encode(['vi' => 'Liên hệ Mầm Spa để được tư vấn và đặt lịch tại chi nhánh phù hợp.', 'en' => 'Contact Mam Spa for consultation and booking at your preferred branch.']),
            'email' => 'info@mamspa.vn',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('service_page_contents')->where('id', 1)->update([
            'listing_categories' => json_encode(['Body Massage', 'Head Spa', 'Facial Care', 'Mother Care']),
            'massage_eyebrow' => 'Vietnamese Healing Therapy',
            'massage_cards' => json_encode([
                ['title' => 'Head - Neck - Shoulder', 'description' => null],
                ['title' => 'Foot Work', 'description' => null],
                ['title' => 'Body Work', 'description' => null],
            ]),
            'head_spa_eyebrow' => 'Nourish your roots, calm your mind',
            'head_spa_title' => 'Head Spa & Scalp Care',
            'head_spa_cards' => json_encode([
                [
                    'title' => 'HEAD SPA THƯ GIÃN',
                    'services' => [
                        ['name' => 'Gội Thư Giãn', 'duration' => '45 Phút', 'description' => 'Làm sạch nhẹ nhàng, kết hợp massage đầu và cổ vai gáy. Giúp xua tan áp lực, mang lại sự nhẹ nhõm tức thì.'],
                        ['name' => 'Đặc Trưng Mầm', 'duration' => '60 Phút', 'description' => 'Gội dưỡng sinh chuyên sâu, ấn huyệt cổ vai gáy, kết hợp chườm mắt thảo dược giúp đả thông kinh lạc.'],
                        ['name' => 'Chuyên Sâu', 'duration' => '60 Phút', 'description' => 'Liệu pháp đặc trị cho vùng đầu, kết hợp chườm đá nóng và massage ấn huyệt gáy giúp giấc ngủ sâu hơn.'],
                    ],
                ],
                [
                    'title' => 'SCALP CARE PHỤC HỒI',
                    'services' => [
                        ['name' => 'Phục Hồi Da Đầu', 'duration' => '45 Phút', 'description' => 'Làm sạch sâu bã nhờn, tẩy tế bào chết và phục hồi nang tóc. Kích thích mọc tóc tự nhiên và giảm gãy rụng.'],
                        ['name' => 'Tái Tạo Da Đầu & Làn Da', 'duration' => '75 Phút', 'description' => 'Cân bằng độ ẩm da đầu, cải thiện nang tóc kết hợp đắp mặt nạ thư giãn và massage nâng cơ mặt.'],
                        ['name' => 'Soi Da Đầu (Tặng kèm)', 'duration' => 'Before / After', 'description' => 'Kiểm tra tình trạng nang tóc trước và sau liệu trình bằng máy soi chuyên dụng để thấy rõ sự thay đổi.'],
                    ],
                ],
            ]),
            'other_care_eyebrow' => 'Beauty from within',
            'other_care_title' => 'Các dịch vụ chăm sóc khác',
            'other_care_items' => json_encode([
                ['title' => 'Mother Care', 'eyebrow' => 'Nâng niu hành trình thiêng liêng', 'paragraphs' => [
                    'Giai đoạn thai kỳ mang đến nhiều thay đổi khiến cơ thể mẹ dễ mệt mỏi. Liệu trình Mother Care tại Mầm Spa sử dụng dầu massage 100% hữu cơ, kết hợp kỹ thuật ấn huyệt nhẹ nhàng, an toàn tuyệt đối cho cả mẹ và bé.',
                    'Giúp giảm đau nhức cơ xương khớp, hạn chế tình trạng chuột rút và mang lại giấc ngủ sâu, an lành cho mẹ bầu.',
                ]],
                ['title' => 'Facial Care', 'eyebrow' => 'Đánh thức vẻ rạng rỡ tự nhiên', 'paragraphs' => [
                    'Chăm sóc chuyên sâu với các dòng sản phẩm chiết xuất từ thảo mộc thiên nhiên, an toàn và lành tính.',
                    'Kết hợp liệu pháp massage nâng cơ bằng đá nóng giúp trẻ hoá làn da và xoá mờ dấu vết thời gian.',
                ]],
            ]),
        ]);
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->dropColumn(['review_video_url', 'review_video_image', 'review_cards']);
        });

        Schema::table('service_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'listing_categories',
                'massage_cards',
                'head_spa_cards',
                'other_care_items',
                'massage_eyebrow',
                'head_spa_eyebrow',
                'head_spa_title',
                'other_care_eyebrow',
                'other_care_title',
            ]);
        });

        Schema::dropIfExists('contact_page_contents');
        Schema::dropIfExists('home_page_contents');
        Schema::dropIfExists('site_settings');
    }
};
