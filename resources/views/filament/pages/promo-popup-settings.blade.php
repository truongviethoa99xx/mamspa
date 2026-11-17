<x-filament-panels::page>
    <form wire:submit="save" class="space-y-6 pb-24">
        {{ $this->form }}

        <div class="flex justify-end">
            <x-filament::button type="submit" class="maha-save-fixed">
                Lưu thay đổi
            </x-filament::button>
        </div>
    </form>
</x-filament-panels::page>
