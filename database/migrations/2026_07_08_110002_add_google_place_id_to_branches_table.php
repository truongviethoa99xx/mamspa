<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('branches', function (Blueprint $table) {
            // ID địa điểm Google Maps (Place ID) — dùng để lấy review thật qua Places API.
            $table->string('google_place_id')->nullable()->after('lng');
        });
    }

    public function down(): void
    {
        Schema::table('branches', function (Blueprint $table) {
            $table->dropColumn('google_place_id');
        });
    }
};
