/** @type {import('tailwindcss').Config} */
const config = {
    mode: "jit",
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("tailwindcss-animate"),
        // ...
    ],
}

// eslint-disable-next-line import/no-default-export
export default config
