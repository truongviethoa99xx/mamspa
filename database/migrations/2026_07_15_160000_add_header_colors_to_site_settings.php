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
            $table->string('header_background_color')->default('#F6F3EF')->after('logo_path');
            $table->string('header_text_color')->default('#2F3E2E')->after('header_background_color');
        });

        DB::table('site_settings')->update([
            'header_background_color' => '#F6F3EF',
            'header_text_color' => '#2F3E2E',
        ]);
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn(['header_background_color', 'header_text_color']);
        });
    }
};
