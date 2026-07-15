<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

/**
 * Gỡ CMS Page/Block: trang chủ chuyển sang layout tĩnh nên không còn cần
 * hai bảng này. An toàn với cả DB mới (dropIfExists là no-op) lẫn DB đã chạy.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('blocks');
        Schema::dropIfExists('pages');
    }

    public function down(): void
    {
        // Không phục hồi — CMS đã được gỡ khỏi codebase.
    }
};
