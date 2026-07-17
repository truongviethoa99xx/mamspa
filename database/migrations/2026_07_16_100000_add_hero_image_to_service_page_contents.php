<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('service_page_contents', function (Blueprint $table) {
            $table->string('hero_image')->nullable()->after('hero_subtitle');
            $table->json('hero_image_alt')->nullable()->after('hero_image');
        });
    }

    public function down(): void
    {
        Schema::table('service_page_contents', function (Blueprint $table) {
            $table->dropColumn(['hero_image', 'hero_image_alt']);
        });
    }
};
