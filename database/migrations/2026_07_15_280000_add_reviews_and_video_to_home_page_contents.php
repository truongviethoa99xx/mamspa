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
            // Thẻ đánh giá Google — nhập tay, không tự đồng bộ.
            $table->string('reviews_google_rating')->nullable()->after('testimonial_source');
            $table->unsignedInteger('reviews_google_count')->nullable()->after('reviews_google_rating');
            $table->string('reviews_google_link')->nullable()->after('reviews_google_count');

            // Thẻ đánh giá TripAdvisor — nhập tay (chưa có tích hợp API TripAdvisor).
            $table->string('reviews_tripadvisor_rating')->nullable()->after('reviews_google_link');
            $table->unsignedInteger('reviews_tripadvisor_count')->nullable()->after('reviews_tripadvisor_rating');
            $table->string('reviews_tripadvisor_link')->nullable()->after('reviews_tripadvisor_count');

            // Nút "Xem thêm đánh giá" trên thẻ trích dẫn khách hàng.
            $table->string('testimonials_cta_link')->nullable()->after('testimonials_visible');

            // Thẻ video — cho phép upload file HOẶC dán link YouTube/Vimeo (ưu tiên file nếu có cả 2).
            $table->string('testimonial_video_thumbnail')->nullable()->after('testimonial_video_url');
            $table->string('testimonial_video_file')->nullable()->after('testimonial_video_thumbnail');
        });

        DB::table('home_page_contents')->update([
            'reviews_google_rating' => '4.9',
            'reviews_google_count' => 328,
            'reviews_tripadvisor_rating' => '5.0',
            'reviews_tripadvisor_count' => 156,
        ]);
    }

    public function down(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'reviews_google_rating', 'reviews_google_count', 'reviews_google_link',
                'reviews_tripadvisor_rating', 'reviews_tripadvisor_count', 'reviews_tripadvisor_link',
                'testimonials_cta_link',
                'testimonial_video_thumbnail', 'testimonial_video_file',
            ]);
        });
    }
};
