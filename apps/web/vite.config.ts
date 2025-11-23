import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages 배포 시 기준 경로 (https://<user>.github.io/<repo>/)
  base: "/practice-vibecoding-demo/",
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});


