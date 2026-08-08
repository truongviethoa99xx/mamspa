<?php

namespace App\Support\Ssr;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Ssr\BundleDetector;
use Inertia\Ssr\Gateway;
use Inertia\Ssr\Response;
use Symfony\Component\Process\Exception\ExceptionInterface as ProcessException;
use Symfony\Component\Process\Process;
use Throwable;

/**
 * Gateway SSR thay thế HttpGateway mặc định của Inertia. HttpGateway gọi HTTP tới
 * 1 tiến trình Node nền chạy sẵn (`php artisan inertia:start-ssr`), nhưng hosting
 * cPanel shared của dự án này không chạy được tiến trình nền liên tục (xem
 * DEPLOY-CPANEL.md). Gateway này spawn 1 tiến trình Node MỚI cho MỖI request qua
 * proc_open, đẩy page JSON qua stdin, đọc {head, body} JSON từ stdout rồi thoát
 * ngay — không cần daemon.
 *
 * Luôn fallback êm về client-side rendering (trả về null, giống hệt hành vi gốc
 * của HttpGateway khi không kết nối được server) nếu Node lỗi/timeout/không có,
 * hoặc nếu host chặn proc_open — không bao giờ được làm hỏng response chính.
 */
class ProcessGateway implements Gateway
{
    private const TIMEOUT_SECONDS = 5.0;

    /** Sau khi phát hiện proc_open bị chặn, tạm ngưng thử lại trong khoảng thời gian
     *  này để tránh mỗi request đều tốn thời gian chờ lỗi + ghi log. */
    private const UNAVAILABLE_CACHE_TTL = 300;

    private const UNAVAILABLE_CACHE_KEY = 'inertia-ssr-process-gateway-unavailable';

    public function dispatch(array $page): ?Response
    {
        if (! config('inertia.ssr.enabled', true) || Cache::get(self::UNAVAILABLE_CACHE_KEY)) {
            return null;
        }

        $bundle = (new BundleDetector)->detect();

        if (! $bundle) {
            return null;
        }

        try {
            $process = new Process([$this->nodeBinary(), $bundle]);
            $process->setTimeout(self::TIMEOUT_SECONDS);
            $process->setInput(json_encode($page));
            $process->run();

            if (! $process->isSuccessful()) {
                Log::warning('Inertia SSR: node process exited with an error', [
                    'exitCode' => $process->getExitCode(),
                    'stderr' => $process->getErrorOutput(),
                ]);

                return null;
            }

            $result = json_decode($process->getOutput(), true);

            if (! is_array($result) || ! isset($result['head'], $result['body'])) {
                Log::warning('Inertia SSR: unexpected node output', ['output' => $process->getOutput()]);

                return null;
            }

            return new Response(implode("\n", $result['head']), $result['body']);
        } catch (ProcessException $e) {
            // proc_open bị host chặn, hoặc node binary không chạy được.
            Cache::put(self::UNAVAILABLE_CACHE_KEY, true, self::UNAVAILABLE_CACHE_TTL);
            Log::warning('Inertia SSR: node process could not be started, falling back to client-side rendering', [
                'error' => $e->getMessage(),
            ]);

            return null;
        } catch (Throwable $e) {
            Log::warning('Inertia SSR: unexpected error, falling back to client-side rendering', [
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }

    private function nodeBinary(): string
    {
        return config('ssr.node_binary', 'node');
    }
}
