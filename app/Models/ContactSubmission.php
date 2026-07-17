<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    public const STATUS_NEW = 'new';

    public const STATUS_CONTACTED = 'contacted';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'branch',
        'subject',
        'message',
        'status',
    ];
}
