<tr>
    <td style="padding:20px 32px 32px;" align="center">
        <div style="font-size:13px; color:#8C9A6B; line-height:1.6;">
            @if($site->hotline)
                Hotline: {{ $site->hotline }}<br>
            @endif
            @if($site->address)
                {{ $site->address }}<br>
            @endif
            © {{ date('Y') }} {{ $site->brand_name ?: 'Mầm Spa' }}
        </div>
    </td>
</tr>
