<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="robots" content="index, follow">

    <title inertia>{{ config('app.name', 'Mầm Spa') }}</title>

    @php
        $path = request()->path() === '/' ? '' : '/' . request()->path();
        $canonicalBase = config('app.url') . ($path ? $path : '/');
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
    <meta property="og:site_name" content="Mầm Spa">
    <meta property="og:url" content="{{ request()->url() }}">
    <meta property="og:locale" content="{{ $currentLocale === 'vi' ? 'vi_VN' : ($currentLocale === 'en' ? 'en_US' : ($currentLocale === 'ja' ? 'ja_JP' : ($currentLocale === 'ko' ? 'ko_KR' : 'zh_CN'))) }}">
    <meta property="og:image" content="{{ config('app.url') }}/images/banner.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@mahaspa_danang">
    <meta name="twitter:image" content="{{ config('app.url') }}/images/banner.png">

    <link rel="icon" type="image/svg+xml" href="/images/logo.svg">
    <link rel="apple-touch-icon" href="/images/logo.svg">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=quicksand:400,500,600,700|playfair-display:400,500,600,700&display=swap" rel="stylesheet" />

    <script type="application/ld+json">{!! json_encode([
        '@context' => 'https://schema.org',
        '@graph' => [
            [
                '@type' => 'Organization',
                '@id' => config('app.url') . '/#organization',
                'name' => 'Mầm Spa',
                'url' => config('app.url'),
                'logo' => config('app.url') . '/images/logo.svg',
                'sameAs' => [
                    'https://www.facebook.com/mahaSpa.danang',
                    'https://www.instagram.com/mahaspa.danang',
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
                'name' => 'Mầm Spa',
                'publisher' => ['@id' => config('app.url') . '/#organization'],
                'potentialAction' => [
                    '@type' => 'SearchAction',
                    'target' => ['@type' => 'EntryPoint', 'urlTemplate' => config('app.url') . '/dich-vu?category={search_term_string}'],
                    'query-input' => 'required name=search_term_string',
                ],
            ],
            [
                '@type' => ['HealthAndBeautyBusiness', 'DaySpa'],
                '@id' => config('app.url') . '/#heritage',
                'name' => 'Maha Heritage Spa',
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
                'url' => config('app.url') . '/chi-nhanh/heritage',
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
                'name' => 'Maha Signature Spa',
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
                'url' => config('app.url') . '/chi-nhanh/signature',
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
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','{{ config('services.gtm.id') }}');</script>
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
