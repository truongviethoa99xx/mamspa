<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Ảnh 3 khối "Giá trị cốt lõi" trên trang Giới thiệu trước đây hardcode
 * (/images/about-value-{n}.jpg). Thêm cột để admin sửa được, khớp layout.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->string('value1_image')->nullable()->after('vision_image');
            $table->string('value2_image')->nullable()->after('value1_image');
            $table->string('value3_image')->nullable()->after('value2_image');
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->dropColumn(['value1_image', 'value2_image', 'value3_image']);
        });
    }
};
