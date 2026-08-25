import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: ['192.168.1.8', '198.18.0.1', 'localhost', '127.0.0.1', '.local'],
    cors: true,
  },
});
