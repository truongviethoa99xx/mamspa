<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('offer_page_contents', function (Blueprint $table) {
            $table->id();

            // 1 · Hero
            $table->json('hero_title')->nullable();
            $table->json('hero_subtitle')->nullable();
            $table->json('hero_body')->nullable();
            $table->string('hero_image')->nullable();
            $table->json('hero_image_alt')->nullable();
            $table->boolean('hero_visible')->default(true);

            // 2 · Quyền lợi toàn hệ thống
            $table->json('benefits_heading')->nullable();
            $table->json('benefits_subtitle')->nullable();
            $table->json('benefits')->nullable();
            $table->boolean('benefits_visible')->default(true);

            // 3 · Ưu đãi theo từng chi nhánh
            $table->json('branch_offers_heading')->nullable();
            $table->json('branch_offers')->nullable();
            $table->boolean('branch_offers_visible')->default(true);

            // 4 · Khối ghi chú nhỏ
            $table->json('note_text')->nullable();
            $table->string('note_image')->nullable();
            $table->json('note_image_alt')->nullable();
            $table->boolean('note_visible')->default(true);

            // 5 · Banner CTA đóng trang
            $table->json('closing_title')->nullable();
            $table->json('closing_subtitle')->nullable();
            $table->json('closing_primary_button_text')->nullable();
            $table->string('closing_primary_button_url')->nullable();
            $table->json('closing_secondary_button_text')->nullable();
            $table->string('closing_secondary_button_url')->nullable();
            $table->boolean('closing_visible')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offer_page_contents');
    }
};
