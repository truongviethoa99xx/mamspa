<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('therapists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone')->nullable()->index();
            $table->string('email')->nullable()->index();
            $table->text('specialties')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });

        DB::table('bookings')
            ->whereNotNull('therapist_id')
            ->update(['therapist_id' => null]);

        Schema::table('bookings', function (Blueprint $table) {
            try {
                $table->dropForeign(['therapist_id']);
            } catch (Throwable) {
                //
            }

            $table->foreign('therapist_id')
                ->references('id')
                ->on('therapists')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            try {
                $table->dropForeign(['therapist_id']);
            } catch (Throwable) {
                //
            }

            $table->foreign('therapist_id')
                ->references('id')
                ->on('users')
                ->nullOnDelete();
        });

        Schema::dropIfExists('therapists');
    }
};
