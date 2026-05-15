<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Inertia\Inertia;
use Inertia\Response;

class BranchController extends Controller
{
    public function show(Branch $branch): Response
    {
        abort_unless($branch->is_active, 404);

        $branch->load('services');

        return Inertia::render('AboutUs', [
            'branch' => [
                'id' => $branch->id,
                'slug' => $branch->slug,
                'name' => $branch->name,
                'address' => $branch->address,
                'phone' => $branch->phone,
                'open_hours' => $branch->open_hours,
                'lat' => $branch->lat,
                'lng' => $branch->lng,
                'services' => $branch->services->map(fn ($s) => [
                    'id' => $s->id, 'slug' => $s->slug, 'name' => $s->name,
                    'category' => $s->category, 'price' => $s->price, 'duration' => $s->duration,
                ])->all(),
            ],
        ]);
    }
}
