<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->json('name');
            $table->json('description')->nullable();
            $table->enum('category', ['massage', 'facial', 'head-spa', 'foot-spa', 'combo'])->index();
            $table->unsignedSmallInteger('duration')->comment('minutes');
            $table->unsignedBigInteger('price')->comment('VND');
            $table->json('ingredients')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('service_branch', function (Blueprint $table) {
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->primary(['service_id', 'branch_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_branch');
        Schema::dropIfExists('services');
    }
};
