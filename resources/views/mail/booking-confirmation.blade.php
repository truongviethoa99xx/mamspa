@php
    $b = $booking;
@endphp
<x-mail::message>
# Cảm ơn bạn đã đặt lịch tại Maha Spa!

Mã booking: **{{ $b->code }}**

- **Khách hàng:** {{ $b->guest_name }} — {{ $b->guest_phone }}
- **Chi nhánh:** {{ $b->branch->getTranslation('name', 'vi') }} — {{ $b->branch->address }}
- **Dịch vụ:** {{ $b->service->getTranslation('name', 'vi') }} ({{ $b->service->duration }} phút)
- **Ngày:** {{ $b->date->format('d/m/Y') }} · **Giờ:** {{ $b->time_slot }}
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
