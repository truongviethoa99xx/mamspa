<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            // "Our Spaces" — danh sách thẻ không gian/chi nhánh, admin quản lý tự do
            // (mặc định 2 thẻ theo 2 chi nhánh hiện có, có thể thêm/bớt). 1 hàng tối đa
            // 2 thẻ; nếu tổng số lẻ, thẻ cuối chiếm full width.
            $table->json('spaces_title')->nullable()->after('art_banner_cta_text_color');
            $table->json('spaces_items')->nullable()->after('spaces_title');
            $table->boolean('spaces_visible')->default(true)->after('spaces_items');
        });

        // `branches` table is dropped by a later migration — query it directly
        // instead of through the (now removed) Branch model so this migration
        // stays runnable on a fresh database.
        $items = Schema::hasTable('branches')
            ? DB::table('branches')->where('is_active', true)->get()->map(fn ($b) => [
                'image' => null,
                'title' => json_decode($b->name, true),
                'description' => ['vi' => $b->address ?? '', 'en' => $b->address ?? ''],
                'link_text' => ['vi' => 'Khám phá không gian', 'en' => 'Explore this space'],
                'link_url' => "/chi-nhanh/{$b->slug}",
            ])->values()->all()
            : [];

        DB::table('home_page_contents')->update([
            'spaces_title' => json_encode(['vi' => 'Không gian của chúng tôi', 'en' => 'Our spaces'], JSON_UNESCAPED_UNICODE),
            'spaces_items' => json_encode($items, JSON_UNESCAPED_UNICODE),
        ]);
    }

    public function down(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->dropColumn(['spaces_title', 'spaces_items', 'spaces_visible']);
        });
    }
};
