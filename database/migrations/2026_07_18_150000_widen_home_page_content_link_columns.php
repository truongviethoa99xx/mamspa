<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->text('reviews_google_link')->nullable()->change();
            $table->text('reviews_tripadvisor_link')->nullable()->change();
            $table->text('testimonials_cta_link')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->string('reviews_google_link')->nullable()->change();
            $table->string('reviews_tripadvisor_link')->nullable()->change();
            $table->string('testimonials_cta_link')->nullable()->change();
        });
    }
};
