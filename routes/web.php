<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CustomerExperienceController;
use App\Http\Controllers\CustomPageController;
use App\Http\Controllers\DichVuController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\GioiThieuController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PolicyPageController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\TranslationController;
use App\Models\MenuPageContent;
use App\Models\Service;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');
Route::get('/i18n/{lang}', [TranslationController::class, 'show'])->name('i18n.show');
Route::get('/', HomeController::class)->name('home');
Route::get('/gioi-thieu', [GioiThieuController::class, 'index'])->name('about');
Route::get('/dich-vu', [DichVuController::class, 'index'])->name('dichvu');
Route::get('/uu-dai', [OfferController::class, 'index'])->name('offers');
// Cây danh mục 2 cấp: /dich-vu/{root}/, /dich-vu/{root}/{child}/,
// /dich-vu/{root}/{service}/ hoặc /dich-vu/{root}/{child}/{service}/.
Route::get('/dich-vu/{a}/{b?}/{c?}', [DichVuController::class, 'browse'])->name('dichvu.browse');
Route::get('/services', fn () => redirect()->away(url('/dich-vu').'/', 301))->name('services.index');
// URL "bảng giá" cũ đã được Google index nhưng không còn tồn tại trong hệ thống hiện tại
// (giá hiển thị theo từng dịch vụ ở /dich-vu/) → redirect thay vì để 404.
Route::get('/bang-gia', fn () => redirect()->away(url('/dich-vu').'/', 301))->name('bang-gia.redirect');
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
Route::post('/newsletter', [NewsletterController::class, 'store'])->middleware('throttle:5,1')->name('newsletter.store');
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
Route::get('/trai-nghiem-khach-hang', [CustomerExperienceController::class, 'index'])->name('customer-experience.index');
Route::get('/lien-he', [ContactController::class, 'index'])->name('contact.index');
Route::post('/lien-he', [ContactController::class, 'store'])->middleware('throttle:5,1')->name('contact.store');
// Legacy EN slug → canonical VI slug (301).
Route::get('/contact', fn () => redirect()->away(url('/lien-he').'/', 301));

// 4 trang chính sách ở footer — mỗi trang một URL riêng ở cấp gốc (không còn tiền tố
// /chinh-sach), nội dung chỉnh qua Filament › Nội dung › Trang chính sách (Quill editor).
// Route::defaults() thay vì closure lồng nhau (fn($slug) => fn($controller) => ...) — pattern
// cũ gây ArgumentCountError trên production sau `route:cache`: Laravel serialize closure được
// TRẢ VỀ từ 1 closure khác (curry) mất đúng chữ ký tham số, deserialize xong gọi lại với 0
// tham số thay vì 1 ("Too few arguments... exactly 1 expected"). Controller action + defaults
// là pattern chuẩn, cache route bình thường không lỗi.
Route::get('/chinh-sach-bao-mat', [PolicyPageController::class, 'show'])->defaults('slug', 'chinh-sach-bao-mat')->name('policy.privacy');
Route::get('/dieu-khoan-dich-vu', [PolicyPageController::class, 'show'])->defaults('slug', 'dieu-khoan-dich-vu')->name('policy.terms');
Route::get('/ho-tro-khach-hang', [PolicyPageController::class, 'show'])->defaults('slug', 'ho-tro-khach-hang')->name('policy.support');
Route::get('/luu-y-dich-vu', [PolicyPageController::class, 'show'])->defaults('slug', 'luu-y-dich-vu')->name('service-guidelines');
// Giữ URL cũ hoạt động (301) phòng khi đã chia sẻ.
Route::get('/huong-dan-thanh-toan', fn () => redirect()->away(url('/luu-y-dich-vu').'/', 301));

require __DIR__.'/auth.php';

// Trang Menu (App\Filament\Pages\MenuPageSettings) và trang tuỳ biến qua CMS
// (App\Filament\Resources\CustomPageResource) đều dùng slug tự do, có thể chứa "/",
// nên khớp qua cùng một route "catch-all" — thử Menu trước, không thấy mới rơi về
// CustomPage. BẮT BUỘC đặt route này SAU mọi route cụ thể khác ở trên: bất kỳ route
// nào định nghĩa sau dòng này sẽ không bao giờ được match (bị catch-all này "nuốt"
// mất trước). CustomPageController::show() tự abort(404) nếu không tìm thấy slug
// tương ứng, rơi về đúng trang NotFound như route không tồn tại.
Route::get('/{slug}', function (string $slug) {
    $menu = MenuPageContent::published()->where('slug', trim($slug, '/'))->first();

    if ($menu) {
        return app(MenuController::class)->render($menu);
    }

    return app(CustomPageController::class)->show($slug);
})->where('slug', '.*')->name('custom-page.show');

// Catch-all for URLs that don't match any route above. Defined here (rather
// than only in the exception handler) so it runs through the full `web`
// middleware group — locale + Inertia shared props (auth, site...)
// need to be available for the layout, same as on every other page.
Route::fallback(function () {
    return Inertia::render('NotFound')
        ->toResponse(request())
        ->setStatusCode(404);
})->name('fallback');
