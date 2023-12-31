import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir);
}

export default defineConfig({
  plugins: [vue()],

  resolve: {
    //支持别名
    alias: [
      {
        find: "@",
        replacement: pathResolve("src") + "/",
      },
    ],
    dedupe: ["vue"],
    //忽略后缀
    extensions: [".vue", ".js"],
  },

  server: {
    proxy: {
      "^/api": {
        target: "http://admin.jxc.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
