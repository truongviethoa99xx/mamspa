<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Branch;

class SlotService
{
    /** Số khách tối đa có thể phục vụ cùng một khung giờ (không quản lý theo từng slot cố định nữa). */
    private const CAPACITY = 4;

    private const DEFAULT_OPEN = '09:00';

    private const DEFAULT_CLOSE = '21:00';

    /**
     * Giờ mở/đóng cửa của chi nhánh, phân tích từ chuỗi `open_hours` (vd. "09:00 - 21:00").
     *
     * @return array{open: string, close: string}
     */
    public function openHours(int $branchId): array
    {
        $branch = Branch::findOrFail($branchId);

        if (! preg_match('/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/', (string) $branch->open_hours, $matches)) {
            return ['open' => self::DEFAULT_OPEN, 'close' => self::DEFAULT_CLOSE];
        }

        return ['open' => $matches[1], 'close' => $matches[2]];
    }

    /**
     * Khách có thể chọn tuỳ ý bất kỳ giờ nào trong khung giờ mở cửa của chi nhánh;
     * chỉ cần chưa vượt quá sức chứa tại đúng thời điểm đó trong ngày.
     */
    public function isSlotAvailable(int $branchId, string $date, string $timeSlot, int $needed = 1): bool
    {
        if (! $this->isWithinOpenHours($branchId, $timeSlot)) {
            return false;
        }

        $used = (int) ($this->guestsByTimeSlot($branchId, $date)[$timeSlot] ?? 0);

        return ($used + max(1, $needed)) <= self::CAPACITY;
    }

    private function isWithinOpenHours(int $branchId, string $timeSlot): bool
    {
        ['open' => $open, 'close' => $close] = $this->openHours($branchId);

        return $timeSlot >= $open && $timeSlot <= $close;
    }

    /**
     * Number of booked guests per time slot, counting booking_items
     * (legacy item-less bookings count as a single guest).
     *
     * @return array<string, int>
     */
    private function guestsByTimeSlot(int $branchId, string $date): array
    {
        return Booking::query()
            ->where('branch_id', $branchId)
            ->whereDate('date', $date)
            ->whereIn('status', ['pending', 'confirmed'])
            ->withCount('items')
            ->get(['id', 'time_slot'])
            ->groupBy('time_slot')
            ->map(fn ($group) => $group->sum(fn ($b) => max(1, $b->items_count)))
            ->toArray();
    }
}
