<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Models\User;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Livewire\WithFileUploads;

/**
 * Tổng hợp toàn bộ ảnh/video đã upload trên disk "public" (quét trực tiếp storage,
 * không phụ thuộc field nào — nên không bỏ sót ảnh dù nằm ở bất kỳ trang CMS nào).
 * Tải thêm khi cuộn xuống (infinite scroll) thay vì phân trang bấm số trang.
 * Cho phép upload nhanh + xoá file trực tiếp tại đây (không thay thế các field ảnh
 * gắn với nội dung cụ thể, ví dụ "Ảnh khách hàng" ở /admin/home-page-settings —
 * ảnh upload ở đây chỉ vào thư viện chung, không tự gắn vào trang chủ).
 */
class MediaLibrary extends Page
{
    use RestrictsFilamentAccess;
    use WithFileUploads;

    protected static ?string $navigationIcon = 'heroicon-o-photo';

    protected static ?string $navigationGroup = 'Nội dung';

    protected static ?string $navigationLabel = 'Thư viện';

    protected static ?string $title = 'Thư viện ảnh & video';

    protected static ?int $navigationSort = 20;

    protected static string $view = 'filament.pages.media-library';

    public string $search = '';

    /** all | image | video */
    public string $type = 'all';

    /** Số item đang hiển thị — tăng dần mỗi lần cuộn tới đáy. */
    public int $loaded = self::BATCH_SIZE;

    /** @var \Livewire\Features\SupportFileUploads\TemporaryUploadedFile[] */
    public array $newFiles = [];

    private const BATCH_SIZE = 24;

    private const UPLOAD_DIRECTORY = 'library';

    private const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];

    private const VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov', 'avi'];

    protected static function allowedRoles(): array
    {
        return User::contentRoles();
    }

    public function updatedSearch(): void
    {
        $this->loaded = self::BATCH_SIZE;
    }

    public function updatedType(): void
    {
        $this->loaded = self::BATCH_SIZE;
    }

    public function loadMore(): void
    {
        $this->loaded += self::BATCH_SIZE;
    }

    public function uploadFiles(): void
    {
        $this->validate([
            'newFiles' => ['required', 'array', 'min:1'],
            'newFiles.*' => ['file', 'max:51200', 'mimes:jpg,jpeg,png,webp,gif,svg,mp4,webm,mov,avi'],
        ]);

        foreach ($this->newFiles as $file) {
            $file->store(self::UPLOAD_DIRECTORY, 'public');
        }

        $count = count($this->newFiles);
        $this->newFiles = [];
        $this->loaded = self::BATCH_SIZE;

        Notification::make()
            ->success()
            ->title($count > 1 ? "Đã tải lên {$count} tệp" : 'Đã tải lên 1 tệp')
            ->send();
    }

    public function delete(string $path): void
    {
        Storage::disk('public')->delete($path);

        Notification::make()->success()->title('Đã xoá tệp')->send();
    }

    public function media(): Collection
    {
        return $this->allFiltered()->take($this->loaded)->values();
    }

    public function total(): int
    {
        return $this->allFiltered()->count();
    }

    public function hasMore(): bool
    {
        return $this->loaded < $this->total();
    }

    private function allFiltered(): Collection
    {
        $disk = Storage::disk('public');
        $allExtensions = [...self::IMAGE_EXTENSIONS, ...self::VIDEO_EXTENSIONS];

        return collect($disk->allFiles())
            ->filter(fn (string $path) => in_array(strtolower(pathinfo($path, PATHINFO_EXTENSION)), $allExtensions, true))
            ->map(function (string $path) use ($disk) {
                $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
                $isVideo = in_array($ext, self::VIDEO_EXTENSIONS, true);
                $folder = dirname($path);

                return [
                    'path' => $path,
                    'url' => $disk->url($path),
                    'name' => basename($path),
                    'folder' => $folder === '.' ? '/' : $folder,
                    'type' => $isVideo ? 'video' : 'image',
                    'size' => $this->formatBytes($disk->size($path)),
                    'modified' => $disk->lastModified($path),
                ];
            })
            ->when($this->type !== 'all', fn (Collection $c) => $c->where('type', $this->type))
            ->when($this->search !== '', function (Collection $c) {
                $needle = strtolower($this->search);

                return $c->filter(
                    fn (array $item) => str_contains(strtolower($item['name']), $needle)
                        || str_contains(strtolower($item['folder']), $needle),
                );
            })
            ->sortByDesc('modified')
            ->values();
    }

    private function formatBytes(int $bytes): string
    {
        if ($bytes < 1024) {
            return $bytes.' B';
        }
        if ($bytes < 1024 * 1024) {
            return round($bytes / 1024, 1).' KB';
        }

        return round($bytes / (1024 * 1024), 1).' MB';
    }
}
