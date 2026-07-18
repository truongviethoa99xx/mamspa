<?php

namespace App\Http\Requests;

use App\Models\Booking;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Normalise the legacy single-service payload (e.g. the inline home-page
     * booking block) into the multi-guest `items[]` shape.
     */
    protected function prepareForValidation(): void
    {
        if (! $this->has('items') && $this->filled('service_id')) {
            $this->merge([
                'items' => [['service_id' => $this->input('service_id')]],
            ]);
        }
    }

    public function rules(): array
    {
        return [
            'items' => 'required|array|min:1|max:20',
            'items.*.service_id' => 'required|integer|exists:services,id',
            'items.*.gender' => 'nullable|in:male,female',
            'branch' => ['required', 'string', Rule::in(Booking::BRANCHES)],
            'date' => 'required|date|after_or_equal:today',
            'time_slot' => 'required|string',
            'guest_name' => 'required|string|min:2|max:100',
            'guest_phone' => 'required|string|min:8|max:20',
            'guest_email' => ['nullable', 'email', 'not_regex:/[\r\n]/'],
            'contact_channel' => 'nullable|in:zalo,whatsapp,phone',
            'contact_value' => 'nullable|string|max:100',
            'note' => 'nullable|string|max:3000',
            'voucher_code' => 'nullable|string|max:32',
            'payment_method' => 'nullable|in:card,cash,vnpay,momo',
        ];
    }
}
