/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'accent': '#E3C770',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require("daisyui"),
    ],
}