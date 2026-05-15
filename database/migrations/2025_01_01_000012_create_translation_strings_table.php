<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('translation_strings', function (Blueprint $table) {
            $table->id();
            $table->string('group', 64)->index()->comment('e.g. nav, home, footer, common');
            $table->string('key', 191);
            $table->json('values')->comment('{"vi": "...", "en": "..."}');
            $table->boolean('is_auto_translated')->default(false);
            $table->timestamps();
            $table->unique(['group', 'key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('translation_strings');
    }
};
