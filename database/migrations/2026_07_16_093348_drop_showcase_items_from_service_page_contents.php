<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('service_page_contents', function (Blueprint $table) {
            // 4 khối dịch vụ nổi bật giờ lấy trực tiếp từ danh mục dịch vụ cấp 1
            // (App\Models\ServiceCategory, quản lý ở /admin/service-categories) thay vì nhập tay ở đây.
            $table->dropColumn('showcase_items');
        });
    }

    public function down(): void
    {
        Schema::table('service_page_contents', function (Blueprint $table) {
            $table->json('showcase_items')->nullable()->after('showcase_visible');
        });
    }
};
