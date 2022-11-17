/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#84cc16',
                'secondary': '#fffb7d',
                'background_1': '#171717',
                'background_1': '#121212',
                'text': '#ffffff',
                'success': '#27a844',
                'danger': '#dc3546',
                'warning': '#fec107',
                'info': '#17a2b7',
            },
            fontFamily: {
                handwrite: ['Lobster', 'cursive', 'serif']
            }
        },
    },
    plugins: [],
}
