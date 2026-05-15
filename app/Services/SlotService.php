<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Slot;
use Illuminate\Support\Carbon;

class SlotService
{
    /**
     * Trả về danh sách khung giờ trống của 1 chi nhánh trong 1 ngày.
     * Mỗi slot kiểm tra số booking đang chiếm (status pending/confirmed) so với capacity.
     *
     * @return array<int, array{start: string, end: string, available: int, capacity: int}>
     */
    public function availableSlots(int $branchId, string $date): array
    {
        $slots = Slot::where('branch_id', $branchId)
            ->where('is_active', true)
            ->orderBy('start_time')
            ->get();

        $bookingsByTime = Booking::query()
            ->where('branch_id', $branchId)
            ->whereDate('date', $date)
            ->whereIn('status', ['pending', 'confirmed'])
            ->selectRaw('time_slot, COUNT(*) as cnt')
            ->groupBy('time_slot')
            ->pluck('cnt', 'time_slot')
            ->toArray();

        return $slots->map(function ($slot) use ($bookingsByTime) {
            $key = Carbon::parse($slot->start_time)->format('H:i');
            $used = (int) ($bookingsByTime[$key] ?? 0);
            return [
                'start' => $key,
                'end' => Carbon::parse($slot->end_time)->format('H:i'),
                'capacity' => $slot->capacity,
                'available' => max(0, $slot->capacity - $used),
            ];
        })->toArray();
    }

    public function isSlotAvailable(int $branchId, string $date, string $timeSlot): bool
    {
        $slot = Slot::where('branch_id', $branchId)
            ->where('start_time', $timeSlot)
            ->where('is_active', true)
            ->first();

        if (! $slot) {
            return false;
        }

        $used = Booking::where('branch_id', $branchId)
            ->whereDate('date', $date)
            ->where('time_slot', $timeSlot)
            ->whereIn('status', ['pending', 'confirmed'])
            ->count();

        return $used < $slot->capacity;
    }
}
