<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $page = Page::with('activeBlocks')->where('slug', 'home')->firstOrFail();

        $blocks = $page->activeBlocks->map(function ($block) {
            $data = $this->resolveBlockData($block);
            return [
                'id' => $block->id,
                'type' => $block->type,
                'order' => $block->order,
                'data' => $data,
            ];
        });

        return Inertia::render('Home', [
            'page' => [
                'slug' => $page->slug,
                'title' => $page->title,
                'seo_meta' => $page->seo_meta,
            ],
            'blocks' => $blocks,
        ]);
    }

    protected function resolveBlockData($block): array
    {
        $data = $block->data ?? [];

        if ($block->type === 'service_list' && ! empty($data['service_ids'])) {
            $services = Service::active()->whereIn('id', $data['service_ids'])->get()
                ->map(fn ($s) => [
                    'id' => $s->id,
                    'slug' => $s->slug,
                    'name' => $s->name,
                    'description' => $s->description,
                    'category' => $s->category,
                    'duration' => $s->duration,
                    'price' => $s->price,
                ])->all();
            $data['services'] = $services;
        }

        if ($block->type === 'branches') {
            $data['branches'] = \App\Models\Branch::where('is_active', true)->get()
                ->map(fn ($b) => [
                    'id' => $b->id, 'slug' => $b->slug, 'name' => $b->name,
                    'address' => $b->address, 'phone' => $b->phone,
                    'open_hours' => $b->open_hours,
                ])->all();
        }

        return $data;
    }
}
