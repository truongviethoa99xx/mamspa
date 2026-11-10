<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Dữ liệu trong cột `branches` đã được chuyển sang bảng menu_branch_pages ở migration
     * trước (2026_11_10_090000_create_menu_branch_pages_table) — mỗi chi nhánh giờ là 1 trang
     * riêng với URL /menu/{slug}/ thay vì gộp chung trong 1 trang Menu. `branches_visible` giữ
     * lại — vẫn dùng để bật/tắt khối danh sách link chi nhánh trên trang Menu chính.
     */
    public function up(): void
    {
        Schema::table('menu_page_contents', function (Blueprint $table) {
            $table->dropColumn('branches');
        });
    }

    public function down(): void
    {
        Schema::table('menu_page_contents', function (Blueprint $table) {
            $table->json('branches')->nullable();
        });
    }
};
