<?php

namespace App\Http\Middleware;

use App\Models\Branch;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $site = Schema::hasTable('site_settings') ? SiteSetting::current() : null;
        $user = $request->user();

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $user->roles->pluck('name')->values()->all(),
                    'can_manage_content' => $user->hasAnyRole(User::contentRoles()),
                    'can_manage_site' => $user->hasAnyRole(User::adminRoles()),
                    'can_manage_staff' => $user->hasAnyRole(User::superAdminRoles()),
                ] : null,
            ],
            'locale' => app()->getLocale(),
            'availableLocales' => config('app.available_locales', ['vi', 'en']),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'booking_code' => fn () => $request->session()->get('booking_code'),
            ],
            'branches' => fn () => Branch::where('is_active', true)->orderBy('id')->get()
                ->map(fn ($b) => [
                    'slug' => $b->slug,
                    'name' => $b->name,
                    'address' => $b->address,
                    'phone' => $b->phone,
                    'open_hours' => $b->open_hours,
                    'lat' => $b->lat,
                    'lng' => $b->lng,
                ])->all(),
            'site' => [
                'brand_name' => $site?->brand_name,
                'tagline' => $site?->tagline,
                'hotline' => $site?->hotline,
                'email' => $site?->email,
                'chat_url' => $site?->chat_url,
                'floating_contact_buttons' => $site?->floating_contact_buttons ?? [],
                'social_links' => $site?->social_links ?? [],
                'service_menu' => $site?->service_menu ?? [],
            ],
            'gtm' => [
                'id' => config('services.gtm.id'),
            ],
            'ziggy' => fn () => [
                'location' => $request->url(),
            ],
        ]);
    }
}
