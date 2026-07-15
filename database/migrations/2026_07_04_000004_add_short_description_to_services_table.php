<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            // Mô tả ngắn (translatable {vi,en}) — hiển thị trên thẻ dịch vụ thay cho mô tả đầy đủ
            $table->json('short_description')->nullable()->after('name');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('short_description');
        });
    }
};
