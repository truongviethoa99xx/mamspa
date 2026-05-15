<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>{{ config('app.name', 'Maha Spa') }}</title>
    <meta name="description" content="Maha Spa Đà Nẵng — Hành trình cân bằng Thân Tâm Trí. Đặt lịch online dễ dàng tại 2 chi nhánh Heritage và Signature.">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Maha Spa">
    <meta property="og:locale" content="{{ str_replace('-', '_', app()->getLocale() === 'vi' ? 'vi_VN' : 'en_US') }}">

    <link rel="icon" href="/favicon.ico">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700|playfair-display:400,600,700&display=swap" rel="stylesheet" />

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Maha Spa",
        "description": "Spa truyền thống Việt tại Đà Nẵng",
        "url": "{{ config('app.url') }}",
        "telephone": "+84934743026",
        "address": [
            {"@type": "PostalAddress", "streetAddress": "26 Nguyễn Văn Thoại", "addressLocality": "Đà Nẵng", "addressCountry": "VN"},
            {"@type": "PostalAddress", "streetAddress": "185 Hồ Nghinh", "addressLocality": "Đà Nẵng", "addressCountry": "VN"}
        ],
        "openingHours": "Mo-Su 09:00-21:00",
        "priceRange": "$$"
    }
    </script>

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
