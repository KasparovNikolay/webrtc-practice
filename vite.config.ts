import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import checker from 'vite-plugin-checker'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
    checker({
      typescript: true,
    }),
  ],
  server: {
    open: true,
    port: 3000,
    https: true,
  }
})
