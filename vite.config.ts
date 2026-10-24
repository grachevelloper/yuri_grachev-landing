import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

import { siteMetadata } from './config/siteMetadata';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = new URL(
    env.VITE_SITE_URL || 'https://grachevelloper.github.io/yuri_grachev-landing/',
  );

  if (!siteUrl.pathname.endsWith('/')) {
    siteUrl.pathname += '/';
  }

  return {
    base: env.VITE_BASE_PATH || siteUrl.pathname,
    plugins: [react(), siteMetadata({ siteUrl, verificationCode: env.VITE_YANDEX_VERIFICATION })],
    build: {
      rollupOptions: {
        input: {
          main: resolve('index.html'),
          privacy: resolve('privacy.html'),
        },
      },
    },
  };
});
