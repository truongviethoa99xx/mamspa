<?php

namespace App\Providers;

use App\Models\BlogPost;
use App\Models\Service;
use App\Observers\AutoTranslateObserver;
use App\Support\Ssr\ProcessGateway;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Inertia\Ssr\Gateway;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Hosting cPanel không chạy được tiến trình SSR nền liên tục — thay
        // HttpGateway mặc định (gọi HTTP tới daemon) bằng gateway spawn Node
        // theo từng request. Xem App\Support\Ssr\ProcessGateway.
        $this->app->bind(Gateway::class, ProcessGateway::class);
    }

    public function boot(): void
    {
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }

        Service::observe(AutoTranslateObserver::class);
        BlogPost::observe(AutoTranslateObserver::class);

        $this->callAfterResolving(Schedule::class, function (Schedule $schedule) {
            $schedule->command('translate:missing --target=all')->dailyAt('03:00');
        });
    }
}
