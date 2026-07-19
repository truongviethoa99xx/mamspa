<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('customer_experience_page_contents', function (Blueprint $table) {
            $table->string('closing_image')->nullable()->after('closing_title');
            $table->json('closing_image_alt')->nullable()->after('closing_image');
        });
    }

    public function down(): void
    {
        Schema::table('customer_experience_page_contents', function (Blueprint $table) {
            $table->dropColumn(['closing_image', 'closing_image_alt']);
        });
    }
};
