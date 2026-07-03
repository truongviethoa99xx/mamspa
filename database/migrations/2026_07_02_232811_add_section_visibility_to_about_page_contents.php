<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->boolean('hero_visible')->default(true)->after('hero_retreat');
            $table->boolean('features_visible')->default(true)->after('features');
            $table->boolean('contact_bar_visible')->default(true)->after('contact_website');
            $table->boolean('story_visible')->default(true)->after('story_p2');
            $table->boolean('vision_visible')->default(true)->after('vision_bullets');
            $table->boolean('values_visible')->default(true)->after('value3_desc');
            $table->boolean('team_visible')->default(true)->after('team_title');
            $table->boolean('reviews_visible')->default(true)->after('review_quote_author');
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'hero_visible', 'features_visible', 'contact_bar_visible',
                'story_visible', 'vision_visible', 'values_visible',
                'team_visible', 'reviews_visible',
            ]);
        });
    }
};
