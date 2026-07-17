<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('service_page_contents', function (Blueprint $table) {
            // Trang /dich-vu chuyển sang thiết kế mới: hero + 4 khối dịch vụ nổi bật (showcase)
            // + banner CTA khép lại trang, thay cho ô tìm kiếm/danh mục/massage/head-spa/other-care cũ.
            $table->dropColumn([
                'listing_categories', 'massage_cards', 'head_spa_cards', 'other_care_items',
                'massage_eyebrow', 'head_spa_eyebrow', 'head_spa_title',
                'other_care_eyebrow', 'other_care_title',
            ]);
        });

        Schema::table('service_page_contents', function (Blueprint $table) {
            $table->boolean('hero_visible')->default(true)->after('faqs');
            $table->json('hero_title')->nullable()->after('hero_visible');
            $table->json('hero_subtitle')->nullable()->after('hero_title');

            $table->boolean('showcase_visible')->default(true)->after('hero_subtitle');
            $table->json('showcase_items')->nullable()->after('showcase_visible');

            $table->boolean('closing_visible')->default(true)->after('showcase_items');
            $table->string('closing_image')->nullable()->after('closing_visible');
            $table->json('closing_heading')->nullable()->after('closing_image');
            $table->json('closing_body')->nullable()->after('closing_heading');
            $table->json('closing_cta_text')->nullable()->after('closing_body');
            $table->string('closing_cta_link')->nullable()->after('closing_cta_text');
        });
    }

    public function down(): void
    {
        Schema::table('service_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'hero_visible', 'hero_title', 'hero_subtitle',
                'showcase_visible', 'showcase_items',
                'closing_visible', 'closing_image', 'closing_heading', 'closing_body', 'closing_cta_text', 'closing_cta_link',
            ]);
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
    }
};
