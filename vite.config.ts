import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikReact } from "@builder.io/qwik-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    optimizeDeps: {
      include: [
        '@mui/material',
        '@mui/x-data-grid',
        '@react-three/fiber',
      ],
    },
    build: {
      cssCodeSplit: false,
      minify: false,
    },
    plugins: [
      qwikCity(),
      qwikVite({
        entryStrategy: {
          type: "single",
        },
      }),
      qwikReact(),
      tsconfigPaths(),
      qwikReact(),
    ],
  };
});
