<?php

namespace App\Providers;

use App\Models\BlogPost;
use App\Models\Branch;
use App\Models\Promotion;
use App\Models\Service;
use App\Observers\AutoTranslateObserver;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }

        Branch::observe(AutoTranslateObserver::class);
        Service::observe(AutoTranslateObserver::class);
        Promotion::observe(AutoTranslateObserver::class);
        BlogPost::observe(AutoTranslateObserver::class);

        $this->callAfterResolving(Schedule::class, function (Schedule $schedule) {
            $schedule->command('translate:missing --target=all')->dailyAt('03:00');
        });
    }
}
