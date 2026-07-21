<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('closing_image')->nullable()->after('tiers_subtitle');
            $table->json('closing_image_alt')->nullable()->after('closing_image');
            $table->json('closing_heading')->nullable()->after('closing_image_alt');
            $table->json('closing_body')->nullable()->after('closing_heading');
            $table->json('closing_cta_text')->nullable()->after('closing_body');
            $table->string('closing_cta_link')->nullable()->after('closing_cta_text');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn([
                'closing_image', 'closing_image_alt', 'closing_heading',
                'closing_body', 'closing_cta_text', 'closing_cta_link',
            ]);
        });
    }
};
