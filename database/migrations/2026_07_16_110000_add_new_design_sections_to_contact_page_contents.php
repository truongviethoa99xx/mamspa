<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contact_page_contents', function (Blueprint $table) {
            // 1 · Banner đầu trang (Hero)
            $table->json('hero_subtitle')->nullable()->after('heading');
            $table->string('hero_image')->nullable()->after('hero_subtitle');
            $table->json('hero_image_alt')->nullable()->after('hero_image');
            $table->boolean('hero_visible')->default(true)->after('hero_image_alt');

            // 2 · Hệ thống chi nhánh
            $table->json('branches_title')->nullable()->after('hero_visible');
            $table->json('branches_intro')->nullable()->after('branches_title');
            $table->json('branches_directions_label')->nullable()->after('branches_intro');
            $table->json('branches_more_label')->nullable()->after('branches_directions_label');
            $table->boolean('branches_visible')->default(true)->after('branches_more_label');

            // 3 · Banner ngang link sang trang Giới thiệu
            $table->json('about_banner_text')->nullable()->after('branches_visible');
            $table->json('about_banner_link_text')->nullable()->after('about_banner_text');
            $table->string('about_banner_link_url')->nullable()->after('about_banner_link_text');
            $table->boolean('about_banner_visible')->default(true)->after('about_banner_link_url');

            // 4 · "Đặt lịch & Liên hệ" (thông tin) + form "Gửi cho chúng tôi"
            $table->json('info_title')->nullable()->after('about_banner_visible');
            $table->json('info_intro')->nullable()->after('info_title');
            $table->string('hotline')->nullable()->after('info_intro');
            $table->json('hotline_note')->nullable()->after('hotline');
            $table->string('zalo')->nullable()->after('hotline_note');
            $table->json('zalo_note')->nullable()->after('zalo');
            $table->json('email_note')->nullable()->after('zalo_note');
            $table->string('instagram')->nullable()->after('email_note');
            $table->json('instagram_note')->nullable()->after('instagram');
            $table->json('form_title')->nullable()->after('instagram_note');
            $table->json('form_intro')->nullable()->after('form_title');
            $table->json('form_privacy_note')->nullable()->after('form_intro');
            $table->boolean('contact_form_visible')->default(true)->after('form_privacy_note');

            // 5 · Banner CTA đóng trang
            $table->json('closing_title')->nullable()->after('contact_form_visible');
            $table->string('closing_image')->nullable()->after('closing_title');
            $table->json('closing_image_alt')->nullable()->after('closing_image');
            $table->json('closing_button_text')->nullable()->after('closing_image_alt');
            $table->string('closing_button_url')->nullable()->after('closing_button_text');
            $table->boolean('closing_visible')->default(true)->after('closing_button_url');

            // 6 · Dải icon cam kết cuối trang
            $table->json('commitments')->nullable()->after('closing_visible');
            $table->boolean('commitments_visible')->default(true)->after('commitments');
        });
    }

    public function down(): void
    {
        Schema::table('contact_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'hero_subtitle', 'hero_image', 'hero_image_alt', 'hero_visible',
                'branches_title', 'branches_intro', 'branches_directions_label', 'branches_more_label', 'branches_visible',
                'about_banner_text', 'about_banner_link_text', 'about_banner_link_url', 'about_banner_visible',
                'info_title', 'info_intro', 'hotline', 'hotline_note', 'zalo', 'zalo_note', 'email_note',
                'instagram', 'instagram_note', 'form_title', 'form_intro', 'form_privacy_note', 'contact_form_visible',
                'closing_title', 'closing_image', 'closing_image_alt', 'closing_button_text', 'closing_button_url', 'closing_visible',
                'commitments', 'commitments_visible',
            ]);
        });
    }
};
