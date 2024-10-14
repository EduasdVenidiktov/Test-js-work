// import { defineConfig } from "vite";

// export default defineConfig({
//   base: "./", // Базовый путь для ресурсов
//   resolve: {
//     alias: {
//       toastr: "toastr/build/toastr.min.js",
//     },
//   },
// });

import { defineConfig } from "vite";

export default defineConfig({
  base: "/Test-js-work/", // Путь к твоему репозиторию
  resolve: {
    alias: {
      toastr: "toastr/build/toastr.min.js",
      "@": "/src",
    },
  },
  optimizeDeps: {
    include: ["toastr/build/toastr.min.css", "toastr"],
  },
});
