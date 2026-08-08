<?php

namespace App\Console\Commands;

use App\Models\CustomPage;
use App\Models\HomePageContent;
use App\Models\ServiceCategory;
use App\Support\HomeImageOptimizer;
use Illuminate\Console\Command;

/**
 * Backfill một lần cho ảnh CMS đã tải lên trước khi HomeImageOptimizer tồn
 * tại. Chỉ tạo file .webp mới cạnh ảnh gốc trên disk 'public' — không sửa,
 * xoá ảnh gốc hay ghi gì vào DB. An toàn để chạy lại nhiều lần.
 */
class OptimizeHomeImages extends Command
{
    protected $signature = 'images:optimize-home';

    protected $description = 'Sinh bản .webp đã resize cho ảnh trang chủ và danh mục dịch vụ (backfill, không đụng DB/ảnh gốc)';

    public function handle(): int
    {
        $this->info('Đang sinh ảnh .webp cho nội dung trang chủ...');
        HomeImageOptimizer::forHomePageContent(HomePageContent::current());

        $categories = ServiceCategory::all();
        $this->info("Đang sinh ảnh .webp cho {$categories->count()} danh mục dịch vụ...");
        $categories->each(fn (ServiceCategory $category) => HomeImageOptimizer::forServiceCategory($category));

        $pages = CustomPage::all();
        $this->info("Đang sinh ảnh .webp cho {$pages->count()} trang tuỳ biến...");
        $pages->each(fn (CustomPage $page) => HomeImageOptimizer::forCustomPage($page));

        $this->info('Hoàn tất.');

        return self::SUCCESS;
    }
}
