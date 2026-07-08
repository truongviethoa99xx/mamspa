<?php

namespace App\Filament\Pages;

use App\Filament\Concerns\RestrictsFilamentAccess;
use App\Models\Branch;
use App\Models\GoogleBusinessConnection;
use App\Models\User;
use App\Services\GoogleBusinessService;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Artisan;

class GoogleBusinessSettings extends Page
{
    use RestrictsFilamentAccess;

    protected static ?string $navigationIcon = 'heroicon-o-star';

    protected static ?string $navigationGroup = 'Hệ thống';

    protected static ?string $title = 'Google Business Profile';

    protected static ?string $navigationLabel = 'Google Reviews';

    protected static ?int $navigationSort = 20;

    protected static string $view = 'filament.pages.google-business-settings';

    public ?GoogleBusinessConnection $connection = null;

    /** @var array<int, array{name: string, title: string, address: string}> */
    public array $locations = [];

    /** @var array<string, int|null> keyed by location resource name → branch_id đã chọn */
    public array $mapping = [];

    protected static function allowedRoles(): array
    {
        return User::adminRoles();
    }

    public function mount(): void
    {
        $this->connection = GoogleBusinessConnection::current();

        if ($status = session('google_business_status')) {
            Notification::make()->title($status)->success()->send();
        }

        if ($error = session('google_business_error')) {
            Notification::make()->title($error)->danger()->send();
        }
    }

    public function branches(): Collection
    {
        return Branch::query()->orderBy('slug')->get();
    }

    public function loadLocations(GoogleBusinessService $google): void
    {
        if (! $this->connection?->isConnected()) {
            Notification::make()->title('Chưa kết nối Google Business Profile')->danger()->send();

            return;
        }

        if (! $this->connection->account_id) {
            $account = $google->listAccounts()[0] ?? null;

            if (! $account) {
                Notification::make()->title('Không tìm thấy tài khoản Google Business Profile nào')->danger()->send();

                return;
            }

            $this->connection->update([
                'account_id' => GoogleBusinessService::numericId($account['name']),
                'account_name' => $account['name'],
            ]);
        }

        $this->locations = collect($google->listLocations($this->connection->account_name))
            ->map(fn (array $location) => [
                'name' => $location['name'],
                'title' => $location['title'] ?? $location['name'],
                'address' => collect($location['storefrontAddress']['addressLines'] ?? [])->implode(', '),
            ])
            ->all();

        $branches = $this->branches();
        $this->mapping = [];
        foreach ($this->locations as $location) {
            $this->mapping[$location['name']] = $branches->firstWhere('google_location_id', $location['name'])?->id;
        }

        Notification::make()->title('Đã tải '.count($this->locations).' địa điểm từ Google')->success()->send();
    }

    public function saveMapping(): void
    {
        foreach ($this->mapping as $locationName => $branchId) {
            Branch::query()->where('google_location_id', $locationName)->update(['google_location_id' => null]);

            if ($branchId) {
                Branch::query()->whereKey($branchId)->update(['google_location_id' => $locationName]);
            }
        }

        Notification::make()->title('Đã lưu ánh xạ chi nhánh ↔ địa điểm Google')->success()->send();
    }

    public function syncNow(): void
    {
        Artisan::call('google-business:sync-reviews');

        Notification::make()->title('Đã chạy đồng bộ review')->body(trim(Artisan::output()) ?: null)->success()->send();
    }

    public function disconnect(): void
    {
        $this->connection?->delete();
        $this->connection = null;
        $this->locations = [];
        $this->mapping = [];

        Notification::make()->title('Đã ngắt kết nối Google Business Profile')->success()->send();
    }
}
