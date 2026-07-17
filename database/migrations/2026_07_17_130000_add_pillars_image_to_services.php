<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('pillars_image')->nullable()->after('pillars');
            $table->json('pillars_image_alt')->nullable()->after('pillars_image');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn(['pillars_image', 'pillars_image_alt']);
        });
    }
};
