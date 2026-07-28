@php
    $s = $submission;
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
                <div style="display:inline-block; padding:4px 12px; border-radius:999px; background-color:#E9E2D5; color:#556B3F; font-size:12px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; margin-bottom:16px;">
                    Liên hệ mới
                </div>
                <h1 style="font-family:Georgia,'Playfair Display',serif; font-size:22px; color:#2F3E2E; margin:0 0 20px;">
                    {{ $s->subject }}
                </h1>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#333A31; line-height:1.9;">
                    <tr>
                        <td style="width:120px; color:#718255;">Họ tên</td>
                        <td><strong>{{ $s->name }}</strong></td>
                    </tr>
                    @if($s->email)
                    <tr>
                        <td style="color:#718255;">Email</td>
                        <td>{{ $s->email }}</td>
                    </tr>
                    @endif
                    @if($s->phone)
                    <tr>
                        <td style="color:#718255;">Điện thoại</td>
                        <td>{{ $s->phone }}</td>
                    </tr>
                    @endif
                    @if($s->branch)
                    <tr>
                        <td style="color:#718255;">Chi nhánh</td>
                        <td>{{ $s->branch }}</td>
                    </tr>
                    @endif
                    <tr>
                        <td style="color:#718255; vertical-align:top;">Nội dung</td>
                        <td style="white-space:pre-line;">{{ $s->message }}</td>
                    </tr>
                </table>

                <div style="margin-top:28px;">
                    <a href="{{ config('app.url').'/admin/contact-submissions/'.$s->id.'/edit' }}"
                       style="display:inline-block; background-color:#556B3F; color:#F6F3EF; text-decoration:none; font-size:14px; font-weight:600; padding:12px 24px; border-radius:10px;">
                        Xem trong CMS
                    </a>
                </div>
            </td>
        </tr>
        @include('mail.partials.footer', ['site' => $site])
    </table>
</body>
</html>
