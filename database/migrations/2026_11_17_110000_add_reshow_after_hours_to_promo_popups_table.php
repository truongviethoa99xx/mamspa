<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('promo_popups', function (Blueprint $table) {
            // Sau khi khách đóng popup, bao nhiêu giờ sau mới hiện lại cho khách đó (0 = hiện lại ở phiên truy cập kế tiếp).
            $table->unsignedInteger('reshow_after_hours')->default(24)->after('delay_seconds');
        });
    }

    public function down(): void
    {
        Schema::table('promo_popups', function (Blueprint $table) {
            $table->dropColumn('reshow_after_hours');
        });
    }
};
