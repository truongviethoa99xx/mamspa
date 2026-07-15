<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->json('floating_contact_buttons')->nullable()->after('chat_url');
        });

        DB::table('site_settings')->update([
            'floating_contact_buttons' => json_encode([
                [
                    'enabled' => true,
                    'label' => 'Zalo',
                    'type' => 'zalo',
                    'href' => 'https://zalo.me/0865806166',
                    'background' => '#ffffff',
                    'color' => '#028fe8',
                ],
                [
                    'enabled' => true,
                    'label' => 'Google Maps',
                    'type' => 'map',
                    'href' => '/contact',
                    'background' => '#ffffff',
                    'color' => '#4285f4',
                ],
                [
                    'enabled' => true,
                    'label' => 'WhatsApp',
                    'type' => 'whatsapp',
                    'href' => 'https://wa.me/84865806166',
                    'background' => '#19b83f',
                    'color' => '#ffffff',
                ],
                [
                    'enabled' => true,
                    'label' => 'KakaoTalk',
                    'type' => 'kakao',
                    'href' => '#',
                    'background' => '#fee500',
                    'color' => '#3b1f1f',
                ],
                [
                    'enabled' => true,
                    'label' => 'Hotline',
                    'type' => 'phone',
                    'href' => 'tel:0865806166',
                    'background' => '#0d8bff',
                    'color' => '#ffffff',
                ],
            ]),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn('floating_contact_buttons');
        });
    }
};
