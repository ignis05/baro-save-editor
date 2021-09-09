import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: '/baro-save-editor/',
    plugins: [
      vue(),
      vuetify(),
      eslintPlugin(),
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
