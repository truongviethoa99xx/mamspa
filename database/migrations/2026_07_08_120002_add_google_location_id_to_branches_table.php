<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('branches', function (Blueprint $table) {
            // Resource name của địa điểm trong Google Business Profile, vd "locations/987654321".
            // Dùng để đồng bộ review qua mybusiness.googleapis.com — khác namespace với google_place_id (Places API).
            $table->string('google_location_id')->nullable()->after('google_place_id');
        });
    }

    public function down(): void
    {
        Schema::table('branches', function (Blueprint $table) {
            $table->dropColumn('google_location_id');
        });
    }
};
