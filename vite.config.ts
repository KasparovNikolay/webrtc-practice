import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import checker from 'vite-plugin-checker'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],
  server: {
    open: true,
    port: 3000,
    https: true,
  },
  esbuild: {
    target: 'node14',
  },
})
