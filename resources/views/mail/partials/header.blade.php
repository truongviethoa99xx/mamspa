<tr>
    <td style="background-color:#2F3E2E; padding:28px 32px; border-radius:16px 16px 0 0;" align="center">
        @if($logoUrl ?? null)
            <img src="{{ $logoUrl }}" alt="{{ $site->brand_name ?: 'Mầm Spa' }}" height="40" style="height:40px; width:auto; display:block; margin:0 auto 8px;">
        @endif
        <div style="font-family:Georgia,'Playfair Display',serif; font-size:20px; letter-spacing:0.03em; color:#F6F3EF;">
            {{ $site->brand_name ?: 'Mầm Spa' }}
        </div>
    </td>
</tr>
