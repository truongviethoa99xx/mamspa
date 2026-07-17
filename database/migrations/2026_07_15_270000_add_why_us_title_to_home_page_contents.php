<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            // "WHY MẦM" — nhãn nhỏ phía trên khối 5 điểm nổi bật.
            $table->json('why_us_title')->nullable()->after('spaces_visible');
        });

        DB::table('home_page_contents')->update([
            'why_us_title' => json_encode(['vi' => 'Vì sao chọn Mầm', 'en' => 'Why Mầm'], JSON_UNESCAPED_UNICODE),
        ]);
    }

    public function down(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->dropColumn(['why_us_title']);
        });
    }
};
