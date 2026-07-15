<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('service_categories', function (Blueprint $table) {
            // Chỉ áp dụng cho danh mục cấp 1: bật/tắt hiển thị ở menu header, không ảnh hưởng trang danh mục.
            $table->boolean('show_in_menu')->default(true)->after('is_active');
        });
    }

    public function down(): void
    {
        Schema::table('service_categories', function (Blueprint $table) {
            $table->dropColumn('show_in_menu');
        });
    }
};
