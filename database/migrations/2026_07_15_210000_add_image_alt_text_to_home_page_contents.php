<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->json('hero_image_alt')->nullable()->after('hero_image');
            $table->json('story_image_alt')->nullable()->after('story_image');
        });

        DB::table('home_page_contents')->update([
            'hero_image_alt' => json_encode(['vi' => 'Không gian trị liệu Mầm Spa', 'en' => 'Mầm Spa treatment space']),
            'story_image_alt' => json_encode(['vi' => 'Không gian Mầm Spa', 'en' => 'Mầm Spa space']),
        ]);
    }

    public function down(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->dropColumn(['hero_image_alt', 'story_image_alt']);
        });
    }
};
