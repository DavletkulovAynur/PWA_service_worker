import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createHtmlPlugin } from "vite-plugin-html";
import { vitePwaConfig } from "./vite.pwa.config";
import { IViteConfigParams } from "./vite.config.types";
import tailwindcss from "tailwindcss";

export default ({ mode }: { mode: string }) => {
  const params: IViteConfigParams = {
    isDev: mode === "development",
    outDir: "build",
    port: 3000,
  };

  return defineConfig({
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
      }),
      vitePwaConfig(params),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    build: {
      outDir: params.outDir,
      emptyOutDir: true,
    },
    server: {
      port: params.port,
      open: "http://localhost:" + params.port,
    },
  });
};
