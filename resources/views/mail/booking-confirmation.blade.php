@php
    $b = $booking;
    $logoUrl = $site->logo_path ? asset('storage/'.$site->logo_path) : null;
@endphp
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $site->brand_name ?: 'Mầm Spa' }}</title>
</head>
<body style="margin:0; padding:32px 16px; background-color:#F6F3EF; font-family:Verdana,Geneva,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; margin:0 auto; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(47,62,46,0.08);">
        @include('mail.partials.header', ['site' => $site, 'logoUrl' => $logoUrl])
        <tr>
            <td style="padding:32px;">
                <h1 style="font-family:Georgia,'Playfair Display',serif; font-size:22px; color:#2F3E2E; margin:0 0 8px;">
                    Cảm ơn bạn đã đặt lịch!
                </h1>
                <p style="font-size:14px; color:#718255; margin:0 0 20px;">
                    Mã booking: <strong style="color:#556B3F;">{{ $b->code }}</strong>
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#333A31; line-height:1.9;">
                    <tr>
                        <td style="width:120px; color:#718255;">Khách hàng</td>
                        <td><strong>{{ $b->guest_name }}</strong> — {{ $b->guest_phone }}</td>
                    </tr>
                    @if($site->address)
                    <tr>
                        <td style="color:#718255;">Địa chỉ</td>
                        <td>{{ $site->address }}</td>
                    </tr>
                    @endif
                    <tr>
                        <td style="color:#718255;">Ngày · Giờ</td>
                        <td>{{ $b->date->format('d/m/Y') }} · {{ $b->time_slot }}</td>
                    </tr>
                    <tr>
                        <td style="color:#718255; vertical-align:top;">Dịch vụ</td>
                        <td>
                            @forelse($b->items as $item)
                                {{ strip_tags($item->service->getTranslation('name', 'vi')) }} ({{ $item->service->duration }} phút)@if($item->gender) — {{ $item->gender === 'male' ? 'Khách Nam' : 'Khách Nữ' }}@endif<br>
                            @empty
                                {{ strip_tags($b->service->getTranslation('name', 'vi')) }} ({{ $b->service->duration }} phút)
                            @endforelse
                        </td>
                    </tr>
                    <tr>
                        <td style="color:#718255;">Trạng thái</td>
                        <td>{{ $b->status }}</td>
                    </tr>
                    @if($b->note)
                    <tr>
                        <td style="color:#718255; vertical-align:top;">Ghi chú</td>
                        <td>{{ $b->note }}</td>
                    </tr>
                    @endif
                </table>

                <div style="margin-top:28px;">
                    <a href="{{ config('app.url').'/my-bookings' }}"
                       style="display:inline-block; background-color:#556B3F; color:#F6F3EF; text-decoration:none; font-size:14px; font-weight:600; padding:12px 24px; border-radius:10px;">
                        Quản lý booking
                    </a>
                </div>

                <p style="font-size:13px; color:#8C9A6B; margin-top:24px;">
                    Nếu cần hỗ trợ, vui lòng gọi hotline {{ $site->hotline ?: '(+84) 934 743 026' }}.
                </p>
            </td>
        </tr>
        @include('mail.partials.footer', ['site' => $site])
    </table>
</body>
</html>
