/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './error.vue'
    ],
    theme: {
        extend: {
            colors: {
                // Retro pastels and warm grays
                retro: {
                    cream: '#FAF8F5',
                    beige: '#F5F0E8',
                    sand: '#E8E0D5',
                    gray: {
                        50: '#F9F8F7',
                        100: '#F0EDEA',
                        200: '#E0DBD5',
                        300: '#C9C2B8',
                        400: '#A89E91',
                        500: '#8B8075',
                        600: '#6E6459',
                        700: '#524A40',
                        800: '#3A342C',
                        900: '#252119'
                    },
                    pink: '#F2D4D7',
                    lavender: '#E5D8ED',
                    mint: '#D4E8E0',
                    sky: '#D6E5ED',
                    peach: '#F5DDD0',
                    butter: '#F5EDD0'
                }
            },
            fontFamily: {
                display: ['"VT323"', 'monospace'],
                body: ['"Space Grotesk"', 'sans-serif']
            },
            boxShadow: {
                'retro': '4px 4px 0px 0px rgba(0,0,0,0.1)',
                'retro-lg': '6px 6px 0px 0px rgba(0,0,0,0.1)',
                'retro-inset': 'inset 2px 2px 4px rgba(0,0,0,0.05), inset -2px -2px 4px rgba(255,255,255,0.5)',
                'bevel': '2px 2px 0px 0px rgba(255,255,255,0.5), -2px -2px 0px 0px rgba(0,0,0,0.1)',
                'bevel-pressed': 'inset 2px 2px 4px rgba(0,0,0,0.1), inset -1px -1px 2px rgba(255,255,255,0.3)'
            },
            borderRadius: {
                'retro': '4px'
            }
        }
    },
    plugins: []
}
