<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            // Banner "Về Mầm" chỉ cần 1 nút CTA, không cần nút phụ như trang chủ.
            $table->dropColumn([
                'hero_secondary_cta_text', 'hero_secondary_cta_link', 'hero_secondary_cta_background_color',
                'hero_secondary_cta_text_color', 'hero_secondary_cta_border_color',
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->json('hero_secondary_cta_text')->nullable()->after('hero_cta_border_color');
            $table->string('hero_secondary_cta_link')->nullable()->after('hero_secondary_cta_text');
            $table->string('hero_secondary_cta_background_color')->nullable()->after('hero_secondary_cta_link');
            $table->string('hero_secondary_cta_text_color')->default('#FFFFFF')->after('hero_secondary_cta_background_color');
            $table->string('hero_secondary_cta_border_color')->default('#FFFFFF')->after('hero_secondary_cta_text_color');
        });
    }
};
