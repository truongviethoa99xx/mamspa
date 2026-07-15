<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('contact_phone')->nullable();
            $table->string('contact_address')->nullable();
            $table->string('contact_website')->nullable();
            $table->string('hero_image')->nullable();
            $table->string('story_image')->nullable();
            $table->string('vision_image')->nullable();
            $table->json('team')->nullable();
            $table->json('instagram_handles')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_page_contents');
    }
};
