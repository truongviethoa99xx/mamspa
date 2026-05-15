<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Service::active()->with('branches');

        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }
        if ($branchSlug = $request->query('branch')) {
            $query->whereHas('branches', fn ($q) => $q->where('slug', $branchSlug));
        }

        return Inertia::render('Services/Index', [
            'filters' => $request->only('category', 'branch'),
            'services' => $query->orderByDesc('is_featured')->get()->map(fn ($s) => [
                'id' => $s->id, 'slug' => $s->slug, 'name' => $s->name,
                'description' => $s->description, 'category' => $s->category,
                'duration' => $s->duration, 'price' => $s->price,
                'is_featured' => $s->is_featured,
                'branches' => $s->branches->pluck('slug'),
            ])->all(),
            'branches' => Branch::where('is_active', true)->get()->map(fn ($b) => [
                'slug' => $b->slug, 'name' => $b->name,
            ])->all(),
        ]);
    }

    public function show(Service $service): Response
    {
        abort_unless($service->is_active, 404);
        $service->load('branches');

        return Inertia::render('Services/Show', [
            'service' => [
                'id' => $service->id,
                'slug' => $service->slug,
                'name' => $service->name,
                'description' => $service->description,
                'category' => $service->category,
                'duration' => $service->duration,
                'price' => $service->price,
                'ingredients' => $service->ingredients ?? [],
                'branches' => $service->branches->map(fn ($b) => [
                    'slug' => $b->slug, 'name' => $b->name,
                ])->all(),
            ],
        ]);
    }
}
