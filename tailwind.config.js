/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            spacing: {
                'h-header': 'var(--h-header)',
                'p-body': 'var(--p-body)',
            },
            maxWidth: {
                container: 'var(--max-container)',
            },
            colors: {
                primary: 'rgba(var(--clr-primary), <alpha-value>)',
                'primary-to': 'rgba(var(--clr-primary-to), <alpha-value>)',
                secondary: 'rgba(var(--clr-secondary), <alpha-value>)',
                'secondary-to': 'rgba(var(--clr-secondary-to), <alpha-value>)',
                'text-dark': 'rgba(var(--clr-text-dark), <alpha-value>)',
                'text-semidark': 'rgba(var(--clr-text-semidark), <alpha-value>)',
                text: 'rgba(var(--clr-text), <alpha-value>)',
                'text-light': 'rgba(var(--clr-text-light), <alpha-value>)',
                'bg-dark': 'rgba(var(--clr-bg-dark), <alpha-value>)',
                bg: 'rgba(var(--clr-bg), <alpha-value>)',
                'bg-light': 'rgba(var(--clr-bg-light), <alpha-value>)',
                transparent: 'transparent',
                current: 'currentColor',
            },
            zIndex: {
                header: 100,
                dialog: 9999,
                'member-card': 50,
                loader: 99999,
            },
            boxShadow: {
                test: '0 0 1px 1px red',
            },
        },
        screens: {
            xxl: { min: '1400px' },
            xl: { max: '1399px' },
            lg: { max: '1199px' },
            md: { max: '991px' },
            sm: { max: '767px' },
            xs: { max: '575px' },
            'can-hover': { raw: '(hover: hover)' },
            'cannot-hover': { raw: '(hover: none)' },
        },
    },
    plugins: [],
};
