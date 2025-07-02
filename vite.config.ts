import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/StudentLandingPage',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'PLUGIN_WARNING') {
          return;
        }
        warn(warning);
      }
    }
  }
}))