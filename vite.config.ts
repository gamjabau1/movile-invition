import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// React, Tailwind, 경로 별칭, 개발 서버 옵션을 한곳에서 설정합니다.
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        // '@/...' 형태로 프로젝트 루트 파일을 가져올 수 있게 합니다.
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // AI Studio 편집 중에는 DISABLE_HMR 값으로 HMR과 파일 감시를 끌 수 있습니다.
      hmr: process.env.DISABLE_HMR !== 'true',
      // HMR을 끄는 경우 파일 감시도 중지해 편집 중 깜빡임과 CPU 사용을 줄입니다.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
