<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // NULL = không giới hạn (mặc định cho editor hiện có, tránh mất quyền đột ngột
            // khi tính năng này ra mắt). Mảng = danh sách EditablePage được phép sửa.
            $table->json('editable_pages')->nullable()->after('phone');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('editable_pages');
        });
    }
};
