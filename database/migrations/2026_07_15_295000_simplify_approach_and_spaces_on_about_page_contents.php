<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            // "Our Approach" — bỏ số thứ tự và câu kết ngắn, chỉ còn "approach_p1" (Quill).
            $table->dropColumn(['approach_eyebrow', 'approach_p2']);
            // "Our Spaces" — bỏ số thứ tự.
            $table->dropColumn('spaces_eyebrow');
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->json('approach_eyebrow')->nullable()->after('approach_visible');
            $table->json('approach_p2')->nullable()->after('approach_p1');
            $table->json('spaces_eyebrow')->nullable()->after('spaces_visible');
        });
    }
};
