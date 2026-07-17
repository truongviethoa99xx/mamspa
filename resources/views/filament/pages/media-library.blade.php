<x-filament-panels::page>
    <div
        class="dark:bg-gray-800 dark:border-gray-700"
        style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.875rem; padding: 0.875rem 1rem; margin-bottom: 0.5rem;"
    >
        <div
            class="dark:bg-gray-900"
            style="display: inline-flex; flex-wrap: nowrap; align-items: center; gap: 2px; background: #f3f4f6; padding: 3px; border-radius: 9999px; flex-shrink: 0;"
        >
            @foreach (['all' => 'Tất cả', 'image' => 'Ảnh', 'video' => 'Video'] as $value => $label)
                <button
                    type="button"
                    wire:click="$set('type', '{{ $value }}')"
                    @class([
                        'dark:text-gray-300 dark:hover:text-white' => $type !== $value,
                    ])
                    style="white-space: nowrap; padding: 0.4rem 1.1rem; border-radius: 9999px; font-size: 0.8125rem; font-weight: 600; transition: all .15s ease; border: none; cursor: pointer;
                        {{ $type === $value
                            ? 'background: #556B3F; color: #ffffff; box-shadow: 0 1px 2px rgba(0,0,0,.08);'
                            : 'background: transparent; color: #4b5563;' }}"
                >
                    {{ $label }}
                </button>
            @endforeach
        </div>

        <div style="position: relative; flex: 1 1 240px; max-width: 22rem;">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); width: 1rem; height: 1rem; color: #9ca3af; pointer-events: none;"
            >
                <circle cx="9" cy="9" r="6" />
                <path d="M17 17l-3.5-3.5" stroke-linecap="round" />
            </svg>
            <input
                type="search"
                wire:model.live.debounce.400ms="search"
                placeholder="Tìm theo tên file hoặc thư mục..."
                class="dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
                style="width: 100%; padding: 0.5rem 0.75rem 0.5rem 2.25rem; border-radius: 0.6rem; border: 1px solid #d1d5db; font-size: 0.8125rem; outline: none;"
            />
        </div>

        <label
            for="media-library-upload-input"
            class="dark:hover:bg-primary-400"
            style="display: inline-flex; align-items: center; gap: 0.4rem; white-space: nowrap; padding: 0.5rem 1.1rem; border-radius: 9999px; font-size: 0.8125rem; font-weight: 600; background: #556B3F; color: #ffffff; cursor: pointer; flex-shrink: 0; transition: background-color .15s ease;"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.75" style="width: 1rem; height: 1rem;">
                <path d="M10 3v10M5.5 8.5 10 4l4.5 4.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4 14.5v.75A1.75 1.75 0 0 0 5.75 17h8.5A1.75 1.75 0 0 0 16 15.25v-.75" stroke-linecap="round" />
            </svg>
            Tải ảnh/video lên
            <input
                id="media-library-upload-input"
                type="file"
                multiple
                wire:model="newFiles"
                accept="image/*,video/*"
                style="display: none;"
            />
        </label>
    </div>

    <div
        wire:loading
        wire:target="newFiles"
        style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; margin-bottom: 0.5rem; border-radius: 0.75rem; background: #f3f4f6; color: #4b5563; font-size: 0.8125rem;"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" style="width: 1rem; height: 1rem; animation: spin 0.8s linear infinite; flex-shrink: 0;">
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" stroke-opacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>
        Đang chuẩn bị tệp...
    </div>

    @if ($newFiles)
        <div
            style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; margin-bottom: 0.5rem; border-radius: 0.75rem; background: #eef1e9; border: 1px solid #d7ded0;"
        >
            <span style="font-size: 0.8125rem; color: #3f4a35; font-weight: 600;">
                Đã chọn {{ count($newFiles) }} tệp
            </span>
            <button
                type="button"
                wire:click="uploadFiles"
                wire:loading.attr="disabled"
                wire:target="uploadFiles"
                style="padding: 0.4rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; background: #556B3F; color: #fff; border: none; cursor: pointer;"
            >
                <span wire:loading.remove wire:target="uploadFiles">Xác nhận tải lên</span>
                <span wire:loading wire:target="uploadFiles">Đang tải lên...</span>
            </button>
            <button
                type="button"
                wire:click="$set('newFiles', [])"
                wire:loading.attr="disabled"
                wire:target="uploadFiles"
                style="padding: 0.4rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; background: transparent; color: #6b7280; border: 1px solid #d1d5db; cursor: pointer;"
            >
                Huỷ
            </button>
        </div>
    @endif

    @error('newFiles')
        <p style="color: #dc2626; font-size: 0.8125rem; margin-bottom: 0.5rem;">{{ $message }}</p>
    @enderror
    @error('newFiles.*')
        <p style="color: #dc2626; font-size: 0.8125rem; margin-bottom: 0.5rem;">{{ $message }}</p>
    @enderror

    @php($items = $this->media())
    @php($total = $this->total())

    @if ($items->isEmpty())
        <div style="margin-top: 2.5rem; border-radius: 0.75rem; border: 1px dashed #d1d5db; padding: 3rem; text-align: center; color: #6b7280;">
            Không tìm thấy ảnh/video nào khớp.
        </div>
    @else
        <p style="margin-bottom: 1rem; font-size: 0.75rem; color: #6b7280;">
            Đang hiển thị {{ $items->count() }} / {{ $total }} tệp
        </p>
        <div class="mm-media-grid" style="margin-top: 1.5rem;">
            @foreach ($items as $item)
                <div
                    x-data="{ copied: false }"
                    style="display: flex; flex-direction: column; overflow: hidden; border-radius: 0.75rem; border: 1px solid #e5e7eb; background: #ffffff; box-shadow: 0 1px 2px rgba(0,0,0,.05);"
                >
                    <div
                        style="position: relative; width: 100%; aspect-ratio: 1 / 1; overflow: hidden; background-color: #f3f4f6;"
                    >
                        @if ($item['type'] === 'video')
                            <video
                                src="{{ $item['url'] }}"
                                style="position: absolute; inset: 0; height: 100%; width: 100%; object-fit: cover;"
                                muted
                                preload="metadata"
                            ></video>
                            <span
                                class="pointer-events-none"
                                style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background-color: rgba(0,0,0,0.2);"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="h-10 w-10 drop-shadow">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                        @else
                            <img
                                src="{{ $item['url'] }}"
                                alt="{{ $item['name'] }}"
                                loading="lazy"
                                style="position: absolute; inset: 0; height: 100%; width: 100%; object-fit: cover;"
                            />
                        @endif
                    </div>

                    <div style="display: flex; flex: 1 1 auto; flex-direction: column; gap: 0.25rem; padding: 0.75rem;">
                        <p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; font-weight: 600; color: #111827;" title="{{ $item['name'] }}">
                            {{ $item['name'] }}
                        </p>
                        <p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; color: #6b7280;" title="{{ $item['folder'] }}">
                            {{ $item['folder'] }} · {{ $item['size'] }}
                        </p>

                        <div style="margin-top: 0.5rem; display: flex; gap: 0.4rem;">
                            <a
                                href="{{ $item['url'] }}"
                                target="_blank"
                                rel="noopener"
                                class="mm-btn mm-btn-outline"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" style="width: 0.8rem; height: 0.8rem; flex-shrink: 0;">
                                    <path d="M1.5 10S4.5 4.5 10 4.5 18.5 10 18.5 10 15.5 15.5 10 15.5 1.5 10 1.5 10Z" stroke-linecap="round" stroke-linejoin="round" />
                                    <circle cx="10" cy="10" r="2.1" />
                                </svg>
                                Xem bự
                            </a>
                            <button
                                type="button"
                                x-on:click="
                                    navigator.clipboard.writeText('{{ $item['url'] }}');
                                    copied = true;
                                    setTimeout(() => (copied = false), 1500);
                                "
                                class="mm-btn mm-btn-copy"
                                :class="copied ? 'mm-btn-copy--done' : ''"
                            >
                                <svg x-show="!copied" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" style="width: 0.8rem; height: 0.8rem; flex-shrink: 0;">
                                    <rect x="7.25" y="7.25" width="9" height="9" rx="1.5" />
                                    <path d="M12.75 7.25V5.75A1.5 1.5 0 0 0 11.25 4.25h-7A1.5 1.5 0 0 0 2.75 5.75v7a1.5 1.5 0 0 0 1.5 1.5h1.5" stroke-linecap="round" />
                                </svg>
                                <svg x-show="copied" x-cloak xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" style="width: 0.8rem; height: 0.8rem; flex-shrink: 0;">
                                    <path d="M4 10.5 8 14.5 16 5.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span x-show="!copied">Copy link</span>
                                <span x-show="copied" x-cloak>Đã copy!</span>
                            </button>
                            <button
                                type="button"
                                wire:click="delete('{{ $item['path'] }}')"
                                wire:confirm="Xoá vĩnh viễn file này? Không thể hoàn tác."
                                title="Xoá tệp"
                                class="mm-btn-icon"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" style="width: 0.9rem; height: 0.9rem;">
                                    <path d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m2 0-.6 9.2A1.5 1.5 0 0 1 11.9 16.6H8.1a1.5 1.5 0 0 1-1.5-1.4L6 6" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        @if ($this->hasMore())
            <div
                wire:key="load-more-sentinel-{{ $this->loaded }}"
                x-data
                x-init="
                    let observer = new IntersectionObserver((entries) => {
                        if (entries[0].isIntersecting) {
                            $wire.loadMore();
                        }
                    }, { rootMargin: '600px' });
                    observer.observe($el);
                "
                style="height: 1px;"
            ></div>

            <div
                wire:loading.flex
                wire:target="loadMore"
                style="display: none; align-items: center; justify-content: center; gap: 0.5rem; padding: 1.5rem 0; color: #6b7280; font-size: 0.8125rem;"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" style="width: 1rem; height: 1rem; animation: spin 0.8s linear infinite;">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" stroke-opacity="0.25" />
                    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                </svg>
                Đang tải thêm...
            </div>
        @else
            <p style="margin-top: 1.5rem; text-align: center; font-size: 0.75rem; color: #9ca3af;">— Đã hiển thị toàn bộ —</p>
        @endif
    @endif

    <style>
        @keyframes spin { to { transform: rotate(360deg); } }

        .mm-media-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
        }

        @media (min-width: 640px) {
            .mm-media-grid {
                grid-template-columns: repeat(4, minmax(0, 1fr));
            }
        }

        .mm-btn {
            display: inline-flex;
            flex: 1;
            align-items: center;
            justify-content: center;
            gap: 0.3rem;
            padding: 0.4rem 0.5rem;
            border-radius: 0.5rem;
            border: 1px solid transparent;
            font-size: 0.75rem;
            font-weight: 600;
            line-height: 1;
            cursor: pointer;
            text-decoration: none;
            transition: background-color .15s ease, border-color .15s ease, color .15s ease, transform .1s ease;
        }
        .mm-btn:active { transform: scale(0.96); }

        .mm-btn-outline {
            background: #ffffff;
            border-color: #e5e7eb;
            color: #4b5563;
        }
        .mm-btn-outline:hover { background: #f9fafb; border-color: #d1d5db; color: #374151; }

        .mm-btn-copy {
            background: #556B3F;
            border-color: #556B3F;
            color: #ffffff;
        }
        .mm-btn-copy:hover { background: #425436; border-color: #425436; }
        .mm-btn-copy--done,
        .mm-btn-copy--done:hover {
            background: #ecfdf5;
            border-color: #a7f3d0;
            color: #15803d;
        }

        .mm-btn-icon {
            flex: 0 0 auto;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            border-radius: 0.5rem;
            border: 1px solid transparent;
            background: #fef2f2;
            color: #dc2626;
            cursor: pointer;
            transition: background-color .15s ease;
        }
        .mm-btn-icon:hover { background: #fecaca; }
        .mm-btn-icon:active { transform: scale(0.94); }
    </style>
</x-filament-panels::page>
