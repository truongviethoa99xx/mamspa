<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            // Quy trình các bước: [{name:{vi,en,...}, description:{vi,en,...}, duration:int}]
            $table->json('steps')->nullable()->after('ingredients');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('steps');
        });
    }
};
