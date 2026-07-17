<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            // Tiêu đề lớn, căn giữa, tách riêng khỏi nhãn nhỏ "service_list_title".
            $table->json('featured_services_heading')->nullable()->after('service_list_title');
        });

        DB::table('home_page_contents')->update([
            'featured_services_heading' => json_encode([
                'vi' => '<p>Dịch vụ nổi bật</p>',
                'en' => '<p>Featured Services</p>',
            ], JSON_UNESCAPED_UNICODE),
        ]);
    }

    public function down(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->dropColumn(['featured_services_heading']);
        });
    }
};
