<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            // "Our People" — bỏ nhãn nhỏ, chỉ còn tiêu đề lớn.
            $table->dropColumn('people_heading');
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->json('people_heading')->nullable()->after('people_image');
        });
    }
};
