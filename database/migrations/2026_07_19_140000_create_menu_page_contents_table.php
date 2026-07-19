<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menu_page_contents', function (Blueprint $table) {
            $table->id();

            // Xuất bản
            $table->string('slug')->unique();
            $table->boolean('is_published')->default(true);

            // 1 · Hero
            $table->json('hero_kicker')->nullable();
            $table->json('hero_title')->nullable();
            $table->json('hero_subtitle')->nullable();
            $table->string('hero_image')->nullable();
            $table->json('hero_image_alt')->nullable();
            $table->boolean('hero_visible')->default(true);

            // 2 · Giới thiệu
            $table->json('intro_title')->nullable();
            $table->json('intro_note')->nullable();
            $table->boolean('intro_visible')->default(true);

            // 3 · Chi nhánh + menu PDF theo ngôn ngữ
            $table->json('branches')->nullable();
            $table->boolean('branches_visible')->default(true);

            // 4 · Dải liên hệ
            $table->json('contact_title')->nullable();
            $table->json('contact_text')->nullable();
            $table->string('contact_image')->nullable();
            $table->json('contact_image_alt')->nullable();
            $table->boolean('contact_visible')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu_page_contents');
    }
};
