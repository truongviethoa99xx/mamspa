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
            // Nút chính "Đặt lịch ngay" — text/link đã có sẵn (hero_cta_text, hero_cta_link).
            $table->string('hero_cta_background_color')->default('#2F3E2E')->after('hero_cta_link');
            $table->string('hero_cta_text_color')->default('#FFFFFF')->after('hero_cta_background_color');
            $table->string('hero_cta_border_color')->default('#2F3E2E')->after('hero_cta_text_color');

            // Nút phụ "Khám phá dịch vụ" — hoàn toàn mới.
            $table->json('hero_secondary_cta_text')->nullable()->after('hero_cta_border_color');
            $table->string('hero_secondary_cta_link')->nullable()->after('hero_secondary_cta_text');
            // Nullable, không default hex — FE tự fallback 'transparent' khi trống (nút viền, không nền).
            $table->string('hero_secondary_cta_background_color')->nullable()->after('hero_secondary_cta_link');
            $table->string('hero_secondary_cta_text_color')->default('#FFFFFF')->after('hero_secondary_cta_background_color');
            $table->string('hero_secondary_cta_border_color')->default('#FFFFFF')->after('hero_secondary_cta_text_color');
        });

        DB::table('home_page_contents')->update([
            'hero_secondary_cta_text' => json_encode(['vi' => 'Khám phá dịch vụ', 'en' => 'Explore services']),
            'hero_secondary_cta_link' => '/dich-vu/',
        ]);
    }

    public function down(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'hero_cta_background_color', 'hero_cta_text_color', 'hero_cta_border_color',
                'hero_secondary_cta_text', 'hero_secondary_cta_link', 'hero_secondary_cta_background_color',
                'hero_secondary_cta_text_color', 'hero_secondary_cta_border_color',
            ]);
        });
    }
};
