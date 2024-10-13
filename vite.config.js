import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // Базовый путь для ресурсов
  resolve: {
    alias: {
      toastr: "toastr/build/toastr.min.js",
    },
  },
});
