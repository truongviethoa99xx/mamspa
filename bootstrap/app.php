<?php

use App\Http\Middleware\AddTrailingSlash;
use App\Http\Middleware\FixInertiaUrlTrailingSlash;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SetLocale;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Chạy trước mọi middleware khác: URL không có "/" cuối 301 về bản có "/".
        $middleware->web(prepend: [
            AddTrailingSlash::class,
        ]);
        $middleware->web(append: [
            SetLocale::class,
            HandleInertiaRequests::class,
            FixInertiaUrlTrailingSlash::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Covers 404s raised from *within* a matched route (e.g. route-model
        // binding misses like /dich-vu/{slug}) — the `web` middleware group
        // has already run by the time these are thrown, so shared Inertia
        // props (auth, site, branches...) are available as usual.
        // Unmatched URLs are handled by the Route::fallback() in web.php
        // instead, since the router never dispatches through any middleware
        // for a route it couldn't match at all.
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return null;
            }

            return Inertia::render('NotFound')
                ->toResponse($request)
                ->setStatusCode(404);
        });
    })->create();
