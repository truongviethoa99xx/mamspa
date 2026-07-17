<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('service_page_contents', function (Blueprint $table) {
            // Banner Happy Hours không còn được render ở đâu (trang chi tiết dịch vụ
            // DichVuDetail.tsx đã bị gỡ và chưa dựng lại) — bỏ khỏi CMS cho tới khi cần lại.
            $table->dropColumn(['happy_hours_title', 'happy_hours_desc']);
        });
    }

    public function down(): void
    {
        Schema::table('service_page_contents', function (Blueprint $table) {
            $table->string('happy_hours_title')->nullable()->after('id');
            $table->text('happy_hours_desc')->nullable()->after('happy_hours_title');
        });
    }
};
