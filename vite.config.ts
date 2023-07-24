import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import asyncTop from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [asyncTop(), react()],
})
