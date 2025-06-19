import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // TODO: Расскоментировать эту строку при деплое. В будущем разобраться с этим
  // base: "/burger-site/",
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@public": path.resolve(__dirname, "./public"),
    },
  },
  plugins: [react()],
  server: {
    port: 8080,
  },
});
