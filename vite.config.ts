import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      assets: `${path.resolve(__dirname, "./src/assets/")}`,
      hooks: `${path.resolve(__dirname, "./src/hook/")}`,
      layouts: `${path.resolve(__dirname, "./src/layouts/")}`,
      router: `${path.resolve(__dirname, "./src/router/")}`,
      states: `${path.resolve(__dirname, "./src/states/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      public: `${path.resolve(__dirname, "./public/")}`,
      pages: path.resolve(__dirname, "./src/pages/"),
      types: `${path.resolve(__dirname, "./src/types/")}`,
      utils: `${path.resolve(__dirname, "./src/utils/")}`,
      services: `${path.resolve(__dirname, "./src/services/")}`,
    },
  },
});
