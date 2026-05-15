<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\BlogPost;
use App\Models\Service;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $base = config('app.url');
        $urls = [
            ['loc' => $base.'/', 'priority' => '1.0'],
            ['loc' => $base.'/services', 'priority' => '0.9'],
            ['loc' => $base.'/booking', 'priority' => '0.9'],
            ['loc' => $base.'/promotions', 'priority' => '0.7'],
            ['loc' => $base.'/blog', 'priority' => '0.7'],
            ['loc' => $base.'/gallery', 'priority' => '0.6'],
            ['loc' => $base.'/contact', 'priority' => '0.6'],
        ];

        foreach (Branch::where('is_active', true)->get() as $b) {
            $urls[] = ['loc' => $base.'/about-us/'.$b->slug, 'priority' => '0.8'];
        }
        foreach (Service::active()->get() as $s) {
            $urls[] = ['loc' => $base.'/services/'.$s->slug, 'priority' => '0.8'];
        }
        foreach (BlogPost::published()->get() as $p) {
            $urls[] = [
                'loc' => $base.'/blog/'.$p->slug,
                'lastmod' => $p->updated_at->toIso8601String(),
                'priority' => '0.6',
            ];
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'.PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'.PHP_EOL;
        foreach ($urls as $u) {
            $xml .= '  <url><loc>'.htmlspecialchars($u['loc']).'</loc>';
            if (! empty($u['lastmod'])) $xml .= '<lastmod>'.$u['lastmod'].'</lastmod>';
            $xml .= '<priority>'.$u['priority'].'</priority></url>'.PHP_EOL;
        }
        $xml .= '</urlset>';

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
