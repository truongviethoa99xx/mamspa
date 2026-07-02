<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            // [{title:{vi,en,...}, description:{vi,en,...}}]
            $table->json('benefits')->nullable()->after('steps');
            // [{image: 'path', alt: '...'}]
            $table->json('experience_images')->nullable()->after('benefits');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn(['benefits', 'experience_images']);
        });
    }
};
