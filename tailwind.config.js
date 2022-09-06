/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                rot: {
                    '100%': { transform: 'rotate(180.0deg)' },
                },
            },
            animation: {
                rota: 'rot 200ms linear forwards',
            },
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
};
