<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GoogleReview extends Model
{
    protected $fillable = [
        'branch_id', 'google_review_id', 'reviewer_name', 'reviewer_photo_url',
        'rating', 'comment', 'review_time', 'reply_comment', 'synced_at',
    ];

    protected $casts = [
        'rating' => 'integer',
        'review_time' => 'datetime',
        'synced_at' => 'datetime',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }
}
