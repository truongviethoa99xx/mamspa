<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/about-us/{branch:slug}', [BranchController::class, 'show'])->name('about.branch');
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{service:slug}', [ServiceController::class, 'show'])->name('services.show');

Route::get('/booking', [BookingController::class, 'index'])->name('booking.index');
Route::post('/booking', [BookingController::class, 'store'])->name('booking.store');
Route::get('/booking/success/{code}', [BookingController::class, 'success'])->name('booking.success');

// Booking helper endpoints (JSON, used by the booking UI)
Route::get('/booking/slots', [BookingController::class, 'slots'])->name('booking.slots');
Route::post('/booking/voucher', [BookingController::class, 'validateVoucher'])->name('booking.voucher');

require __DIR__.'/auth.php';
