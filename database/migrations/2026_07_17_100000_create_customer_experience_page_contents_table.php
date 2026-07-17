<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customer_experience_page_contents', function (Blueprint $table) {
            $table->id();

            // 1 · Hero
            $table->string('hero_image')->nullable();
            $table->json('hero_image_alt')->nullable();
            $table->json('hero_title')->nullable();
            $table->json('hero_subtitle')->nullable();
            $table->boolean('hero_visible')->default(true);

            // 2 · Dải số liệu thống kê
            $table->json('stats')->nullable();
            $table->boolean('stats_visible')->default(true);

            // 3 · "Khoảng lặng mà khách hàng cảm nhận" — gallery lọc theo danh mục dịch vụ
            $table->json('gallery_title')->nullable();
            $table->json('gallery_images')->nullable();
            $table->json('featured_stat_title')->nullable();
            $table->json('featured_stat_description')->nullable();
            $table->unsignedInteger('featured_stat_position')->default(8);
            $table->boolean('gallery_visible')->default(true);

            // 4 · Dải đánh giá / trích dẫn khách hàng
            $table->json('testimonials_title')->nullable();
            $table->json('testimonials_intro')->nullable();
            $table->json('testimonials')->nullable();
            $table->boolean('testimonials_visible')->default(true);

            // 5 · "Vì sao khách hàng quay lại Mầm"
            $table->json('reasons_title')->nullable();
            $table->json('reasons_features')->nullable();
            $table->json('reasons_card_title')->nullable();
            $table->json('reasons_card_description')->nullable();
            $table->string('reasons_card_stat_text')->nullable();
            $table->json('reasons_card_avatars')->nullable();
            $table->json('reasons_card_button_text')->nullable();
            $table->string('reasons_card_button_url')->nullable();
            $table->boolean('reasons_visible')->default(true);

            // 6 · "Theo dõi Mầm trên Instagram"
            $table->json('instagram_title')->nullable();
            $table->json('instagram_images')->nullable();
            $table->string('instagram_handle')->nullable();
            $table->json('instagram_description')->nullable();
            $table->string('instagram_url')->nullable();
            $table->boolean('instagram_visible')->default(true);

            // 7 · Banner CTA đóng trang
            $table->json('closing_title')->nullable();
            $table->json('closing_button_text')->nullable();
            $table->string('closing_button_url')->nullable();
            $table->boolean('closing_visible')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_experience_page_contents');
    }
};
