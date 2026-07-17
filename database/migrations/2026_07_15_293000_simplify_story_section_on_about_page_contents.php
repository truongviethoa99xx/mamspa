<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            // "Our Story" chỉ còn 1 đoạn văn (Quill, dồn chung "story_p1") — bỏ số thứ tự & đoạn văn 2.
            $table->dropColumn(['story_eyebrow', 'story_p2']);
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->json('story_eyebrow')->nullable()->after('story_image');
            $table->json('story_p2')->nullable()->after('story_p1');
        });
    }
};
