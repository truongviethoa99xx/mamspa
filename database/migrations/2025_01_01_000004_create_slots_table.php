<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->time('start_time');
            $table->time('end_time');
            $table->unsignedTinyInteger('capacity')->default(2);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->index(['branch_id', 'start_time']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('slots');
    }
};
