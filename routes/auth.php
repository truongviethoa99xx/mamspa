<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\MyBookingController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::get('my-bookings', [MyBookingController::class, 'index'])->name('my-bookings.index');
    Route::post('my-bookings/{booking}/cancel', [MyBookingController::class, 'cancel'])->name('my-bookings.cancel');

    Route::get('payment/vnpay/{booking}', [PaymentController::class, 'vnpay'])->name('payment.vnpay');
});

Route::get('payment/vnpay/return', [PaymentController::class, 'vnpayReturn'])->name('payment.vnpay.return');
