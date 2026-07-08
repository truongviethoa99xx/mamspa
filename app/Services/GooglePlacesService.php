<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class GooglePlacesService
{
    private const CACHE_HOURS = 6;

    /**
     * Đánh giá Google Maps thật của 1 địa điểm, qua Place Details API.
     * Cache theo place_id để tránh gọi API (tính phí) trên mỗi request.
     *
     * @return array{rating: float, total: int, url: ?string, reviews: array<int, array{name: string, content: string, rating: int, time: string}>}|null
     */
    public function reviews(string $placeId): ?array
    {
        $apiKey = config('services.google_places.api_key');
        if (! $apiKey) {
            return null;
        }

        return Cache::remember(
            "google_places_reviews:{$placeId}",
            now()->addHours(self::CACHE_HOURS),
            fn () => $this->fetch($placeId, $apiKey),
        );
    }

    private function fetch(string $placeId, string $apiKey): ?array
    {
        try {
            $response = Http::timeout(8)->get('https://maps.googleapis.com/maps/api/place/details/json', [
                'place_id' => $placeId,
                'fields' => 'rating,user_ratings_total,reviews,url',
                'language' => 'vi',
                'key' => $apiKey,
            ]);
        } catch (Throwable $e) {
            Log::warning('Google Places request failed', ['place_id' => $placeId, 'error' => $e->getMessage()]);

            return null;
        }

        if (! $response->successful()) {
            return null;
        }

        $body = $response->json();
        if (($body['status'] ?? null) !== 'OK') {
            Log::warning('Google Places API status not OK', ['place_id' => $placeId, 'status' => $body['status'] ?? null]);

            return null;
        }

        $result = $body['result'] ?? [];

        return [
            'rating' => (float) ($result['rating'] ?? 0),
            'total' => (int) ($result['user_ratings_total'] ?? 0),
            'url' => $result['url'] ?? null,
            'reviews' => collect($result['reviews'] ?? [])
                ->sortByDesc('time')
                ->map(fn (array $r) => [
                    'name' => $r['author_name'] ?? '',
                    'content' => $r['text'] ?? '',
                    'rating' => (int) ($r['rating'] ?? 5),
                    'time' => $r['relative_time_description'] ?? '',
                ])
                ->values()
                ->all(),
        ];
    }
}
