<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('service_categories', function (Blueprint $table) {
            // Mô tả đa ngôn ngữ: {"vi": "...", "en": "..."}
            $table->json('description')->nullable()->after('name');
            // Ảnh đại diện danh mục (path trên disk public)
            $table->string('image')->nullable()->after('description');
        });
    }

    public function down(): void
    {
        Schema::table('service_categories', function (Blueprint $table) {
            $table->dropColumn(['description', 'image']);
        });
    }
};
