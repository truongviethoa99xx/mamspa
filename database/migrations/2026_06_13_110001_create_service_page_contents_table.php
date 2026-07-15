<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('happy_hours_title')->nullable();
            $table->text('happy_hours_desc')->nullable();
            $table->json('benefits')->nullable();
            $table->json('ideal_for')->nullable();
            $table->json('faqs')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_page_contents');
    }
};
