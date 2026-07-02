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
                // Brand palette: forest green → sage → tan → cream
                // (#2F3E2E · #556B3F · #8C9A6B · #CDBCA3 · #E9E2D5 · #F6F3EF)
                maha: {
                    50: '#F6F3EF',
                    100: '#E9E2D5',
                    200: '#CDBCA3',
                    300: '#ACAB87',
                    400: '#8C9A6B',
                    500: '#718255',
                    600: '#556B3F',
                    700: '#425436',
                    800: '#2F3E2E',
                    900: '#243023',
                },
                // Semantic text tokens
                heading: '#2F3E2E',    // dark forest green — main heading (largest)
                subheading: '#556B3F', // olive green — sub-heading
                ink: '#333A31',        // dark green-charcoal — body text
            },
            fontFamily: {
                sans: ['Quicksand', 'system-ui', 'sans-serif'],
                serif: ['"Playfair Display"', 'Georgia', 'serif'],
            },
        },
    },
    plugins: [],
};
