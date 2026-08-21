<?php

namespace App\Console\Commands;

use App\Models\CustomPage;
use App\Models\HomePageContent;
use App\Models\ServiceCategory;
use App\Models\SiteSetting;
use App\Support\HomeImageOptimizer;
use Illuminate\Console\Command;

/**
 * Backfill một lần cho ảnh CMS đã tải lên trước khi HomeImageOptimizer tồn
 * tại. Chỉ tạo file .webp mới cạnh ảnh gốc trên disk 'public' — không sửa,
 * xoá ảnh gốc hay ghi gì vào DB. An toàn để chạy lại nhiều lần.
 */
class OptimizeHomeImages extends Command
{
    protected $signature = 'images:optimize-home {--force : Sinh lại các bản .webp đã có sẵn (dùng sau khi đổi chiều rộng mục tiêu trong HomeImageOptimizer)}';

    protected $description = 'Sinh bản .webp đã resize cho ảnh trang chủ và danh mục dịch vụ (backfill, không đụng DB/ảnh gốc)';

    public function handle(): int
    {
        $force = (bool) $this->option('force');

        $this->info('Đang sinh ảnh .webp cho nội dung trang chủ...');
        HomeImageOptimizer::forHomePageContent(HomePageContent::current(), $force);

        $categories = ServiceCategory::all();
        $this->info("Đang sinh ảnh .webp cho {$categories->count()} danh mục dịch vụ...");
        $categories->each(fn (ServiceCategory $category) => HomeImageOptimizer::forServiceCategory($category, $force));

        $pages = CustomPage::all();
        $this->info("Đang sinh ảnh .webp cho {$pages->count()} trang tuỳ biến...");
        $pages->each(fn (CustomPage $page) => HomeImageOptimizer::forCustomPage($page, $force));

        $this->info('Đang sinh ảnh .webp cho logo và icon liên hệ...');
        HomeImageOptimizer::forSiteSetting(SiteSetting::current(), $force);

        $this->info('Hoàn tất.');

        return self::SUCCESS;
    }
}
