/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            'serif': ['Source Sans Pro', 'sans-serif']
        },
        fontWeight: {
            light: 300,
            regular: 400,
            semibold: 600,
            bold: 700,
        },
        colors: {
            'white': '#ffffff',
            'transparent': 'transparent',
            'gray': {
                '50': '#f5f5f5',
                '100': '#ebebeb',
                '200': '#cecece',
                '300': '#b0b0b0',
                '400': '#747474',
                '500': '#393939', // Used to be called dark-color-4
                '600': '#333333', // Used to be called dark-color-3
                '700': '#2b2b2b',
                '800': '#222222', // Used to be called dark-color-2
                '900': '#121212'  // Used to be called dark-color-1
            },
            'red': {
                '50': '#fdf5f6',
                '100': '#fcebec',
                '200': '#f6cdd1',
                '300': '#f1aeb5',
                '400': '#e7727d',
                '500': '#dc3545', // Same color as Bootstrap danger
                '600': '#c6303e',
                '700': '#a52834',
                '800': '#842029',
                '900': '#6c1a22'
            },
            'green': {
                '50': '#f4fbf6',
                '100': '#eaf6ec',
                '200': '#c9e9d1',
                '300': '#a9dcb5',
                '400': '#69c17d',
                '500': '#28a745', // Same color as Bootstrap success
                '600': '#24963e',
                '700': '#1e7d34',
                '800': '#186429',
                '900': '#145222'
            },
            'yellow': {
                '50': '#FFFBEB',
                '100': '#FEF3C7',
                '200': '#FDE68A',
                '300': '#FCD34D',
                '400': '#FBBF24',
                '500': '#F59E0B',
                '600': '#D97706',
                '700': '#B45309',
                '800': '#92400E',
                '900': '#78350F'
            },
            'blue': {
                '50': '#f2f8ff',
                '100': '#e6f2ff',
                '200': '#bfdeff',
                '300': '#99caff',
                '400': '#4da3ff',
                '500': '#007bff', // Same color as Bootstrap primary
                '600': '#006fe6',
                '700': '#005cbf',
                '800': '#004a99',
                '900': '#003c7d'
            }
        }
    },
    plugins: [],
};
