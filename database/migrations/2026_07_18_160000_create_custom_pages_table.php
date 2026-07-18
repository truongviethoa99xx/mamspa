<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('custom_pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->boolean('is_published')->default(false)->index();

            // Banner — cùng shape với hero_* của HomePageContent (tái dùng component Hero.tsx).
            $table->json('banner_title')->nullable();
            $table->json('banner_subtitle')->nullable();
            $table->string('banner_image')->nullable();
            $table->json('banner_image_alt')->nullable();
            $table->json('banner_cta_text')->nullable();
            $table->string('banner_cta_link')->nullable();
            $table->string('banner_cta_background_color')->nullable();
            $table->string('banner_cta_text_color')->nullable();
            $table->string('banner_cta_border_color')->nullable();
            $table->json('banner_secondary_cta_text')->nullable();
            $table->string('banner_secondary_cta_link')->nullable();
            $table->string('banner_secondary_cta_background_color')->nullable();
            $table->string('banner_secondary_cta_text_color')->nullable();
            $table->string('banner_secondary_cta_border_color')->nullable();
            $table->boolean('banner_visible')->default(true);

            // Body — HTML/CSS/JS admin tự nhập, render thẳng ở FE.
            $table->longText('body_html')->nullable();
            $table->longText('body_css')->nullable();
            $table->longText('body_js')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('custom_pages');
    }
};
