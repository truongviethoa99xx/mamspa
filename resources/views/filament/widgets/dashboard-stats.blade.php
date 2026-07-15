<x-filament-widgets::widget>
    <div class="maha-stats">
        @foreach ($stats as $s)
            <div class="maha-stat">
                <div class="maha-stat__icon {{ $s['iconMod'] }}">
                    <x-filament::icon :icon="$s['icon']" />
                </div>
                <div>
                    <div class="maha-stat__label">{{ $s['label'] }}</div>
                    <div class="maha-stat__value">{{ $s['value'] }}</div>
                </div>

                @if (isset($s['trend']))
                    <span class="maha-stat__trend maha-stat__trend--{{ $s['trend']['dir'] }}">
                        <x-filament::icon :icon="$s['trend']['dir'] === 'down' ? 'heroicon-m-arrow-trending-down' : 'heroicon-m-arrow-trending-up'" />
                        {{ $s['trend']['text'] }}
                    </span>
                @elseif (isset($s['note']))
                    <span class="maha-stat__trend maha-stat__trend--{{ $s['note']['mod'] }}">
                        @if ($s['note']['mod'] === 'warn')
                            <x-filament::icon icon="heroicon-m-exclamation-triangle" />
                        @else
                            <x-filament::icon icon="heroicon-m-check-circle" />
                        @endif
                        {{ $s['note']['text'] }}
                    </span>
                @endif
            </div>
        @endforeach
    </div>
</x-filament-widgets::widget>
