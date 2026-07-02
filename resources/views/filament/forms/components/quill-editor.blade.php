@php
    use Filament\Support\Facades\FilamentAsset;
    use Filament\Support\Facades\FilamentView;

    $statePath = $getStatePath();
@endphp

<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">
    <div
        @if (FilamentView::hasSpaMode())
            {{-- format-ignore-start --}}x-load="visible || event (ax-modal-opened)"{{-- format-ignore-end --}}
        @else
            x-load
        @endif
        x-load-css="[
            @js(FilamentAsset::getStyleHref('quill-editor')),
            @js(FilamentAsset::getStyleHref('quill-editor-theme')),
        ]"
        x-load-src="{{ FilamentAsset::getAlpineComponentSrc('quill-editor') }}"
        x-data="quillEditorFormComponent({
                    state: $wire.{{ $applyStateBindingModifiers("\$entangle('{$statePath}')") }},
                })"
        wire:ignore
        {{ $getExtraAttributeBag()->class(['fi-quill-editor']) }}
    >
        <div x-ref="editor"></div>
    </div>
</x-dynamic-component>
