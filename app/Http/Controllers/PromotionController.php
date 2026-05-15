<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use Inertia\Inertia;
use Inertia\Response;

class PromotionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Promotions', [
            'promotions' => Promotion::active()->orderByDesc('starts_at')->get()->map(fn ($p) => [
                'id' => $p->id,
                'slug' => $p->slug,
                'title' => $p->title,
                'description' => $p->description,
                'image' => $p->image,
                'link' => $p->link,
                'starts_at' => $p->starts_at?->toIso8601String(),
                'ends_at' => $p->ends_at?->toIso8601String(),
            ])->all(),
        ]);
    }
}
