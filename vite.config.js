import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react({
      babel: {
        plugins: [
          [
          'babel-plugin-react-compiler'
        ]
      ],
      },
    }),
    tailwindcss(),
  ],
  build: {
    emptyOutDir: false,
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@api': path.resolve(__dirname, './src/api'),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },

}))