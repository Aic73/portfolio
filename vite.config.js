import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' 
import compression from 'vite-plugin-compression' // Correct import

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [

    react(),


    compression()

    


  ],









    // ... other config
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },




    server: {
    host: true,   // exposes to your local network
    port: 5174,   // optional: choose port
  },







   test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },


  


})





















