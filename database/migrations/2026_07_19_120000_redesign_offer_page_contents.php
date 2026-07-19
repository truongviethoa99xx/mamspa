<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Làm lại layout trang Ưu đãi theo bố cục mới (chi nhánh gộp ưu đãi riêng, dải thông
 * tin, banner CTA có ảnh) — thay cho bố cục cũ (quyền lợi hệ thống + lưới ưu đãi rời).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('offer_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'benefits_heading', 'benefits_subtitle', 'benefits', 'benefits_visible',
                'branch_offers_heading', 'branch_offers', 'branch_offers_visible',
                'closing_secondary_button_text', 'closing_secondary_button_url',
            ]);

            $table->renameColumn('closing_primary_button_text', 'closing_button_text');
            $table->renameColumn('closing_primary_button_url', 'closing_button_url');
        });

        Schema::table('offer_page_contents', function (Blueprint $table) {
            $table->json('branches_heading')->nullable()->after('hero_visible');
            $table->json('branches')->nullable()->after('branches_heading');
            $table->boolean('branches_visible')->default(true)->after('branches');

            $table->string('closing_image')->nullable()->after('closing_subtitle');
            $table->json('closing_image_alt')->nullable()->after('closing_image');
        });
    }

    public function down(): void
    {
        Schema::table('offer_page_contents', function (Blueprint $table) {
            $table->dropColumn(['branches_heading', 'branches', 'branches_visible', 'closing_image', 'closing_image_alt']);

            $table->renameColumn('closing_button_text', 'closing_primary_button_text');
            $table->renameColumn('closing_button_url', 'closing_primary_button_url');
        });

        Schema::table('offer_page_contents', function (Blueprint $table) {
            $table->json('benefits_heading')->nullable();
            $table->json('benefits_subtitle')->nullable();
            $table->json('benefits')->nullable();
            $table->boolean('benefits_visible')->default(true);

            $table->json('branch_offers_heading')->nullable();
            $table->json('branch_offers')->nullable();
            $table->boolean('branch_offers_visible')->default(true);

            $table->json('closing_secondary_button_text')->nullable();
            $table->string('closing_secondary_button_url')->nullable();
        });
    }
};
