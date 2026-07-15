<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const FIELDS = ['benefits', 'experience_images', 'faqs', 'ideal_for'];

    public function up(): void
    {
        Schema::table('service_categories', function (Blueprint $table) {
            // [{title:{vi,en,...}, description:{vi,en,...}}]
            $table->json('benefits')->nullable()->after('is_active');
            // [{image: 'path', alt: '...'}]
            $table->json('experience_images')->nullable()->after('benefits');
            // [{question:{vi,en,...}, answer:{vi,en,...}}]
            $table->json('faqs')->nullable()->after('experience_images');
            // ["Nhân viên văn phòng...", ...]
            $table->json('ideal_for')->nullable()->after('faqs');
        });

        $this->copyDataFromServices();

        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn(self::FIELDS);
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->json('benefits')->nullable()->after('steps');
            $table->json('experience_images')->nullable()->after('benefits');
            $table->json('faqs')->nullable()->after('experience_images');
            $table->json('ideal_for')->nullable()->after('faqs');
        });

        Schema::table('service_categories', function (Blueprint $table) {
            $table->dropColumn(self::FIELDS);
        });
    }

    /** Best-effort: mỗi danh mục lấy dữ liệu từ dịch vụ đầu tiên (theo id) có nội dung cho từng field. */
    private function copyDataFromServices(): void
    {
        $services = DB::table('services')
            ->whereNotNull('service_category_id')
            ->orderBy('id')
            ->get(array_merge(['service_category_id'], self::FIELDS));

        $updates = [];

        foreach ($services as $service) {
            foreach (self::FIELDS as $field) {
                $value = $service->{$field};

                if (isset($updates[$service->service_category_id][$field])) {
                    continue;
                }

                if ($value === null || $value === '' || $value === '[]' || $value === 'null') {
                    continue;
                }

                $updates[$service->service_category_id][$field] = $value;
            }
        }

        foreach ($updates as $categoryId => $values) {
            DB::table('service_categories')->where('id', $categoryId)->update($values);
        }
    }
};
