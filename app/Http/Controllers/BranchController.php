<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Services\GooglePlacesService;
use Inertia\Inertia;
use Inertia\Response;

class BranchController extends Controller
{
    public function show(Branch $branch, GooglePlacesService $places): Response
    {
        abort_unless($branch->is_active, 404);

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
                'page_content' => $branch->page_content ?? [],
                'google_reviews' => $this->googleReviews($branch, $places),
                'images' => $branch->getMedia('images')->map(fn ($media) => [
                    'url' => $media->getUrl(),
                    'alt' => $media->name,
                ])->all(),
            ],
        ]);
    }

    /**
     * Ưu tiên review đã đồng bộ qua Google Business Profile (toàn bộ, không giới hạn) —
     * nếu chưa có (chưa kết nối/chưa đồng bộ), dùng tạm Places API (tối đa 5 review) làm fallback.
     */
    private function googleReviews(Branch $branch, GooglePlacesService $places): ?array
    {
        $synced = $branch->googleReviews()->orderByDesc('review_time')->get();

        if ($synced->isNotEmpty()) {
            return [
                'rating' => round($synced->avg('rating'), 1),
                'total' => $synced->count(),
                'url' => $branch->google_place_id
                    ? "https://search.google.com/local/writereview?placeid={$branch->google_place_id}"
                    : null,
                'reviews' => $synced->map(fn ($review) => [
                    'name' => $review->reviewer_name,
                    'content' => $review->comment ?? '',
                    'rating' => $review->rating,
                    'time' => $review->review_time?->diffForHumans(),
                ])->all(),
            ];
        }

        return $branch->google_place_id ? $places->reviews($branch->google_place_id) : null;
    }
}
