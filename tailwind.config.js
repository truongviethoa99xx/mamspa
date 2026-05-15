/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.{js,ts,jsx,tsx}',
        './vendor/laravel/breeze/stubs/inertia-react/resources/views/**/*.blade.php',
        './app/Filament/**/*.php',
    ],
    theme: {
        extend: {
            colors: {
                maha: {
                    50: '#fbf7f2',
                    100: '#f3ead9',
                    200: '#e6d3b3',
                    300: '#d4b585',
                    400: '#c39961',
                    500: '#b07f48',
                    600: '#92653a',
                    700: '#754e30',
                    800: '#5e3e29',
                    900: '#4d3424',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['"Playfair Display"', 'Georgia', 'serif'],
            },
        },
    },
    plugins: [],
};
