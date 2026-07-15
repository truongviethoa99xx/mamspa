<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $branches = Branch::where('is_active', true)->get();

        $images = $branches->flatMap(function ($branch) {
            return $branch->getMedia()->map(fn ($m) => [
                'src' => $m->getUrl(),
                'branch' => $branch->slug,
            ]);
        })->values()->all();

        return Inertia::render('Gallery', [
            'images' => $images,
        ]);
    }
}
