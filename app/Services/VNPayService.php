<?php

namespace App\Services;

use App\Models\Booking;

class VNPayService
{
    public function createPaymentUrl(Booking $booking, string $returnUrl): string
    {
        $tmnCode = config('services.vnpay.tmn_code');
        $hashSecret = config('services.vnpay.hash_secret');
        $vnpUrl = config('services.vnpay.url');

        $data = [
            'vnp_Version' => '2.1.0',
            'vnp_TmnCode' => $tmnCode,
            'vnp_Amount' => $booking->total_price * 100,
            'vnp_Command' => 'pay',
            'vnp_CreateDate' => now()->format('YmdHis'),
            'vnp_CurrCode' => 'VND',
            'vnp_IpAddr' => request()->ip(),
            'vnp_Locale' => 'vn',
            'vnp_OrderInfo' => 'Thanh toan booking '.$booking->code,
            'vnp_OrderType' => 'other',
            'vnp_ReturnUrl' => $returnUrl,
            'vnp_TxnRef' => $booking->code,
        ];

        ksort($data);
        $hashData = http_build_query($data, '', '&');
        $secureHash = hash_hmac('sha512', $hashData, $hashSecret);

        return $vnpUrl.'?'.http_build_query($data).'&vnp_SecureHash='.$secureHash;
    }

    public function verifyReturn(array $params): bool
    {
        $hashSecret = config('services.vnpay.hash_secret');
        $secureHash = $params['vnp_SecureHash'] ?? '';
        unset($params['vnp_SecureHash'], $params['vnp_SecureHashType']);
        ksort($params);
        $hashData = http_build_query($params, '', '&');
        return hash_hmac('sha512', $hashData, $hashSecret) === $secureHash;
    }
}
