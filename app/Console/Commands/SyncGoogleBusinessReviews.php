<?php

namespace App\Console\Commands;

use App\Models\Branch;
use App\Models\GoogleBusinessConnection;
use App\Models\GoogleReview;
use App\Services\GoogleBusinessService;
use Illuminate\Console\Command;

class SyncGoogleBusinessReviews extends Command
{
    protected $signature = 'google-business:sync-reviews';

    protected $description = 'Đồng bộ review Google Business Profile thật cho các chi nhánh đã ánh xạ location';

    public function handle(GoogleBusinessService $google): int
    {
        $connection = GoogleBusinessConnection::current();

        if (! $connection || ! $connection->isConnected()) {
            $this->warn('Chưa kết nối Google Business Profile — bỏ qua đồng bộ.');

            return self::SUCCESS;
        }

        $branches = Branch::query()->whereNotNull('google_location_id')->get();

        if ($branches->isEmpty()) {
            $this->warn('Chưa có chi nhánh nào được ánh xạ tới Google location — bỏ qua đồng bộ.');

            return self::SUCCESS;
        }

        foreach ($branches as $branch) {
            $this->syncBranch($google, $connection, $branch);
        }

        return self::SUCCESS;
    }

    private function syncBranch(GoogleBusinessService $google, GoogleBusinessConnection $connection, Branch $branch): void
    {
        $reviews = $google->listReviews($connection->account_id, GoogleBusinessService::numericId($branch->google_location_id));
        $now = now();

        foreach ($reviews as $review) {
            GoogleReview::updateOrCreate(
                ['google_review_id' => $review['reviewId'] ?? $review['name']],
                [
                    'branch_id' => $branch->id,
                    'reviewer_name' => $review['reviewer']['displayName'] ?? 'Khách hàng Google',
                    'reviewer_photo_url' => $review['reviewer']['profilePhotoUrl'] ?? null,
                    'rating' => self::ratingToInt($review['starRating'] ?? 'FIVE'),
                    'comment' => $review['comment'] ?? null,
                    'review_time' => $review['createTime'] ?? null,
                    'reply_comment' => $review['reviewReply']['comment'] ?? null,
                    'synced_at' => $now,
                ],
            );
        }

        $this->info(sprintf('Đã đồng bộ %d review cho chi nhánh %s.', count($reviews), $branch->slug));
    }

    private static function ratingToInt(string $rating): int
    {
        return match ($rating) {
            'ONE' => 1,
            'TWO' => 2,
            'THREE' => 3,
            'FOUR' => 4,
            'FIVE' => 5,
            default => 5,
        };
    }
}
