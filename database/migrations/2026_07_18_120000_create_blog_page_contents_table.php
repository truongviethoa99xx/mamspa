<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_page_contents', function (Blueprint $table) {
            $table->id();

            // Hero — banner đầu trang Blog.
            $table->json('hero_title')->nullable();
            $table->json('hero_subtitle')->nullable();
            $table->string('hero_image')->nullable();
            $table->json('hero_image_alt')->nullable();
            $table->boolean('hero_visible')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_page_contents');
    }
};
