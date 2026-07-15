<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', fn (Request $r) => $r->user());

Route::prefix('v1')->name('api.')->group(function () {
    // Endpoints sẽ được thêm ở Sprint 1-5
});
