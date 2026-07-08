<x-filament-panels::page>
    <x-filament::section>
        <x-slot name="heading">Trạng thái kết nối</x-slot>

        @if ($connection?->isConnected())
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <x-filament::badge color="success">Đã kết nối</x-filament::badge>
                    <p class="mt-2 text-sm text-gray-500">
                        Tài khoản Google Business Profile: {{ $connection->account_name ?? 'chưa tải danh sách địa điểm' }}
                    </p>
                </div>
                <div class="flex gap-2">
                    <x-filament::button wire:click="loadLocations" icon="heroicon-o-map-pin">
                        Tải danh sách địa điểm
                    </x-filament::button>
                    <x-filament::button wire:click="syncNow" color="gray" icon="heroicon-o-arrow-path">
                        Đồng bộ review ngay
                    </x-filament::button>
                    <x-filament::button wire:click="disconnect" color="danger" outlined
                        wire:confirm="Ngắt kết nối Google Business Profile? Review đã đồng bộ trước đó vẫn được giữ lại.">
                        Ngắt kết nối
                    </x-filament::button>
                </div>
            </div>
        @else
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <x-filament::badge color="gray">Chưa kết nối</x-filament::badge>
                    <p class="mt-2 text-sm text-gray-500">
                        Kết nối bằng tài khoản Google đang quản lý Google Business Profile của Mầm Spa để đồng bộ toàn bộ review thật (không giới hạn 5 như Places API).
                    </p>
                </div>
                <a href="{{ route('google-business.redirect') }}">
                    <x-filament::button icon="heroicon-o-link">
                        Kết nối Google Business Profile
                    </x-filament::button>
                </a>
            </div>
        @endif
    </x-filament::section>

    @if (! empty($locations))
        <x-filament::section class="mt-6">
            <x-slot name="heading">Ánh xạ địa điểm Google ↔ chi nhánh</x-slot>
            <x-slot name="description">Chọn chi nhánh tương ứng cho từng địa điểm Google, rồi bấm Lưu.</x-slot>

            <div class="space-y-4">
                @foreach ($locations as $location)
                    <div class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                        <div>
                            <p class="font-medium">{{ $location['title'] }}</p>
                            @if ($location['address'])
                                <p class="text-sm text-gray-500">{{ $location['address'] }}</p>
                            @endif
                        </div>
                        <select wire:model="mapping.{{ $location['name'] }}" class="fi-select-input rounded-lg border-gray-300 text-sm dark:border-gray-600 dark:bg-gray-800">
                            <option value="">— Bỏ qua —</option>
                            @foreach ($this->branches() as $branch)
                                <option value="{{ $branch->id }}">{{ $branch->slug }}</option>
                            @endforeach
                        </select>
                    </div>
                @endforeach
            </div>

            <div class="mt-4">
                <x-filament::button wire:click="saveMapping">
                    Lưu ánh xạ
                </x-filament::button>
            </div>
        </x-filament::section>
    @endif
</x-filament-panels::page>
