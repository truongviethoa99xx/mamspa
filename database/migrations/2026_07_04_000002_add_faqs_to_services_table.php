<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            // Câu hỏi thường gặp riêng của dịch vụ: [{question:{vi,en,...}, answer:{vi,en,...}}]
            $table->json('faqs')->nullable()->after('experience_images');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('faqs');
        });
    }
};
