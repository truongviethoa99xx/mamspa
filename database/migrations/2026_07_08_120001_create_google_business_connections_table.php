<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Bảng đơn dòng (singleton) — lưu kết nối OAuth tới Google Business Profile
     * của doanh nghiệp (dùng chung cho mọi chi nhánh), khác với đăng nhập khách hàng.
     */
    public function up(): void
    {
        Schema::create('google_business_connections', function (Blueprint $table) {
            $table->id();
            $table->string('account_id')->nullable();
            $table->string('account_name')->nullable();
            $table->text('access_token')->nullable();
            $table->text('refresh_token')->nullable();
            $table->timestamp('token_expires_at')->nullable();
            $table->foreignId('connected_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('google_business_connections');
    }
};
