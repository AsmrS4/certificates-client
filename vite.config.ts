import { defineConfig, loadEnv } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_');
    const API_URL = env.VITE_DEV_URL;

    return {
        plugins: [react(), tailwindcss(), babel({ presets: [reactCompilerPreset()] })],
        server: {
            open: true,
            proxy: {
                '/api': {
                    target: API_URL,
                    changeOrigin: true,
                    secure: false,
                    configure: (proxy, _options) => {
                        proxy.on('proxyRes', (proxyRes, req, res) => {
                            if (proxyRes.headers['set-cookie']) {
                                const cookies = proxyRes.headers['set-cookie'].map(
                                    (cookie) =>
                                        cookie
                                            .replace(/Domain=[^;]+;?/i, '') // удаляем Domain
                                            .replace(/Secure;?\s?/i, '') // удаляем Secure
                                            .replace(/SameSite=None;?\s?/i, 'SameSite=Lax;'), // заменяем None на Lax
                                );
                                proxyRes.headers['set-cookie'] = cookies;
                            }
                        });
                    },
                },
            },
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
    };
});
