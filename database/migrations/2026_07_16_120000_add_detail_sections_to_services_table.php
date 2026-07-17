<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            // Đoạn giới thiệu phía trên khối điểm nổi bật: {vi,en,...} (quill)
            $table->json('pillars_heading')->nullable()->after('steps');
            // Điểm nổi bật chuyên môn: [{icon:string, title:{vi,en,...}}]
            $table->json('pillars')->nullable()->after('pillars_heading');
            // Mô tả vùng áp dụng chung của liệu trình: {vi,en,...} (quill)
            $table->json('treatment_scope_note')->nullable()->after('pillars');
            // Icon minh hoạ vùng áp dụng (không phải ảnh thật)
            $table->string('treatment_scope_image')->nullable()->after('treatment_scope_note');
            // Sản phẩm & dụng cụ sử dụng: [{icon:string, label:{vi,en,...}}]
            $table->json('tools_used')->nullable()->after('treatment_scope_image');
            // 04 tầng trải nghiệm: [{image, image_alt:{vi,en,...}, name:{vi,en,...}, description:{vi,en,...},
            //   relaxation_percent:int, acupressure_percent:int, intensity_label:string, duration_label:string, suitable_for:[string]}]
            $table->json('tiers')->nullable()->after('tools_used');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn([
                'pillars_heading', 'pillars', 'treatment_scope_note', 'treatment_scope_image', 'tools_used', 'tiers',
            ]);
        });
    }
};
