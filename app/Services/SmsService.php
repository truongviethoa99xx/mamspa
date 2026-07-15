<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmsService
{
    public function send(string $to, string $message): bool
    {
        $provider = config('services.sms.provider', 'twilio');

        try {
            return match ($provider) {
                'twilio' => $this->sendViaTwilio($to, $message),
                default => $this->logOnly($to, $message),
            };
        } catch (\Throwable $e) {
            Log::error('SMS send failed', ['err' => $e->getMessage(), 'to' => $to]);
            return false;
        }
    }

    protected function sendViaTwilio(string $to, string $message): bool
    {
        $sid = config('services.twilio.sid');
        $token = config('services.twilio.token');
        $from = config('services.twilio.from');

        if (! $sid || ! $token || ! $from) {
            return $this->logOnly($to, $message);
        }

        $response = Http::withBasicAuth($sid, $token)->asForm()->post(
            "https://api.twilio.com/2010-04-01/Accounts/{$sid}/Messages.json",
            ['From' => $from, 'To' => $to, 'Body' => $message]
        );

        return $response->successful();
    }

    protected function logOnly(string $to, string $message): bool
    {
        Log::info('SMS (log driver)', ['to' => $to, 'body' => $message]);
        return true;
    }
}
