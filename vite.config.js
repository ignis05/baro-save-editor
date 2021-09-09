import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'
import eslintPlugin from 'vite-plugin-eslint'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: '/baro-save-editor/',
    plugins: [
      vue(),
      vuetify(),
      eslintPlugin(),
      VitePWA({
        manifest: {
          name: 'Barotrauma Save Editor',
          short_name: 'baro-save-editor',
          description: 'Save and submarine editing tools for Barotrauma.',
          theme_color: '#4CAF50',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        registerType: 'prompt',
        workbox: {
          sourcemap: true,
        },
      }),
    ],
    resolve: {
      alias: [
        // resolve @ to /src
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        // polyfill for node core modules
        { find: 'zlib', replacement: 'browserify-zlib' },
        { find: 'stream', replacement: 'stream-browserify' },
        { find: 'util', replacement: 'util-browser' },
        { find: 'process', replacement: 'process/browser' },
      ],
    },
    server: {
      fs: {
        strict: false,
      },
    },
  }
})
