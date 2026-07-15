<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /** Danh mục cũ (enum) → slug + tên danh mục cấp 1 tương ứng, giữ nguyên slug để không phá URL/lọc hiện có. */
    private const LEGACY_CATEGORIES = [
        'massage' => ['vi' => 'Body Massage', 'en' => 'Body Massage'],
        'facial' => ['vi' => 'Facial / Da mặt', 'en' => 'Facial'],
        'head-spa' => ['vi' => 'Head Spa', 'en' => 'Head Spa'],
        'foot-spa' => ['vi' => 'Foot Spa', 'en' => 'Foot Spa'],
        'combo' => ['vi' => 'Combo', 'en' => 'Combo'],
    ];

    public function up(): void
    {
        Schema::create('service_categories', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->json('name');
            $table->foreignId('parent_id')->nullable()->constrained('service_categories')->restrictOnDelete();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::table('services', function (Blueprint $table) {
            $table->foreignId('service_category_id')->nullable()->after('category')->constrained('service_categories')->restrictOnDelete();
        });

        // Tạo danh mục cấp 1 từ 5 giá trị enum cũ và gán lại cho dịch vụ đang có.
        $hasLegacyColumn = Schema::hasColumn('services', 'category');
        if ($hasLegacyColumn) {
            $now = now();
            foreach (self::LEGACY_CATEGORIES as $slug => $name) {
                $categoryId = DB::table('service_categories')->insertGetId([
                    'slug' => $slug,
                    'name' => json_encode($name),
                    'order' => 0,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);

                DB::table('services')->where('category', $slug)->update(['service_category_id' => $categoryId]);
            }

            // SQLite không tự xoá index khi drop column → phải xoá index trước.
            Schema::table('services', function (Blueprint $table) {
                $table->dropIndex('services_category_index');
            });
            Schema::table('services', function (Blueprint $table) {
                $table->dropColumn('category');
            });
        }
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->enum('category', ['massage', 'facial', 'head-spa', 'foot-spa', 'combo'])->nullable()->after('slug');
        });

        foreach (DB::table('service_categories')->whereNull('parent_id')->get() as $category) {
            DB::table('services')->where('service_category_id', $category->id)->update(['category' => $category->slug]);
        }

        Schema::table('services', function (Blueprint $table) {
            $table->dropConstrainedForeignId('service_category_id');
        });

        Schema::dropIfExists('service_categories');
    }
};
