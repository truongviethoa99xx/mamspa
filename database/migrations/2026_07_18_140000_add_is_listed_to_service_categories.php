<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('service_categories', function (Blueprint $table) {
            // Khác với is_active (ẩn hẳn, route 404): tắt is_listed chỉ ẩn danh mục khỏi
            // các danh sách/menu công khai (trang chủ, trang dịch vụ, danh mục liên quan...),
            // trang chi tiết danh mục vẫn truy cập được nếu khách gõ thẳng URL.
            $table->boolean('is_listed')->default(true)->after('is_active');
        });
    }

    public function down(): void
    {
        Schema::table('service_categories', function (Blueprint $table) {
            $table->dropColumn('is_listed');
        });
    }
};
