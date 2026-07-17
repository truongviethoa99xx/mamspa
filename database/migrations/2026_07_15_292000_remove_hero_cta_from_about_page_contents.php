<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            // Banner "Về Mầm" không cần nút CTA nào cả.
            $table->dropColumn([
                'hero_cta_text', 'hero_cta_link', 'hero_cta_background_color', 'hero_cta_text_color', 'hero_cta_border_color',
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->json('hero_cta_text')->nullable()->after('hero_subtitle');
            $table->string('hero_cta_link')->nullable()->after('hero_cta_text');
            $table->string('hero_cta_background_color')->default('#2F3E2E')->after('hero_cta_link');
            $table->string('hero_cta_text_color')->default('#FFFFFF')->after('hero_cta_background_color');
            $table->string('hero_cta_border_color')->default('#2F3E2E')->after('hero_cta_text_color');
        });
    }
};
