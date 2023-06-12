/** @type {import('tailwindcss').Config} */
const config = {
    mode: "jit",
    content: [
        "./src/**/*.{html,js,ts,jsx,tsx}",
        "node_modules/daisyui/dist/**/*.js",
        "node_modules/react-daisyui/dist/**/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("daisyui"),
        // ...
    ],
}

// eslint-disable-next-line import/no-default-export
export default config
