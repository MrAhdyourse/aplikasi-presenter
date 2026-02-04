import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'es2015',
    outDir: 'dist',
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/firestore', 'firebase/storage', 'firebase/auth'],
    exclude: ['@react-three/drei', '@react-three/fiber', 'three']
  }
})
