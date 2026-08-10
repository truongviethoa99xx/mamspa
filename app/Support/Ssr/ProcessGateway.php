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
 * Chỉ render SSR cho bot/crawler (Googlebot, social preview bot...) — xem
 * isCrawlerRequest(). Người dùng thật luôn nhận client-side rendering thuần, không
 * tốn thêm ~150-250ms/request để spawn Node. Đo bằng PageSpeed Insights thực tế:
 * bật SSR cho MỌI request từng làm điểm Performance (Desktop) rớt từ 78 xuống 61
 * (LCP +600ms, TBT +200ms) — chỉ giới hạn cho bot vẫn giữ nguyên lợi ích crawler
 * đọc được nội dung, mà không đánh đổi tốc độ của người dùng thật.
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

    /**
     * Search-engine crawler + social/chat link-preview bot user-agents. Regex chung
     * "bot|crawl|spider" bắt được phần lớn (Googlebot, Bingbot, YandexBot, Baiduspider,
     * AhrefsBot...); vài cái không có "bot" trong tên phải liệt kê riêng.
     *
     * CỐ Ý không thêm "lighthouse"/"pagespeed" — PageSpeed Insights/Lighthouse mô phỏng
     * NGƯỜI DÙNG THẬT (dùng để đo hiệu suất thực tế), không phải bot đọc nội dung; nếu
     * liệt nó vào đây thì điểm đo sẽ mãi phản ánh nhánh SSR (chậm hơn) thay vì nhánh CSR
     * mà người dùng thật thực sự nhận được — vô hiệu hoá mục đích của thay đổi này.
     */
    private const BOT_USER_AGENT_PATTERN = '/bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|embedly|quora link preview|w3c_validator/i';

    public function dispatch(array $page): ?Response
    {
        if (! $this->isCrawlerRequest() || ! config('inertia.ssr.enabled', true) || Cache::get(self::UNAVAILABLE_CACHE_KEY)) {
            return null;
        }

        $bundle = (new BundleDetector)->detect();

        if (! $bundle) {
            return null;
        }

        try {
            // --no-experimental-fetch: our SSR script never calls fetch()/Request/Response,
            // but Node 18+ lazily instantiates undici's llhttp WASM parser the moment those
            // globals are touched anywhere in the module graph — and on this host's memory-
            // constrained environment that WASM allocation throws "RangeError: Out of memory".
            // Disabling the flag entirely sidesteps it since nothing here needs fetch.
            $process = new Process([$this->nodeBinary(), '--no-experimental-fetch', $bundle]);
            $process->setTimeout(self::TIMEOUT_SECONDS);
            $process->setInput(json_encode($page));
            $process->run();

            if (! $process->isSuccessful()) {
                Log::error('Inertia SSR: node process exited with an error', [
                    'exitCode' => $process->getExitCode(),
                    'stderr' => $process->getErrorOutput(),
                ]);

                return null;
            }

            $result = json_decode($process->getOutput(), true);

            if (! is_array($result) || ! isset($result['head'], $result['body'])) {
                Log::error('Inertia SSR: unexpected node output', ['output' => $process->getOutput()]);

                return null;
            }

            return new Response(implode("\n", $result['head']), $result['body']);
        } catch (ProcessException $e) {
            // proc_open bị host chặn, hoặc node binary không chạy được.
            Cache::put(self::UNAVAILABLE_CACHE_KEY, true, self::UNAVAILABLE_CACHE_TTL);
            Log::error('Inertia SSR: node process could not be started, falling back to client-side rendering', [
                'error' => $e->getMessage(),
            ]);

            return null;
        } catch (Throwable $e) {
            Log::error('Inertia SSR: unexpected error, falling back to client-side rendering', [
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }

    private function nodeBinary(): string
    {
        return config('ssr.node_binary', 'node');
    }

    private function isCrawlerRequest(): bool
    {
        $userAgent = request()?->userAgent();

        return $userAgent && preg_match(self::BOT_USER_AGENT_PATTERN, $userAgent) === 1;
    }
}
