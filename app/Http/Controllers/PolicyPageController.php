<?php

namespace App\Http\Controllers;

use App\Models\PolicyPage;
use Inertia\Inertia;
use Inertia\Response;

class PolicyPageController extends Controller
{
    public function index(): Response
    {
        $pages = PolicyPage::published()
            ->orderBy('name')
            ->get()
            ->map(fn (PolicyPage $page) => [
                'slug' => $page->slug,
                'name' => $page->name,
            ])
            ->values();

        return Inertia::render('ChinhSach/Index', [
            'pages' => $pages,
        ]);
    }

    public function show(PolicyPage $policyPage): Response
    {
        abort_unless($policyPage->is_published, 404);

        $other = PolicyPage::published()
            ->whereKeyNot($policyPage->getKey())
            ->orderBy('name')
            ->get()
            ->map(fn (PolicyPage $page) => [
                'slug' => $page->slug,
                'name' => $page->name,
            ])
            ->values();

        return Inertia::render('ChinhSach/Show', [
            'page' => [
                'slug' => $policyPage->slug,
                'name' => $policyPage->name,
                'content' => $policyPage->content,
                'featured_image' => $policyPage->featured_image,
                'updated_at' => $policyPage->updated_at?->toIso8601String(),
            ],
            'other' => $other,
        ]);
    }
}
