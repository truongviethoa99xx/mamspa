<?php

namespace App\Http\Middleware;

use App\Models\ServiceCategory;
use App\Models\SiteSetting;
use App\Models\User;
use App\Support\OptimizedImageUrl;
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
            // Ngôn ngữ admin đã bật ở CMS (Thiết lập chung) — LanguageSwitcher chỉ hiện đúng
            // các ngôn ngữ trong danh sách này, xem SiteSetting::getEnabledLocales().
            'availableLocales' => $site?->getEnabledLocales() ?? config('app.available_locales', ['vi', 'en']),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'booking_code' => fn () => $request->session()->get('booking_code'),
            ],
            'site' => [
                'brand_name' => $site?->brand_name,
                // Ưu tiên bản .webp đã resize (xem SiteSetting::booted) — logo gốc admin tải
                // lên thường vài nghìn px dù hiển thị ~80px, PageSpeed từng báo lãng phí ~287KB.
                'logo_path' => OptimizedImageUrl::resolve($site?->logo_path),
                'address' => $site?->address,
                'phone' => $site?->phone,
                'open_hours' => $site?->open_hours,
                'branches' => $site?->branches ?? [],
                'lat' => $site?->lat,
                'lng' => $site?->lng,
                'header_background_color' => $site?->header_background_color ?: '#F6F3EF',
                'header_text_color' => $site?->header_text_color ?: '#2F3E2E',
                'header_transparent' => (bool) $site?->header_transparent,
                'header_cta_text' => $site?->header_cta_text ?: 'Đặt lịch ngay',
                'header_cta_background_color' => $site?->header_cta_background_color ?: '#2F3E2E',
                'header_cta_text_color' => $site?->header_cta_text_color ?: '#FFFFFF',
                'tagline' => $site?->tagline,
                'meta_description' => $site?->meta_description,
                'hotline' => $site?->hotline,
                'email' => $site?->email,
                'chat_url' => $site?->chat_url,
                // Icon tự tải lên (nếu có) cũng ưu tiên bản .webp đã resize, cùng lý do trên.
                'floating_contact_buttons' => collect($site?->floating_contact_buttons ?? [])
                    ->map(function (array $button) {
                        $button['icon'] = OptimizedImageUrl::resolve($button['icon'] ?? null);

                        return $button;
                    })->all(),
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
                'label' => html_entity_decode(strip_tags($root->name)),
                'href' => $this->menuHref($root),
                'children' => $root->children->map(fn (ServiceCategory $child) => [
                    'label' => html_entity_decode(strip_tags($child->name)),
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
