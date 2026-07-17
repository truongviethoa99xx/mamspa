<x-filament-widgets::widget>
    <div class="maha-card maha-recent">
        <div class="maha-recent__head">
            <p class="maha-recent__title">Booking gần đây</p>
            <a class="maha-recent__link" href="{{ \App\Filament\Resources\BookingResource::getUrl() }}">Xem tất cả →</a>
        </div>

        <table class="maha-table">
            <thead>
                <tr>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Dịch vụ</th>
                    <th>Giá trị</th>
                    <th>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($rows as $r)
                    <tr>
                        <td class="maha-table__code">#{{ $r['code'] }}</td>
                        <td>
                            <div class="maha-cust">
                                <span class="maha-avatar" style="background: {{ $r['color'] }}">{{ $r['initials'] }}</span>
                                <span class="maha-cust__name">{{ $r['name'] }}</span>
                            </div>
                        </td>
                        <td>{{ $r['service'] }}</td>
                        <td class="maha-money">{{ $r['price'] }}</td>
                        <td><span class="maha-status maha-status--{{ $r['status'] }}">{{ $r['statusLabel'] }}</span></td>
                    </tr>
                @empty
                    <tr><td colspan="6" class="maha-empty">Chưa có booking nào.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</x-filament-widgets::widget>
