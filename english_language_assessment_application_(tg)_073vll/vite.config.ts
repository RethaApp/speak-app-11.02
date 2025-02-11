import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    define: {
      'process.env': env
    },
    base: '/', // Ensure base is correctly set
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  }
})
