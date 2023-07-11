import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import basicSSL from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import preload from "vite-plugin-preload";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

const isDev = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        topLevelAwait(),
        react(),
        vanillaExtractPlugin(),
        wasm(),
        preload({
            includeCss: true,
        }),
        basicSSL(),
        checker({
            eslint: {
                lintCommand: "eslint --cache --color src",
            },
            typescript: true,
        }),
    ].filter(Boolean),
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    clearScreen: false,
    server: {
        port: 5173,
        strictPort: true,
    },
    envPrefix: ["VITE_"],
    build: {
        target: ["es2021", "chrome113", "safari14"],
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            treeshake: "recommended",
        },
        sourcemap: false,
    },
});
