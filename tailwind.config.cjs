/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    900: '#74BF04',
                    800: '#81c51d',
                    700: '#8fcb36',
                    600: '#9dd24f',
                    500: '#abd868',
                    400: '#b9df81',
                    300: '#c7e59a',
                    200: '#d5ebb3',
                    100: '#e3f2cc',
                    50: '#f3f9ea',
                },
                secondary: '#317302',
                tertiary: '#A7F205',
                semantic_1: {
                    900: '#BF0D4D',
                    800: '#c5255e',
                    700: '#cb3d70',
                    600: '#d25582',
                    500: '#d86d94',
                    400: '#df86a6',
                    300: '#e59eb7',
                    200: '#ebb6c9',
                    100: '#f2cedb',
                },
                semantic_2: '#730E32',
                background_1: '#171717',
                background_1: '#121212',
                text: '#171717',
                success: '#27a844',
                danger: '#dc3546',
                warning: '#fec107',
                info: '#17a2b7',
            },
            fontFamily: {
                handwrite: ['Lobster', 'cursive', 'serif']
            }
        },
    },
    plugins: [],
}
