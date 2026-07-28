@php
    $b = $booking;
@endphp
<x-mail::message>
# Có lịch đặt mới #{{ $b->code }}

- **Khách hàng:** {{ $b->guest_name }} — {{ $b->guest_phone }}
@if($b->guest_email)
- **Email khách:** {{ $b->guest_email }}
@endif
@if($b->branch)
- **Chi nhánh:** {{ $b->branch }}
@endif
- **Ngày:** {{ $b->date->format('d/m/Y') }} · **Giờ:** {{ $b->time_slot }}

**Dịch vụ ({{ $b->items->count() ?: 1 }} khách):**
@forelse($b->items as $item)
- {{ strip_tags($item->service->getTranslation('name', 'vi')) }} ({{ $item->service->duration }} phút)@if($item->gender) — {{ $item->gender === 'male' ? 'Khách Nam' : 'Khách Nữ' }}@endif — {{ number_format($item->price, 0, ',', '.') }} VND
@empty
- {{ strip_tags($b->service->getTranslation('name', 'vi')) }} ({{ $b->service->duration }} phút)
@endforelse

- **Tổng tiền:** {{ number_format($b->total_price, 0, ',', '.') }} VND
- **Trạng thái:** {{ $b->status }}

@if($b->note)
**Ghi chú:** {{ $b->note }}
@endif

<x-mail::button :url="config('app.url').'/admin/bookings/'.$b->id.'/edit'">
    Xem trong CMS
</x-mail::button>

{{ config('app.name') }}
</x-mail::message>
