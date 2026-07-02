<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Trang Giới thiệu trước đây chỉ cho sửa ảnh; toàn bộ chữ nằm ở nhóm dịch
 * about.* (Quản lý dịch). Thêm cột text đa ngôn ngữ (JSON {vi,en,...}) cho
 * từng section để admin sửa trực tiếp tại "Trang Giới thiệu" — để trống thì
 * FE vẫn fallback về chuỗi dịch about.* như cũ.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            // 1 · Hero
            $table->json('hero_eyebrow')->nullable();
            $table->json('hero_title')->nullable();
            $table->json('hero_subtitle')->nullable();
            $table->json('hero_retreat')->nullable();

            // 1b · 4 trụ cột ưu điểm (repeater: title/description đa ngôn ngữ)
            $table->json('features')->nullable();

            // 3 · Câu chuyện thương hiệu
            $table->json('story_eyebrow')->nullable();
            $table->json('story_heading')->nullable();
            $table->json('story_p1')->nullable();
            $table->json('story_p2')->nullable();

            // 4 · Tầm nhìn & Sứ mệnh
            $table->json('vision_eyebrow')->nullable();
            $table->json('vision_title')->nullable();
            $table->json('vision_p1')->nullable();
            $table->json('vision_p2')->nullable();
            $table->json('vision_bullets')->nullable();

            // 5 · Giá trị cốt lõi
            $table->json('values_eyebrow')->nullable();
            $table->json('values_title')->nullable();
            $table->json('value1_title')->nullable();
            $table->json('value1_desc')->nullable();
            $table->json('value2_title')->nullable();
            $table->json('value2_desc')->nullable();
            $table->json('value3_title')->nullable();
            $table->json('value3_desc')->nullable();

            // 6 · Đội ngũ
            $table->json('team_eyebrow')->nullable();
            $table->json('team_title')->nullable();

            // 7 · Đánh giá khách hàng
            $table->json('reviews_eyebrow')->nullable();
            $table->json('reviews_title')->nullable();
            $table->json('review_video_caption')->nullable();
            $table->json('review_quote')->nullable();
            $table->json('review_quote_author')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'hero_eyebrow', 'hero_title', 'hero_subtitle', 'hero_retreat',
                'features',
                'story_eyebrow', 'story_heading', 'story_p1', 'story_p2',
                'vision_eyebrow', 'vision_title', 'vision_p1', 'vision_p2', 'vision_bullets',
                'values_eyebrow', 'values_title',
                'value1_title', 'value1_desc', 'value2_title', 'value2_desc', 'value3_title', 'value3_desc',
                'team_eyebrow', 'team_title',
                'reviews_eyebrow', 'reviews_title', 'review_video_caption', 'review_quote', 'review_quote_author',
            ]);
        });
    }
};
