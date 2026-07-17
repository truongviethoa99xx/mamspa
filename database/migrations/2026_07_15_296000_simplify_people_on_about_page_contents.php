<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            // "Our People" — bỏ số thứ tự, gộp đoạn văn 2 vào "people_p1" (Quill).
            $table->dropColumn(['people_eyebrow', 'people_p2']);
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->json('people_eyebrow')->nullable()->after('people_image');
            $table->json('people_p2')->nullable()->after('people_p1');
        });
    }
};
