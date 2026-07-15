<?php

namespace App\Providers\Filament;

use App\Filament\Pages\Dashboard;
use App\Http\Middleware\NoIndex;
use App\Models\SiteSetting;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Css;
use Filament\Support\Colors\Color;
use Filament\Support\Facades\FilamentAsset;
use Filament\View\PanelsRenderHook;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Schema;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function boot(): void
    {
        $quillJsPath = __DIR__.'/../../../resources/js/filament/dist/components/quill-editor.js';
        $quillCssPath = __DIR__.'/../../../resources/css/filament/quill-editor.css';

        // Filament's own asset versioning (Asset::getVersion()) falls back to the installed
        // filament/support package version when appVersion() isn't set — which never changes
        // between edits, so browsers cache these 'app'-package assets forever and rebuilds
        // silently never reach the browser. Tie the version to the source files' mtime instead
        // (same pattern already used for css/admin-theme.css below), so every rebuild busts cache.
        FilamentAsset::appVersion((string) max(filemtime($quillJsPath), filemtime($quillCssPath)));

        // Quill.js dùng cho field QuillEditor (thay RichEditor mặc định) — xem app/Filament/Forms/Components/QuillEditor.php.
        FilamentAsset::register([
            Css::make('quill-editor', __DIR__.'/../../../node_modules/quill/dist/quill.snow.css')->loadedOnRequest(),
            Css::make('quill-editor-theme', $quillCssPath)->loadedOnRequest(),
            AlpineComponent::make('quill-editor', $quillJsPath),
        ]);
    }

    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->brandName(fn (): string => Schema::hasTable('site_settings')
                ? (SiteSetting::current()->brand_name ?: 'Mầm Spa')
                : 'Mầm Spa')
            // Tông thiên nhiên: xanh ô liu + nền kem, đồng bộ palette website.
            ->colors([
                'primary' => Color::hex('#556B3F'),
                'gray' => Color::Stone,
            ])
            ->brandLogo(function (): string {
                $logoPath = Schema::hasTable('site_settings') ? SiteSetting::current()->logo_path : null;

                return $logoPath ? asset('storage/'.$logoPath) : asset('images/logo.svg');
            })
            ->brandLogoHeight('7.5rem')
            ->favicon(asset('images/favicon.ico'))
            ->sidebarWidth('15rem')
            ->databaseNotifications()
            // Luôn ở chế độ sáng cho giao diện ấm, thoáng.
            ->darkMode(false)
            // Font Quicksand (rounded sans) — đồng bộ website, hợp cảm giác "cửa hàng".
            ->font('Quicksand', url: 'https://fonts.bunny.net/css?family=quicksand:400,500,600,700&display=swap')
            // Theme trung tính ấm nạp từ file CSS tĩnh — không cần build Vite.
            ->renderHook(
                PanelsRenderHook::HEAD_END,
                fn (): string => sprintf(
                    '<meta name="robots" content="noindex, nofollow"><link rel="stylesheet" href="%s">',
                    asset('css/admin-theme.css').'?v='.filemtime(public_path('css/admin-theme.css')),
                ),
            )
            // Thứ tự nhóm menu: vận hành hằng ngày trước, nội dung sau, hệ thống cuối.
            ->navigationGroups([
                'Vận hành',
                'Khách hàng',
                'Bán hàng',
                'Nội dung',
                'Hệ thống',
            ])
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
                NoIndex::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
