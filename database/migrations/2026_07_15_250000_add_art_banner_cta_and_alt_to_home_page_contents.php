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
            // Đường dẫn nút "Tìm hiểu thêm" — admin tự chọn trỏ tới đâu (vd: 1 bài blog cụ thể).
            $table->string('art_banner_cta_link')->nullable()->after('art_banner_cta_text');
            $table->string('art_banner_cta_text_color')->default('#2F3E2E')->after('art_banner_cta_link');
            $table->json('art_banner_image_alt')->nullable()->after('art_banner_image');
        });

        DB::table('home_page_contents')->update([
            'art_banner_cta_link' => '/blog/',
        ]);
    }

    public function down(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->dropColumn(['art_banner_cta_link', 'art_banner_cta_text_color', 'art_banner_image_alt']);
        });
    }
};
