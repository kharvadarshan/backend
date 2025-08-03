import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps:{
    include: ["react-leaflet", "leaflet", "socket.io-client"],
    esbuildOptions: {
      // Ensure compatibility with CommonJS modules
      mainFields: ["module", "main"],
    },
    build: {
    // Ensure proper module resolution during build
    rollupOptions: {
      external: ['react-datepicker']
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    
  },
  }
})
