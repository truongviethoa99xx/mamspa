<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            // "A Gentle Invitation" — bỏ số thứ tự.
            $table->dropColumn('invitation_eyebrow');
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->json('invitation_eyebrow')->nullable()->after('invitation_image_alt');
        });
    }
};
