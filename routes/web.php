<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DichVuController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\GioiThieuController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PolicyPageController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\TranslationController;
use App\Models\Service;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');
Route::get('/i18n/{lang}', [TranslationController::class, 'show'])->name('i18n.show');
Route::get('/', HomeController::class)->name('home');
Route::get('/gioi-thieu', [GioiThieuController::class, 'index'])->name('about');
Route::get('/dich-vu', [DichVuController::class, 'index'])->name('dichvu');
// Cây danh mục 2 cấp: /dich-vu/{root}/, /dich-vu/{root}/{child}/,
// /dich-vu/{root}/{service}/ hoặc /dich-vu/{root}/{child}/{service}/.
Route::get('/dich-vu/{a}/{b?}/{c?}', [DichVuController::class, 'browse'])->name('dichvu.browse');
Route::get('/chi-nhanh/{branch:slug}', [BranchController::class, 'show'])->name('branches.show');
// Legacy EN slugs → canonical VI slugs (301) to avoid duplicate content.
// Dùng redirect()->away() vì UrlGenerator của Laravel tự cắt dấu "/" cuối —
// URL chuẩn của site luôn kết thúc bằng "/" (khớp rule 301 trong .htaccess).
Route::get('/about-us/{branch:slug}', fn (string $branch) => redirect()->away(url("/chi-nhanh/{$branch}").'/', 301))->name('about.branch');
Route::get('/services', fn () => redirect()->away(url('/dich-vu').'/', 301))->name('services.index');
// URL dịch vụ cũ (phẳng, không danh mục) → URL chuẩn có tiền tố danh mục.
Route::get('/services/{service}', function (string $service) {
    $target = Service::with('category.parent')->where('slug', $service)->first()?->url ?? "/dich-vu/{$service}/";

    return redirect()->away(url(rtrim($target, '/')).'/', 301);
})->name('services.show');

Route::get('/dat-lich', [BookingController::class, 'index'])->name('booking.index');
Route::post('/dat-lich', [BookingController::class, 'store'])->middleware('throttle:10,1')->name('booking.store');
Route::get('/dat-lich/success/{code}', [BookingController::class, 'success'])->name('booking.success');
Route::post('/dat-lich/voucher', [BookingController::class, 'validateVoucher'])->middleware('throttle:20,1')->name('booking.voucher');

// Backward-compat: keep the old /booking URLs pointing at the new ones.
Route::get('/booking', fn () => redirect()->away(url('/dat-lich').'/', 301));

Route::get('/tin-tuc', [BlogController::class, 'index'])->name('tin-tuc.index');
Route::get('/tin-tuc/{post:slug}', [BlogController::class, 'show'])->name('tin-tuc.show');
// Legacy EN slugs → canonical VI slugs (301).
Route::get('/blog', fn () => redirect()->away(url('/tin-tuc').'/', 301))->name('blog.index');
Route::get('/blog/{post:slug}', fn (string $post) => redirect()->away(url("/tin-tuc/{$post}").'/', 301))->name('blog.show');
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
Route::get('/lien-he', [ContactController::class, 'index'])->name('contact.index');
Route::post('/lien-he', [ContactController::class, 'store'])->middleware('throttle:5,1')->name('contact.store');
// Legacy EN slug → canonical VI slug (301).
Route::get('/contact', fn () => redirect()->away(url('/lien-he').'/', 301));

Route::get('/chinh-sach', [PolicyPageController::class, 'index'])->name('chinh-sach.index');
Route::get('/chinh-sach/{policyPage:slug}', [PolicyPageController::class, 'show'])->name('chinh-sach.show');

Route::get('/luu-y-dich-vu', fn () => Inertia::render('PaymentGuide'))->name('service-guidelines');
// Giữ URL cũ hoạt động (301) phòng khi đã chia sẻ.
Route::get('/huong-dan-thanh-toan', fn () => redirect()->away(url('/luu-y-dich-vu').'/', 301));

require __DIR__.'/auth.php';

// Catch-all for URLs that don't match any route above. Defined here (rather
// than only in the exception handler) so it runs through the full `web`
// middleware group — locale + Inertia shared props (auth, site, branches...)
// need to be available for the layout, same as on every other page.
Route::fallback(function () {
    return Inertia::render('NotFound')
        ->toResponse(request())
        ->setStatusCode(404);
})->name('fallback');
