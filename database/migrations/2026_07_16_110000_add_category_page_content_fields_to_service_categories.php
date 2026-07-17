<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('service_categories', function (Blueprint $table) {
            // Alt text đa ngôn ngữ cho ảnh đại diện (dùng làm ảnh banner ở trang danh mục).
            $table->json('image_alt')->nullable()->after('image');

            // Khối "Chăm sóc theo nhu cầu, không theo khuôn mẫu" — đoạn giới thiệu + 3 điểm nổi bật (pillars).
            $table->json('intro_heading')->nullable()->after('ideal_for');
            $table->json('intro_body')->nullable()->after('intro_heading');
            $table->string('intro_image')->nullable()->after('intro_body');
            $table->json('intro_image_alt')->nullable()->after('intro_image');
            // [{icon: 'Leaf', title: {vi,en,...}}]
            $table->json('pillars')->nullable()->after('intro_image_alt');

            // Khối trích dẫn lớn giữa trang.
            $table->json('quote')->nullable()->after('pillars');

            // Khối "Mỗi tầng trải nghiệm được thiết kế khác nhau về" — checklist + ảnh minh hoạ.
            $table->json('experience_note_title')->nullable()->after('quote');
            // [{text: {vi,en,...}}]
            $table->json('experience_checklist')->nullable()->after('experience_note_title');
            $table->json('experience_note_body')->nullable()->after('experience_checklist');
            $table->string('experience_note_image')->nullable()->after('experience_note_body');
            $table->json('experience_note_image_alt')->nullable()->after('experience_note_image');
        });
    }

    public function down(): void
    {
        Schema::table('service_categories', function (Blueprint $table) {
            $table->dropColumn([
                'image_alt',
                'intro_heading', 'intro_body', 'intro_image', 'intro_image_alt', 'pillars',
                'quote',
                'experience_note_title', 'experience_checklist', 'experience_note_body',
                'experience_note_image', 'experience_note_image_alt',
            ]);
        });
    }
};
