import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 任意のホストでアクセス可能にする
    port: 3000       // ポート番号を指定
  }
})
