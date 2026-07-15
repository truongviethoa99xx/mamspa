<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone')->nullable()->index();
            $table->string('email')->nullable()->index();
            $table->string('preferred_lang', 10)->default('vi');
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->foreignId('customer_id')->nullable()->after('user_id')->constrained()->nullOnDelete();
        });

        DB::table('bookings')
            ->select('user_id', 'guest_name', 'guest_phone', 'guest_email')
            ->orderBy('id')
            ->get()
            ->each(function (object $booking): void {
                $customer = DB::table('customers')
                    ->when($booking->guest_email, fn ($query) => $query->where('email', $booking->guest_email))
                    ->when(! $booking->guest_email, fn ($query) => $query->where('phone', $booking->guest_phone))
                    ->first();

                $customerId = $customer?->id ?? DB::table('customers')->insertGetId([
                    'name' => $booking->guest_name,
                    'phone' => $booking->guest_phone,
                    'email' => $booking->guest_email,
                    'preferred_lang' => 'vi',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                DB::table('bookings')
                    ->where('guest_phone', $booking->guest_phone)
                    ->when($booking->guest_email, fn ($query) => $query->where('guest_email', $booking->guest_email))
                    ->when(! $booking->guest_email, fn ($query) => $query->whereNull('guest_email'))
                    ->update(['customer_id' => $customerId]);
            });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropConstrainedForeignId('customer_id');
        });

        Schema::dropIfExists('customers');
    }
};
