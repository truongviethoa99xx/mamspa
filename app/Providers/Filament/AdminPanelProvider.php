<?php

namespace App\Providers\Filament;

use App\Filament\Pages\Dashboard;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\View\PanelsRenderHook;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->brandName('Mầm Spa')
            // Tông "trung tính ấm": terracotta dịu + nền cát kem, chữ nâu-xám.
            ->colors([
                'primary' => Color::hex('#c1664a'),
                'gray' => Color::Stone,
            ])
            ->brandLogo(asset('images/logo.svg'))
            ->brandLogoHeight('7.5rem')
            ->sidebarWidth('15rem')
            // Luôn ở chế độ sáng cho giao diện ấm, thoáng.
            ->darkMode(false)
            // Font Quicksand (rounded sans) — đồng bộ website, hợp cảm giác "cửa hàng".
            ->font('Quicksand', url: 'https://fonts.bunny.net/css?family=quicksand:400,500,600,700&display=swap')
            // Theme trung tính ấm nạp từ file CSS tĩnh — không cần build Vite.
            ->renderHook(
                PanelsRenderHook::HEAD_END,
                fn (): string => sprintf(
                    '<link rel="stylesheet" href="%s">',
                    asset('css/admin-theme.css').'?v='.filemtime(public_path('css/admin-theme.css')),
                ),
            )
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
