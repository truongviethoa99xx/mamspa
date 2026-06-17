<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DichVuController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\GioiThieuController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\TranslationController;
use Illuminate\Support\Facades\Route;

Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');
Route::get('/i18n/{lang}', [TranslationController::class, 'show'])->name('i18n.show');
Route::get('/', HomeController::class)->name('home');
Route::get('/gioi-thieu', [GioiThieuController::class, 'index'])->name('about');
Route::get('/dich-vu', [DichVuController::class, 'index'])->name('dichvu');
Route::get('/dich-vu/{slug}', [DichVuController::class, 'show'])->name('dichvu.detail');
Route::get('/chi-nhanh/{branch:slug}', [BranchController::class, 'show'])->name('branches.show');
Route::get('/about-us/{branch:slug}', [BranchController::class, 'show'])->name('about.branch');
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{service:slug}', [ServiceController::class, 'show'])->name('services.show');

Route::get('/dat-lich', [BookingController::class, 'index'])->name('booking.index');
Route::post('/dat-lich', [BookingController::class, 'store'])->middleware('throttle:10,1')->name('booking.store');
Route::get('/dat-lich/success/{code}', [BookingController::class, 'success'])->name('booking.success');
Route::get('/dat-lich/slots', [BookingController::class, 'slots'])->middleware('throttle:60,1')->name('booking.slots');
Route::post('/dat-lich/voucher', [BookingController::class, 'validateVoucher'])->middleware('throttle:20,1')->name('booking.voucher');

// Backward-compat: keep the old /booking URLs pointing at the new ones.
Route::permanentRedirect('/booking', '/dat-lich');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{post:slug}', [BlogController::class, 'show'])->name('blog.show');
Route::get('/tin-tuc', [BlogController::class, 'index'])->name('tin-tuc.index');
Route::get('/tin-tuc/{post:slug}', [BlogController::class, 'show'])->name('tin-tuc.show');
Route::get('/promotions', [PromotionController::class, 'index'])->name('promotions.index');
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:5,1')->name('contact.store');

require __DIR__.'/auth.php';
