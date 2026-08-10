<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="robots" content="index, follow">

    @php
        // $page['props']['site'] is already resolved once per request by HandleInertiaRequests;
        // reuse it here instead of re-querying SiteSetting.
        $siteProps = $page['props']['site'] ?? [];
        $siteName = $siteProps['brand_name'] ?? config('app.name', 'Mầm Spa');
        // logo_path đã là URL đầy đủ (ưu tiên bản .webp) qua OptimizedImageUrl::resolve() trong
        // HandleInertiaRequests — không tự ghép asset('storage/...') nữa như trước.
        $siteLogoUrl = ! empty($siteProps['logo_path']) ? $siteProps['logo_path'] : asset('images/logo.svg');
    @endphp

    {{-- No static <title> here — @inertiaHead below (SSR-rendered per page, or client-side
         hydration as fallback) is the single source of truth. A static tag here would sit
         alongside the SSR-injected one instead of being replaced by it (both carry the
         "inertia" tracking attribute, but Blade doesn't dedupe them), producing two <title>
         elements in the raw HTML — invalid markup, and crawlers tend to read the first one,
         which would always be this generic fallback instead of the actual per-page title. --}}

    @php
        // URL chuẩn luôn kết thúc bằng "/" (khớp với rule 301 trong .htaccess).
        $path = trim(request()->path(), '/');
        $canonicalBase = config('app.url') . '/' . ($path !== '' ? $path . '/' : '');
        $currentLocale = app()->getLocale();
        $defaultLocale = config('app.locale', 'vi');
        $localeMap = ['vi' => 'vi', 'en' => 'en', 'ja' => 'ja', 'ko' => 'ko', 'zh' => 'zh-Hans'];
        $available = config('app.available_locales', ['vi', 'en']);
        // Default locale (vi) lives at the bare URL; non-default locales carry ?lang=.
        $localeUrl = fn ($loc) => $loc === $defaultLocale ? $canonicalBase : $canonicalBase . '?lang=' . $loc;
        $canonicalUrl = $localeUrl($currentLocale);
    @endphp

    <link rel="canonical" href="{{ $canonicalUrl }}">
    @foreach($available as $loc)
        <link rel="alternate" hreflang="{{ $localeMap[$loc] ?? $loc }}" href="{{ $localeUrl($loc) }}">
    @endforeach
    <link rel="alternate" hreflang="x-default" href="{{ $canonicalBase }}">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="{{ $siteName }}">
    <meta property="og:url" content="{{ $canonicalBase }}">
    <meta property="og:locale" content="{{ $currentLocale === 'vi' ? 'vi_VN' : ($currentLocale === 'en' ? 'en_US' : ($currentLocale === 'ja' ? 'ja_JP' : ($currentLocale === 'ko' ? 'ko_KR' : 'zh_CN'))) }}">
    <meta property="og:image" content="{{ config('app.url') }}/images/banner.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@mamspa_danang">
    <meta name="twitter:image" content="{{ config('app.url') }}/images/banner.png">

    @php
        // Gợi ý tải trước ảnh hero (LCP element) NGAY TỪ HTML GỐC — không phụ thuộc SSR/JS.
        // App\Support\Ssr\ProcessGateway chỉ chạy SSR cho bot (xem ghi chú ở đó); với người
        // dùng thật (client-render), <img>/<link preload> mà Home.tsx/Hero.tsx tự thêm vào
        // <Head> chỉ xuất hiện SAU KHI React chạy xong — nghĩa là trình duyệt không hề biết
        // cần tải ảnh hero cho tới lúc đó, làm LCP chậm hẳn dù ảnh đã tối ưu cỡ (xác nhận qua
        // PageSpeed: "LCP request discovery" báo "Request is discoverable in initial
        // document: ✗"). Field trong $page['props'] đã được server tính sẵn dù SSR có chạy
        // hay không, nên lấy thẳng từ đây, không cần đợi Node.
        $heroImage = null;
        $heroImageMobile = null;
        if (($page['component'] ?? null) === 'Home') {
            $heroImage = $page['props']['hero']['image'] ?? null;
            $heroImageMobile = $page['props']['hero']['image_mobile'] ?? null;
        } elseif (($page['component'] ?? null) === 'CustomPage/Show') {
            $heroImage = $page['props']['banner']['image'] ?? null;
            $heroImageMobile = $page['props']['banner']['image_mobile'] ?? null;
        }
    @endphp
    @if($heroImage)
        <link
            rel="preload"
            as="image"
            href="{{ $heroImage }}"
            @if($heroImageMobile)
                imagesrcset="{{ $heroImageMobile }} 1280w, {{ $heroImage }} 1920w"
                imagesizes="100vw"
            @endif
            fetchpriority="high"
        >
    @endif

    <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
    <link rel="apple-touch-icon" href="/images/favicon.ico">
    <link rel="preconnect" href="https://fonts.bunny.net">
    {{-- Load non-blocking: preload the stylesheet, then swap its rel to "stylesheet" once
         fetched instead of using a normal blocking <link rel="stylesheet">. The <noscript>
         fallback covers the (rare) no-JS case. --}}
    <link rel="preload" as="style" href="https://fonts.bunny.net/css?family=quicksand:400,500,600,700|playfair-display:400,500,600,700&display=swap">
    <link rel="stylesheet" href="https://fonts.bunny.net/css?family=quicksand:400,500,600,700|playfair-display:400,500,600,700&display=swap" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="https://fonts.bunny.net/css?family=quicksand:400,500,600,700|playfair-display:400,500,600,700&display=swap"></noscript>

    <script type="application/ld+json">{!! json_encode([
        '@context' => 'https://schema.org',
        '@graph' => [
            [
                '@type' => 'Organization',
                '@id' => config('app.url') . '/#organization',
                'name' => $siteName,
                'url' => config('app.url'),
                'logo' => $siteLogoUrl,
                'sameAs' => [
                    'https://www.facebook.com/mamSpa.danang',
                    'https://www.instagram.com/mamspa.danang',
                ],
                'contactPoint' => [
                    ['@type' => 'ContactPoint', 'telephone' => '+84934743026', 'contactType' => 'customer service'],
                    ['@type' => 'ContactPoint', 'telephone' => '+84978456185', 'contactType' => 'customer service'],
                ],
            ],
            [
                '@type' => 'WebSite',
                '@id' => config('app.url') . '/#website',
                'url' => config('app.url'),
                'name' => $siteName,
                'publisher' => ['@id' => config('app.url') . '/#organization'],
                'potentialAction' => [
                    '@type' => 'SearchAction',
                    'target' => ['@type' => 'EntryPoint', 'urlTemplate' => config('app.url') . '/dich-vu/?category={search_term_string}'],
                    'query-input' => 'required name=search_term_string',
                ],
            ],
            [
                '@type' => ['HealthAndBeautyBusiness', 'DaySpa'],
                '@id' => config('app.url') . '/#heritage',
                'name' => 'Mầm Spa Lê Văn Sỹ',
                'parentOrganization' => ['@id' => config('app.url') . '/#organization'],
                'address' => [
                    '@type' => 'PostalAddress',
                    'streetAddress' => '26 Nguyễn Văn Thoại',
                    'addressLocality' => 'Đà Nẵng',
                    'addressRegion' => 'Đà Nẵng',
                    'addressCountry' => 'VN',
                ],
                'geo' => ['@type' => 'GeoCoordinates', 'latitude' => 16.0685, 'longitude' => 108.2127],
                'telephone' => '+84934743026',
                'url' => config('app.url') . '/chi-nhanh/heritage/',
                'openingHoursSpecification' => [
                    ['@type' => 'OpeningHoursSpecification', 'dayOfWeek' => ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], 'opens' => '09:00', 'closes' => '21:00'],
                ],
                'priceRange' => '$$',
                'currenciesAccepted' => 'VND',
                'paymentAccepted' => 'Cash, Credit Card',
            ],
            [
                '@type' => ['HealthAndBeautyBusiness', 'DaySpa'],
                '@id' => config('app.url') . '/#signature',
                'name' => 'Mầm Spa Lê Thị Riêng',
                'parentOrganization' => ['@id' => config('app.url') . '/#organization'],
                'address' => [
                    '@type' => 'PostalAddress',
                    'streetAddress' => '185 Hồ Nghinh',
                    'addressLocality' => 'Đà Nẵng',
                    'addressRegion' => 'Đà Nẵng',
                    'addressCountry' => 'VN',
                ],
                'geo' => ['@type' => 'GeoCoordinates', 'latitude' => 16.0743, 'longitude' => 108.2208],
                'telephone' => '+84978456185',
                'url' => config('app.url') . '/chi-nhanh/signature/',
                'openingHoursSpecification' => [
                    ['@type' => 'OpeningHoursSpecification', 'dayOfWeek' => ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], 'opens' => '09:00', 'closes' => '21:00'],
                ],
                'priceRange' => '$$',
                'currenciesAccepted' => 'VND',
                'paymentAccepted' => 'Cash, Credit Card',
            ],
        ],
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>

    @if(config('services.gtm.id'))
    <link rel="preconnect" href="https://www.googletagmanager.com">
    <script>
    // GTM's container script is heavy and mostly unused on initial paint (Lighthouse flags
    // it under "unused JavaScript"/TBT). Defer loading it until the first real user
    // interaction (or a 3.5s fallback so it still fires for users who never interact) instead
    // of blocking/competing with the initial render — analytics stays effectively complete
    // since almost no one converts within the first few seconds anyway.
    (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        var loaded = false;
        function loadGtm() {
            if (loaded) return;
            loaded = true;
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            var f = d.getElementsByTagName(s)[0], j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
            events.forEach(function (evt) { w.removeEventListener(evt, loadGtm, { passive: true }); });
        }
        var events = ['scroll', 'mousemove', 'touchstart', 'keydown'];
        events.forEach(function (evt) { w.addEventListener(evt, loadGtm, { passive: true }); });
        setTimeout(loadGtm, 3500);
    })(window, document, 'script', 'dataLayer', '{{ config('services.gtm.id') }}');
    </script>
    @endif

    @routes
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>
<body class="font-sans antialiased">
    @if(config('services.gtm.id'))
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ config('services.gtm.id') }}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    @endif
    @inertia
</body>
</html>
