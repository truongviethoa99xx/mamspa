<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Services\VNPayService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function vnpay(Booking $booking, VNPayService $svc): RedirectResponse
    {
        $url = $svc->createPaymentUrl($booking, config('services.vnpay.return_url'));
        return redirect()->away($url);
    }

    public function vnpayReturn(Request $request, VNPayService $svc): RedirectResponse
    {
        $params = $request->all();
        if (! $svc->verifyReturn($params)) {
            return redirect('/my-bookings')->with('error', 'Chữ ký VNPay không hợp lệ.');
        }

        $booking = Booking::where('code', $params['vnp_TxnRef'] ?? '')->first();
        if (! $booking) {
            return redirect('/my-bookings')->with('error', 'Không tìm thấy booking.');
        }

        if (($params['vnp_ResponseCode'] ?? '') === '00') {
            $booking->update(['payment_status' => 'paid', 'status' => 'confirmed']);
            return redirect('/my-bookings')->with('success', 'Thanh toán thành công cho booking '.$booking->code);
        }

        return redirect('/my-bookings')->with('error', 'Thanh toán không thành công.');
    }
}
