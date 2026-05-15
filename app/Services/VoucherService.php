<?php

namespace App\Services;

use App\Models\Voucher;

class VoucherService
{
    public function validateCode(string $code, int $orderValue): ?Voucher
    {
        $voucher = Voucher::where('code', $code)->first();
        if (! $voucher || ! $voucher->isUsable($orderValue)) {
            return null;
        }
        return $voucher;
    }

    public function applyDiscount(Voucher $voucher, int $orderValue): int
    {
        return $voucher->discountFor($orderValue);
    }
}
