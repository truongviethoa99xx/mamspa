<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('service_page_contents', function (Blueprint $table) {
            $table->json('closing_image_alt')->nullable()->after('closing_image');
        });
    }

    public function down(): void
    {
        Schema::table('service_page_contents', function (Blueprint $table) {
            $table->dropColumn('closing_image_alt');
        });
    }
};
