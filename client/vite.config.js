import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  sever: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://api.slumbershift.io.vn",
        changeOrigin: true,
      },
    },
  },
});
