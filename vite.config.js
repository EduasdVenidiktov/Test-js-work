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
  base: "./", // Путь к твоему репозиторию
  resolve: {
    alias: {
      toastr: "toastr/build/toastr.min.js",
    },
  },
});
