@php
    $b = $booking;
@endphp
<x-mail::message>
# Cảm ơn bạn đã đặt lịch tại Mầm Spa!

Mã booking: **{{ $b->code }}**

- **Khách hàng:** {{ $b->guest_name }} — {{ $b->guest_phone }}
- **Chi nhánh:** {{ $b->branch->getTranslation('name', 'vi') }} — {{ $b->branch->address }}
- **Ngày:** {{ $b->date->format('d/m/Y') }} · **Giờ:** {{ $b->time_slot }}

**Dịch vụ ({{ $b->items->count() ?: 1 }} khách):**
@forelse($b->items as $item)
- {{ $item->service->getTranslation('name', 'vi') }} ({{ $item->service->duration }} phút)@if($item->gender) — {{ $item->gender === 'male' ? 'Khách Nam' : 'Khách Nữ' }}@endif — {{ number_format($item->price, 0, ',', '.') }} VND
@empty
- {{ $b->service->getTranslation('name', 'vi') }} ({{ $b->service->duration }} phút)
@endforelse

- **Tổng tiền:** {{ number_format($b->total_price, 0, ',', '.') }} VND
- **Trạng thái:** {{ $b->status }}

@if($b->note)
**Ghi chú:** {{ $b->note }}
@endif

<x-mail::button :url="config('app.url').'/my-bookings'">
    Quản lý booking
</x-mail::button>

Nếu cần hỗ trợ, vui lòng gọi hotline (+84) 934 743 026.

Trân trọng,<br>
{{ config('app.name') }}
</x-mail::message>
