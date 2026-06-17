<x-filament-widgets::widget>
    <div class="maha-card maha-panel">
        <p class="maha-panel__title">Lịch hẹn hôm nay</p>
        <p class="maha-panel__sub">{{ $count }} lịch hẹn · {{ $today }}</p>

        @forelse ($appts as $a)
            <div class="maha-appt">
                <div class="maha-appt__time">
                    {{ $a['time'] }}
                    <small>{{ $a['pending'] ? 'chờ duyệt' : 'đã xác nhận' }}</small>
                </div>
                <div class="maha-appt__body">
                    <div class="maha-appt__name">{{ $a['name'] }}</div>
                    <div class="maha-appt__svc">{{ $a['service'] }}</div>
                </div>
            </div>
        @empty
            <div class="maha-empty">Chưa có lịch hẹn nào hôm nay.</div>
        @endforelse
    </div>
</x-filament-widgets::widget>
