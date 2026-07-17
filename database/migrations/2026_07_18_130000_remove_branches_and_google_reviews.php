<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('google_reviews');
        Schema::dropIfExists('google_business_connections');
        Schema::dropIfExists('slots');
        Schema::dropIfExists('service_branch');

        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['branch_id']);
            $table->dropIndex(['branch_id', 'date', 'time_slot']);
            $table->dropColumn('branch_id');
            $table->index(['date', 'time_slot']);
        });

        Schema::dropIfExists('branches');
    }

    public function down(): void
    {
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->json('name');
            $table->string('address');
            $table->string('phone');
            $table->string('open_hours')->default('09:00 - 21:00');
            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();
            $table->boolean('is_active')->default(true);
            $table->json('page_content')->nullable();
            $table->string('google_place_id')->nullable();
            $table->string('google_location_id')->nullable();
            $table->timestamps();
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->dropIndex(['date', 'time_slot']);
            $table->foreignId('branch_id')->after('note')->nullable()->constrained()->restrictOnDelete();
            $table->index(['branch_id', 'date', 'time_slot']);
        });

        Schema::create('service_branch', function (Blueprint $table) {
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->primary(['service_id', 'branch_id']);
        });

        Schema::create('slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->time('start_time');
            $table->time('end_time');
            $table->unsignedTinyInteger('capacity')->default(2);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->index(['branch_id', 'start_time']);
        });

        Schema::create('google_business_connections', function (Blueprint $table) {
            $table->id();
            $table->string('account_id')->nullable();
            $table->string('account_name')->nullable();
            $table->text('access_token')->nullable();
            $table->text('refresh_token')->nullable();
            $table->timestamp('token_expires_at')->nullable();
            $table->foreignId('connected_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('google_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->string('google_review_id')->unique();
            $table->string('reviewer_name');
            $table->string('reviewer_photo_url')->nullable();
            $table->unsignedTinyInteger('rating');
            $table->text('comment')->nullable();
            $table->timestamp('review_time')->nullable();
            $table->text('reply_comment')->nullable();
            $table->timestamp('synced_at');
            $table->timestamps();
        });
    }
};
