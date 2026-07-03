<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->boolean('hero_visible')->default(true)->after('hero_image');
            $table->boolean('featured_services_visible')->default(true)->after('service_list_title');
            $table->boolean('testimonials_visible')->default(true)->after('testimonials');
        });
    }

    public function down(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->dropColumn(['hero_visible', 'featured_services_visible', 'testimonials_visible']);
        });
    }
};
