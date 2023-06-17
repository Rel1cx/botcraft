import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig } from "vite"
import { imagetools } from "vite-imagetools"
import preload from "vite-plugin-preload"
import topLevelAwait from "vite-plugin-top-level-await"
import wasm from "vite-plugin-wasm"

const isDev = process.env.NODE_ENV === "development"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        topLevelAwait(),
        react(),
        vanillaExtractPlugin(),
        wasm(),
        imagetools(),
        !isDev &&
            preload({
                includeCss: true,
            }),
    ].filter(Boolean),
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    clearScreen: false,
    server: {
        port: 3000,
        strictPort: true,
    },
    envPrefix: ["VITE_"],
    build: {
        target: ["es2021", "firefox90", "chrome113", "safari14"],
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ["react", "react-dom"],
                },
            },
        },
        sourcemap: false,
    },
})
