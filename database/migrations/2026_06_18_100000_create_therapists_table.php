<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('therapists')) {
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
        }

        DB::table('bookings')
            ->whereNotNull('therapist_id')
            ->update(['therapist_id' => null]);

        // FK cũ có thể không tồn tại (cột therapist_id tạo không kèm constrained),
        // nên chỉ drop khi thực sự có — tránh lỗi 1091 trên DB mới.
        $this->dropForeignIfExists('bookings', 'bookings_therapist_id_foreign');

        Schema::table('bookings', function (Blueprint $table) {
            $table->foreign('therapist_id')
                ->references('id')
                ->on('therapists')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        $this->dropForeignIfExists('bookings', 'bookings_therapist_id_foreign');

        Schema::dropIfExists('therapists');
    }

    /**
     * Drop một foreign key chỉ khi nó tồn tại (MySQL/MariaDB).
     */
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
