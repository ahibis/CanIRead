import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build:{
    outDir:process.env.DOCS=="true" ? "./docs" : "./dist"
  },
  plugins: [react()],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
