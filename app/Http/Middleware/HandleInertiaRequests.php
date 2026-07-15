<?php

namespace App\Http\Middleware;

use App\Models\Branch;
use App\Models\ServiceCategory;
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
                'logo_path' => $site?->logo_path,
                'tagline' => $site?->tagline,
                'meta_description' => $site?->meta_description,
                'hotline' => $site?->hotline,
                'email' => $site?->email,
                'chat_url' => $site?->chat_url,
                'floating_contact_buttons' => $site?->floating_contact_buttons ?? [],
                'social_links' => $site?->social_links ?? [],
                'service_menu' => fn () => Schema::hasTable('service_categories') ? $this->serviceMenu() : [],
            ],
            'gtm' => [
                'id' => config('services.gtm.id'),
            ],
            'ziggy' => fn () => [
                'location' => $request->url(),
            ],
        ]);
    }

    /** Menu dịch vụ 2 cấp cho header: danh mục gốc kèm danh mục con. */
    private function serviceMenu(): array
    {
        $roots = ServiceCategory::query()
            ->roots()
            ->active()
            ->showInMenu()
            ->orderBy('order')
            ->with([
                'children' => fn ($q) => $q->active()->orderBy('order'),
                'children.services' => fn ($q) => $q->active(),
                'services' => fn ($q) => $q->active(),
            ])
            ->get();

        return $roots->map(function (ServiceCategory $root) {
            $root->services->each->setRelation('category', $root);
            $root->children->each(function (ServiceCategory $child) use ($root) {
                $child->setRelation('parent', $root);
                $child->services->each->setRelation('category', $child);
            });

            return [
                'label' => $root->name,
                'href' => $this->menuHref($root),
                'children' => $root->children->map(fn (ServiceCategory $child) => [
                    'label' => $child->name,
                    'href' => $this->menuHref($child),
                ])->values()->all(),
            ];
        })->all();
    }

    /** Danh mục chỉ có đúng 1 dịch vụ (tính cả danh mục con) → link thẳng trang chi tiết dịch vụ đó. */
    private function menuHref(ServiceCategory $category): string
    {
        $services = $category->relationLoaded('children')
            ? $category->services->concat($category->children->flatMap(fn (ServiceCategory $c) => $c->services))
            : $category->services;

        return $services->count() === 1 ? $services->first()->url : $category->url;
    }
}
