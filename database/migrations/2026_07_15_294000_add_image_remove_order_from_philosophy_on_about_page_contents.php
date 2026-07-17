<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            // "Our Philosophy" — thêm ảnh nền (chiều cao section vẫn co giãn theo nội dung),
            // bỏ số thứ tự, dồn còn 1 đoạn văn (Quill, dùng chung "philosophy_p1").
            $table->string('philosophy_image')->nullable()->after('philosophy_p1');
            $table->dropColumn(['philosophy_eyebrow', 'philosophy_p2']);
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->dropColumn('philosophy_image');
            $table->json('philosophy_eyebrow')->nullable()->after('philosophy_visible');
            $table->json('philosophy_p2')->nullable()->after('philosophy_p1');
        });
    }
};
