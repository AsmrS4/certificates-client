import { defineConfig, loadEnv } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_');
    const API_URL = env.VITE_DEV_URL;

    return {
        base: '/plugins/certificates/app/',
        plugins: [react(), tailwindcss(), babel({ presets: [reactCompilerPreset()] })],
        server: {
            open: true,
            proxy: {
                '/api': {
                    target: API_URL,
                    changeOrigin: true,
                    secure: false,
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
