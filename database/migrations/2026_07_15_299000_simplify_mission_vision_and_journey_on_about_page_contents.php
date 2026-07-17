<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            // "Our Journey" — bỏ số thứ tự.
            $table->dropColumn('journey_eyebrow');
            // "Mission & Vision" — thêm tiêu đề khối lớn (trước đây hardcode, không sửa được từ CMS).
            $table->json('mission_vision_title')->nullable()->after('mission_vision_visible');
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->json('journey_eyebrow')->nullable()->after('journey_visible');
            $table->dropColumn('mission_vision_title');
        });
    }
};
