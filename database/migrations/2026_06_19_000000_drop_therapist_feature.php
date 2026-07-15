<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Gỡ hoàn toàn tính năng kỹ thuật viên (Therapist).
 *
 * Idempotent: chỉ xoá khi đối tượng còn tồn tại, nên chạy được trên cả
 * DB đã lỡ tạo therapists/therapist_id lẫn DB hoàn toàn mới (no-op).
 */
return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('bookings', 'therapist_id')) {
            $this->dropForeignIfExists('bookings', 'bookings_therapist_id_foreign');

            Schema::table('bookings', function (Blueprint $table) {
                $table->dropColumn('therapist_id');
            });
        }

        Schema::dropIfExists('therapists');
    }

    public function down(): void
    {
        // Tính năng kỹ thuật viên đã gỡ bỏ — không khôi phục.
    }

    private function dropForeignIfExists(string $table, string $constraint): void
    {
        $exists = DB::table('information_schema.TABLE_CONSTRAINTS')
            ->where('CONSTRAINT_SCHEMA', DB::getDatabaseName())
            ->where('TABLE_NAME', $table)
            ->where('CONSTRAINT_NAME', $constraint)
            ->where('CONSTRAINT_TYPE', 'FOREIGN KEY')
            ->exists();

        if ($exists) {
            DB::statement("ALTER TABLE `{$table}` DROP FOREIGN KEY `{$constraint}`");
        }
    }
};
