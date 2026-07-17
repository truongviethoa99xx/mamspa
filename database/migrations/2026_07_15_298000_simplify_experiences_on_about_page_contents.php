<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            // "Customer Experiences" — bỏ số thứ tự.
            $table->dropColumn('experiences_eyebrow');
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->json('experiences_eyebrow')->nullable()->after('experiences_visible');
        });
    }
};
