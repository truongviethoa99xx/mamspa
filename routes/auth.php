<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\MyBookingController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    if (config('app.registration_enabled')) {
        Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
        Route::post('register', [RegisteredUserController::class, 'store'])->middleware('throttle:5,1');
    }

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store'])->middleware('throttle:10,1');

    Route::get('auth/google/redirect', [GoogleAuthController::class, 'redirect'])->name('auth.google.redirect');
    // Path cố định theo "Authorized redirect URI" đã khai báo trên Google Cloud Console.
    Route::get('api/auth/callback/google', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

// Mở cho cả khách chưa đăng nhập: controller tự kiểm tra quyền sở hữu
// qua user_id hoặc cookie guest_bookings (App\Support\GuestBookings).
Route::get('my-bookings', [MyBookingController::class, 'index'])->name('my-bookings.index');
Route::post('my-bookings/{booking}/cancel', [MyBookingController::class, 'cancel'])
    ->middleware('throttle:10,1')->name('my-bookings.cancel');

Route::get('payment/vnpay/{booking}', [PaymentController::class, 'vnpay'])->name('payment.vnpay');

Route::get('payment/vnpay/return', [PaymentController::class, 'vnpayReturn'])->name('payment.vnpay.return');
