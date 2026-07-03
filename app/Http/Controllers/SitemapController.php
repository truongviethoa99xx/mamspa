<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Branch;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Schema;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $base = config('app.url');
        $urls = [
            ['loc' => $base.'/', 'priority' => '1.0'],
            ['loc' => $base.'/gioi-thieu/', 'priority' => '0.7'],
            ['loc' => $base.'/dich-vu/', 'priority' => '0.9'],
            ['loc' => $base.'/dat-lich/', 'priority' => '0.9'],
            ['loc' => $base.'/promotions/', 'priority' => '0.7'],
            ['loc' => $base.'/tin-tuc/', 'priority' => '0.7'],
            ['loc' => $base.'/gallery/', 'priority' => '0.6'],
            ['loc' => $base.'/lien-he/', 'priority' => '0.6'],
        ];

        if (Schema::hasTable('branches')) {
            foreach (Branch::where('is_active', true)->get() as $b) {
                $urls[] = [
                    'loc' => $base.'/chi-nhanh/'.$b->slug.'/',
                    'lastmod' => $b->updated_at?->toIso8601String(),
                    'priority' => '0.8',
                ];
            }
        }
        if (Schema::hasTable('service_categories')) {
            foreach (ServiceCategory::active()->get() as $c) {
                $urls[] = [
                    'loc' => $base.$c->url,
                    'lastmod' => $c->updated_at?->toIso8601String(),
                    'priority' => $c->isRoot() ? '0.8' : '0.7',
                ];
            }
        }
        if (Schema::hasTable('services')) {
            foreach (Service::active()->with('category.parent')->get() as $s) {
                $urls[] = [
                    'loc' => $base.$s->url,
                    'lastmod' => $s->updated_at?->toIso8601String(),
                    'priority' => '0.8',
                ];
            }
        }
        if (Schema::hasTable('blog_posts')) {
            foreach (BlogPost::published()->get() as $p) {
                $urls[] = [
                    'loc' => $base.'/tin-tuc/'.$p->slug.'/',
                    'lastmod' => $p->updated_at?->toIso8601String(),
                    'priority' => '0.6',
                ];
            }
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'.PHP_EOL;
        foreach ($urls as $u) {
            $xml .= '  <url><loc>'.htmlspecialchars($u['loc']).'</loc>';
            if (! empty($u['lastmod'])) {
                $xml .= '<lastmod>'.$u['lastmod'].'</lastmod>';
            }
            $xml .= '<priority>'.$u['priority'].'</priority></url>'.PHP_EOL;
        }
        $xml .= '</urlset>';

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
