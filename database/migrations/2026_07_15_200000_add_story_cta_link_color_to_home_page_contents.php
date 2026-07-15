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
            $table->string('story_cta_link')->nullable()->after('story_cta_text');
            $table->string('story_cta_text_color')->default('#2F3E2E')->after('story_cta_link');
        });

        DB::table('home_page_contents')->update([
            'story_cta_link' => '/gioi-thieu/',
        ]);
    }

    public function down(): void
    {
        Schema::table('home_page_contents', function (Blueprint $table) {
            $table->dropColumn(['story_cta_link', 'story_cta_text_color']);
        });
    }
};
