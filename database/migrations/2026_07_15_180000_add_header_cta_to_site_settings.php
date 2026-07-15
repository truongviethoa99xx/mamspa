<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->string('header_cta_text')->default('Đặt lịch ngay')->after('header_transparent');
            $table->string('header_cta_background_color')->default('#2F3E2E')->after('header_cta_text');
            $table->string('header_cta_text_color')->default('#FFFFFF')->after('header_cta_background_color');
        });

        DB::table('site_settings')->update([
            'header_cta_text' => 'Đặt lịch ngay',
            'header_cta_background_color' => '#2F3E2E',
            'header_cta_text_color' => '#FFFFFF',
        ]);
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn(['header_cta_text', 'header_cta_background_color', 'header_cta_text_color']);
        });
    }
};
