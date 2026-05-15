<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'branch_id' => 'required|integer|exists:branches,id',
            'service_id' => 'required|integer|exists:services,id',
            'date' => 'required|date|after_or_equal:today',
            'time_slot' => 'required|string',
            'guest_name' => 'required|string|min:2|max:100',
            'guest_phone' => 'required|string|min:8|max:20',
            'guest_email' => 'nullable|email',
            'note' => 'nullable|string|max:500',
            'voucher_code' => 'nullable|string|max:32',
            'payment_method' => 'nullable|in:card,cash,vnpay,momo',
        ];
    }
}
