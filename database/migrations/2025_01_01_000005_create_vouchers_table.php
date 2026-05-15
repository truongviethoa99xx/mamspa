<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('code', 32)->unique();
            $table->enum('type', ['fixed', 'percent', 'service']);
            $table->unsignedBigInteger('value')->default(0);
            $table->unsignedBigInteger('min_order_value')->default(0);
            $table->dateTime('expires_at')->nullable();
            $table->dateTime('used_at')->nullable();
            $table->foreignId('used_by')->nullable()->constrained('users')->nullOnDelete();
            $table->enum('source', ['internal', 'klook', 'traveloka'])->default('internal');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->index(['type', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
