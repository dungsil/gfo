// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import windicss from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    vue(),
    windicss()
  ],
  build: {
    outDir: '../dist',
  }
});
