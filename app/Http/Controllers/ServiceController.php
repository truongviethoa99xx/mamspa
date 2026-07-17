<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Service::active();

        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }

        return Inertia::render('Services/Index', [
            'filters' => $request->only('category'),
            'services' => $query->orderByDesc('is_featured')->get()->map(fn ($s) => [
                'id' => $s->id, 'slug' => $s->slug, 'name' => $s->name,
                'description' => $s->description, 'category' => $s->category,
                'duration' => $s->duration, 'price' => $s->price,
                'is_featured' => $s->is_featured,
            ])->all(),
        ]);
    }

    public function show(Service $service): Response
    {
        abort_unless($service->is_active, 404);

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
            ],
        ]);
    }
}
