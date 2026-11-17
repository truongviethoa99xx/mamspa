<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('promo_popups', function (Blueprint $table) {
            $table->id();
            // Tên gọi nội bộ để admin phân biệt các popup trong danh sách (không hiện ra site).
            $table->string('name');
            $table->json('title')->nullable();
            $table->json('description')->nullable();
            $table->json('button_text')->nullable();
            $table->string('button_url')->nullable();
            $table->string('button_background', 20)->default('#556B3F');
            $table->string('button_text_color', 20)->default('#FFFFFF');
            $table->string('image')->nullable();
            // center | top-left | top-right | bottom-left | bottom-right
            $table->string('position', 20)->default('center');
            // Số giây chờ sau khi tải trang mới hiện popup.
            $table->unsignedSmallInteger('delay_seconds')->default(3);
            // Khung thời gian hiển thị — null = không giới hạn đầu/cuối.
            $table->dateTime('starts_at')->nullable();
            $table->dateTime('ends_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('promo_popups');
    }
};
