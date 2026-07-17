<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->json('story_image_alt')->nullable()->after('story_image');
            $table->json('philosophy_image_alt')->nullable()->after('philosophy_image');
            $table->json('approach_image_alt')->nullable()->after('approach_image');
            $table->json('people_image_alt')->nullable()->after('people_image');
            $table->json('invitation_image_alt')->nullable()->after('invitation_image');
        });
    }

    public function down(): void
    {
        Schema::table('about_page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'story_image_alt',
                'philosophy_image_alt',
                'approach_image_alt',
                'people_image_alt',
                'invitation_image_alt',
            ]);
        });
    }
};
