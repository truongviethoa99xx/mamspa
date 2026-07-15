<?php

namespace App\Services;

use App\Models\GoogleBusinessConnection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

/**
 * Client mỏng bọc quanh Google Business Profile APIs (Account Management,
 * Business Information, My Business v4) — quản lý access/refresh token và
 * gọi 3 endpoint cần cho việc đồng bộ review: accounts, locations, reviews.
 */
class GoogleBusinessService
{
    private const TOKEN_URL = 'https://oauth2.googleapis.com/token';

    private const SCOPE = 'https://www.googleapis.com/auth/business.manage';

    public function buildAuthUrl(string $state): string
    {
        $params = [
            'client_id' => config('services.google.client_id'),
            'redirect_uri' => config('services.google.business_redirect'),
            'response_type' => 'code',
            'scope' => self::SCOPE,
            'access_type' => 'offline',
            // Bắt buộc để Google trả refresh_token — nếu thiếu, lần kết nối lại
            // sau lần đầu sẽ không có refresh_token (Google chỉ cấp 1 lần).
            'prompt' => 'consent',
            'state' => $state,
        ];

        return 'https://accounts.google.com/o/oauth2/v2/auth?'.http_build_query($params);
    }

    /** @return array{access_token: string, refresh_token?: string, expires_in: int} */
    public function exchangeCode(string $code): array
    {
        $response = Http::asForm()->post(self::TOKEN_URL, [
            'code' => $code,
            'client_id' => config('services.google.client_id'),
            'client_secret' => config('services.google.client_secret'),
            'redirect_uri' => config('services.google.business_redirect'),
            'grant_type' => 'authorization_code',
        ]);

        $response->throw();

        return $response->json();
    }

    public function validAccessToken(): ?string
    {
        $connection = GoogleBusinessConnection::current();

        if (! $connection || ! $connection->isConnected()) {
            return null;
        }

        if ($connection->token_expires_at?->isFuture()) {
            return $connection->access_token;
        }

        return $this->refresh($connection);
    }

    private function refresh(GoogleBusinessConnection $connection): ?string
    {
        try {
            $response = Http::asForm()->post(self::TOKEN_URL, [
                'refresh_token' => $connection->refresh_token,
                'client_id' => config('services.google.client_id'),
                'client_secret' => config('services.google.client_secret'),
                'grant_type' => 'refresh_token',
            ]);
        } catch (Throwable $e) {
            Log::warning('Google Business token refresh failed', ['error' => $e->getMessage()]);

            return null;
        }

        if (! $response->successful()) {
            Log::warning('Google Business token refresh rejected', ['body' => $response->json()]);

            return null;
        }

        $body = $response->json();
        $connection->update([
            'access_token' => $body['access_token'],
            'token_expires_at' => now()->addSeconds($body['expires_in'] ?? 3600),
        ]);

        return $connection->access_token;
    }

    /** @return array<int, array{name: string}> */
    public function listAccounts(): array
    {
        $token = $this->validAccessToken();
        if (! $token) {
            return [];
        }

        $response = Http::withToken($token)->get('https://mybusinessaccountmanagement.googleapis.com/v1/accounts');

        if (! $response->successful()) {
            Log::warning('Google Business listAccounts failed', ['status' => $response->status()]);

            return [];
        }

        return $response->json('accounts', []);
    }

    /** @return array<int, array{name: string, title?: string}> */
    public function listLocations(string $accountName): array
    {
        $token = $this->validAccessToken();
        if (! $token) {
            return [];
        }

        $locations = [];
        $pageToken = null;

        do {
            $response = Http::withToken($token)->get(
                "https://mybusinessbusinessinformation.googleapis.com/v1/{$accountName}/locations",
                array_filter(['readMask' => 'name,title,storefrontAddress', 'pageToken' => $pageToken]),
            );

            if (! $response->successful()) {
                Log::warning('Google Business listLocations failed', ['status' => $response->status()]);
                break;
            }

            $body = $response->json();
            $locations = [...$locations, ...($body['locations'] ?? [])];
            $pageToken = $body['nextPageToken'] ?? null;
        } while ($pageToken);

        return $locations;
    }

    /** @return array<int, array<string, mixed>> Raw review objects theo định dạng My Business API v4. */
    public function listReviews(string $accountId, string $locationId): array
    {
        $token = $this->validAccessToken();
        if (! $token) {
            return [];
        }

        $reviews = [];
        $pageToken = null;

        do {
            $response = Http::withToken($token)->get(
                "https://mybusiness.googleapis.com/v4/accounts/{$accountId}/locations/{$locationId}/reviews",
                array_filter(['pageToken' => $pageToken]),
            );

            if (! $response->successful()) {
                Log::warning('Google Business listReviews failed', ['status' => $response->status(), 'location' => $locationId]);
                break;
            }

            $body = $response->json();
            $reviews = [...$reviews, ...($body['reviews'] ?? [])];
            $pageToken = $body['nextPageToken'] ?? null;
        } while ($pageToken);

        return $reviews;
    }

    /** "accounts/123456789" → "123456789" (id trần dùng cho endpoint reviews v4). */
    public static function numericId(string $resourceName): string
    {
        return Str::afterLast($resourceName, '/');
    }
}
