<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('booking_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained()->cascadeOnDelete();
            $table->foreignId('service_id')->constrained()->restrictOnDelete();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->unsignedBigInteger('price')->comment('Price snapshot at booking time');
            $table->timestamps();
            $table->index('booking_id');
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->string('contact_channel', 20)->nullable()->after('guest_email')
                ->comment('zalo | messenger | whatsapp | phone');
            $table->string('contact_value', 100)->nullable()->after('contact_channel');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['contact_channel', 'contact_value']);
        });

        Schema::dropIfExists('booking_items');
    }
};
