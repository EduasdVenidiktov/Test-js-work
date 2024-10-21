import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // puth to my repository
  resolve: {
    alias: {
      toastr: "toastr/build/toastr.min.js",
    },
  },
});
