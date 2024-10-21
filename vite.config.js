import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // puth to my repository
  resolve: {
    alias: {
      toastr: "toastr/build/toastr.min.js",
    },
  },
  optimizeDeps: {
    include: ["toastr/build/toastr.min.css", "toastr"],
  },
});
