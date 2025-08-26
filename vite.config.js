import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa' 
import compression from 'vite-plugin-compression' // Correct import

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [

    react(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    //   manifest: {
    //     name: 'Naeem Khan - Portfolio',
    //     short_name: 'Naeem Portfolio',
    //     description: 'Portfolio of Naeem Khan, a full-stack developer',
    //     theme_color: '#FA6900',
    //     background_color: '#0F0F0F',
    //     display: 'standalone',
    //     icons: [
    //       {
    //         src: 'pwa-192x192.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },
    //       {
    //         src: 'pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png'
    //       },
    //       {
    //         src: 'pwa-512x512.png',
    //         sizes: '512x512',
    //         type: 'image/png',
    //         purpose: 'any maskable'
    //       }
    //     ]
    //   }
    // }),

    compression()

    


  ],









    // ... other config
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps for production
    // Ensure assets are properly handled
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
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





















