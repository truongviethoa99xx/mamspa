<?php

namespace App\Http\Controllers;

use App\Models\PolicyPage;
use Inertia\Inertia;
use Inertia\Response;

class PolicyPageController extends Controller
{
    public function show(string $slug): Response
    {
        $policyPage = PolicyPage::published()->where('slug', $slug)->firstOrFail();

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
