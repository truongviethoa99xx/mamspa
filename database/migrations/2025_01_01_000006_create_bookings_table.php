<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('code', 16)->unique()->comment('Public reference, e.g. MS24A8B3F1');
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('guest_name');
            $table->string('guest_phone');
            $table->string('guest_email')->nullable();
            $table->text('note')->nullable();
            $table->foreignId('branch_id')->constrained()->restrictOnDelete();
            $table->foreignId('service_id')->constrained()->restrictOnDelete();
            $table->date('date');
            $table->string('time_slot', 5)->comment('HH:MM');
            $table->enum('status', ['pending', 'confirmed', 'completed', 'cancelled'])->default('pending')->index();
            $table->unsignedBigInteger('total_price');
            $table->string('voucher_code', 32)->nullable();
            $table->enum('payment_method', ['card', 'cash', 'vnpay', 'momo'])->default('cash');
            $table->enum('payment_status', ['unpaid', 'paid', 'refunded'])->default('unpaid');
            $table->timestamps();
            $table->index(['branch_id', 'date', 'time_slot']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
