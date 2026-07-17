<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contact_page_contents', function (Blueprint $table) {
            $table->json('branches_items')->nullable()->after('branches_more_label');
        });
    }

    public function down(): void
    {
        Schema::table('contact_page_contents', function (Blueprint $table) {
            $table->dropColumn('branches_items');
        });
    }
};
