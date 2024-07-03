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
      // rollupOptions: {
      //   external: ["workbox-precaching"], // Add this line
      // },
    },
    server: {
      port: params.port,
      open: "http://localhost:" + params.port,
    },
    // define: {
    //   "process.env": {
    //     VITE_FIREBASE_CONFIG: JSON.stringify({
    //       apiKey: "AIzaSyACprrRLlKeXEqEUJI7mPd1KK5MRAd-Ffs",
    //       authDomain: "pwa-push-notifications-e9d8e.firebaseapp.com",
    //       projectId: "pwa-push-notifications-e9d8e",
    //       storageBucket: "pwa-push-notifications-e9d8e.appspot.com",
    //       messagingSenderId: "235982055240",
    //       appId: "1:235982055240:web:09d52b2f74f1dc554e357d",
    //     }),
    //   },
    // },
  });
};
