<x-filament-panels::page>
    <form wire:submit="save" class="space-y-6 pb-24">
        {{ $this->form }}

        <x-filament::button type="submit" class="maha-save-fixed">
            Lưu thiết lập
        </x-filament::button>
    </form>
</x-filament-panels::page>
