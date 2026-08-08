import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { Page } from '@inertiajs/core';
import './i18n';

/**
 * Entry point SSR chạy one-shot qua stdin/stdout (không dùng `createServer` mặc định
 * của Inertia — hosting cPanel không chạy được tiến trình Node nền liên tục). PHP
 * (App\Support\Ssr\ProcessGateway) spawn 1 tiến trình node cho MỖI request, đẩy page
 * JSON qua stdin, đọc {head, body} JSON từ stdout, rồi thoát.
 *
 * Không import './bootstrap' (gán window.axios — không tồn tại window ở Node) hay
 * '../css/app.css' (không ảnh hưởng tới HTML render ra).
 */

const appName = 'Mầm Spa';

function readStdin(): Promise<string> {
    return new Promise((resolve, reject) => {
        let data = '';
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', (chunk) => (data += chunk));
        process.stdin.on('end', () => resolve(data));
        process.stdin.on('error', reject);
    });
}

async function main(): Promise<void> {
    const input = await readStdin();
    const page = JSON.parse(input) as Page;

    const result = await createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => (title ? `${title} — ${appName}` : appName),
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.tsx`,
                import.meta.glob('./Pages/**/*.tsx'),
            ),
        setup: ({ App, props }) => <App {...props} />,
    });

    process.stdout.write(JSON.stringify(result));
}

main().catch((error: unknown) => {
    process.stderr.write(error instanceof Error ? (error.stack ?? error.message) : String(error));
    process.exit(1);
});
