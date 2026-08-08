import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    ssr: {
        // cPanel deploy commits bootstrap/ssr/ instead of running `npm install` on the
        // server (see DEPLOY-CPANEL.md) — the SSR bundle has no node_modules to resolve
        // bare imports (react, etc.) against at runtime, so everything must be bundled in.
        noExternal: true,
    },
});
