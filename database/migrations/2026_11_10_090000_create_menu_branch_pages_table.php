<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menu_branch_pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('order')->default(0);

            $table->string('image')->nullable();
            $table->json('image_alt')->nullable();
            $table->json('name')->nullable();
            $table->json('street')->nullable();
            $table->json('desc')->nullable();

            // Menu PDF theo ngôn ngữ — khớp App\Http\Controllers\MenuController::PDF_LOCALES.
            $table->string('pdf_vi')->nullable();
            $table->string('pdf_en')->nullable();
            $table->string('pdf_zh')->nullable();
            $table->string('pdf_ko')->nullable();
            $table->string('pdf_ja')->nullable();

            $table->timestamps();
        });

        // Chuyển dữ liệu chi nhánh cũ (từng nằm trong cột JSON `branches` của
        // menu_page_contents, dạng repeater 1 trang gộp nhiều chi nhánh) sang bản ghi riêng ở
        // bảng mới — mỗi chi nhánh giờ là 1 trang với URL /menu/{slug}/ riêng. Không xoá PDF/ảnh
        // đã upload, chỉ di chuyển metadata trỏ tới đúng file cũ (path không đổi).
        if (Schema::hasColumn('menu_page_contents', 'branches')) {
            $menu = DB::table('menu_page_contents')->orderBy('id')->first();
            $branches = $menu ? json_decode((string) $menu->branches, true) : null;

            foreach ((array) $branches as $index => $branch) {
                if (! is_array($branch)) {
                    continue;
                }

                $name = $branch['name']['vi'] ?? $branch['street']['vi'] ?? 'chi-nhanh-'.($index + 1);
                $slug = 'menu/'.Str::slug($name);

                // Slug trùng (vd. 2 chi nhánh cùng tên) → thêm hậu tố để vẫn unique.
                $suffix = 1;
                $uniqueSlug = $slug;
                while (DB::table('menu_branch_pages')->where('slug', $uniqueSlug)->exists()) {
                    $uniqueSlug = $slug.'-'.(++$suffix);
                }

                DB::table('menu_branch_pages')->insert([
                    'slug' => $uniqueSlug,
                    'is_published' => true,
                    'order' => $index,
                    'image' => $branch['image'] ?? null,
                    'image_alt' => isset($branch['image_alt']) ? json_encode($branch['image_alt']) : null,
                    'name' => isset($branch['name']) ? json_encode($branch['name']) : null,
                    'street' => isset($branch['street']) ? json_encode($branch['street']) : null,
                    'desc' => isset($branch['desc']) ? json_encode($branch['desc']) : null,
                    'pdf_vi' => $branch['pdf_vi'] ?? null,
                    'pdf_en' => $branch['pdf_en'] ?? null,
                    'pdf_zh' => $branch['pdf_zh'] ?? null,
                    'pdf_ko' => $branch['pdf_ko'] ?? null,
                    'pdf_ja' => $branch['pdf_ja'] ?? null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('menu_branch_pages');
    }
};
