import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/StudentLandingPage",
  plugins: [
      react(),
    tailwindcss(),
  ],
  build: {
    // Continue build despite TypeScript errors
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'PLUGIN_WARNING') {
          return; // Ignore plugin warnings
        }
        warn(warning);
      }
    }
  }
})
