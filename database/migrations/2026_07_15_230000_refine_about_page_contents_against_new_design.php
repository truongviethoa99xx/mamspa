<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Soi lại ảnh thiết kế "Về Mầm" mới lần nữa, phát hiện vài chỗ lệch với
 * migration trước (2026_07_15_220000):
 * - Thanh liên hệ (phone/address/website) không xuất hiện trong thiết kế mới → bỏ.
 * - "Our Philosophy" và "Our People" có 3 tầng chữ (số · nhãn nhỏ · tiêu đề lớn),
 *   trước đó chỉ có 2 field nên thiếu nhãn nhỏ ("Our Philosophy" / "Our People").
 * - "Our Approach" và "A Gentle Invitation" có thêm câu kết ngắn sau đoạn văn chính.
 * - "4 Healing Journeys" thiếu field cho tiêu đề khối hiển thị phía trên 4 thẻ.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->dropColumn(['contact_phone', 'contact_address', 'contact_website', 'contact_bar_visible']);
        });

        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->json('features_eyebrow')->nullable()->after('features_visible');
            $table->json('philosophy_heading')->nullable()->after('philosophy_eyebrow');
            $table->json('approach_p2')->nullable()->after('approach_p1');
            $table->json('people_heading')->nullable()->after('people_eyebrow');
            $table->json('invitation_p2')->nullable()->after('invitation_p1');
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'features_eyebrow', 'philosophy_heading', 'approach_p2', 'people_heading', 'invitation_p2',
            ]);
        });

        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->string('contact_phone')->nullable();
            $table->string('contact_address')->nullable();
            $table->string('contact_website')->nullable();
            $table->boolean('contact_bar_visible')->default(true);
        });
    }
};
