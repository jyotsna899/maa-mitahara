import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FAF6F0', // Warm almond cream primary background
          100: '#F4ECE2',
        },
        cream: {
          50: '#FAF6F0',
          100: '#F4ECE2', // Card backgrounds
          200: '#E8DFD3', // Soft warm sand borders
          300: '#DBCEBF',
          400: '#C4B2A0',
        },
        'earth-green': {
          50: '#F0F5F2',
          100: '#E8F1EC',
          200: '#C8DCD1',
          300: '#A1C3B2',
          400: '#71A18A',
          500: '#4D8068',
          600: '#396551',
          700: '#2A4B3C',
          800: '#244235', // Deep nurturing eucalyptus green
          900: '#172B22',
          950: '#0E1C16',
        },
        sage: {
          50: '#EEF4F0', // Soft maternal botanical tint
          100: '#DCE8E1',
          200: '#BCD4C6',
          300: '#9CBDAB',
          400: '#7AA38D',
          500: '#5B7B6B',
          600: '#486255',
          700: '#394D43',
        },
        terracotta: {
          50: '#FDF7F5',
          100: '#F8EBE6', // Soft motherly blush
          200: '#F3D8CD',
          300: '#E8B6A4',
          400: '#DB8F76',
          500: '#C86D51', // Warm maternal terracotta accent
          600: '#A54B33',
          700: '#873924',
          800: '#692918',
        },
        peach: {
          50: '#FDF6F2',
          100: '#F8EBE3', // Motherly blush highlight
          200: '#F1D9CB',
          300: '#E5C2AE',
          400: '#D8A48B',
        },
        charcoal: {
          50: '#F8F6F4',
          100: '#ECE9E6',
          200: '#DCD7D2',
          300: '#BCB5AD',
          400: '#988E84',
          500: '#776B61',
          600: '#574D45',
          700: '#423932',
          800: '#2E2722',
          900: '#26211E', // Soft warm espresso typography
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'Josefin Sans', 'Plus Jakarta Sans', 'sans-serif'],
        sans: ['var(--font-sans)', 'Jost', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'peak-sm': '0 1px 3px rgba(33, 29, 26, 0.04), 0 1px 2px rgba(33, 29, 26, 0.02)',
        'peak-md': '0 4px 12px -2px rgba(33, 29, 26, 0.06), 0 2px 6px -1px rgba(33, 29, 26, 0.03)',
        'peak-lg': '0 12px 28px -4px rgba(33, 29, 26, 0.08), 0 4px 12px -2px rgba(33, 29, 26, 0.04)',
        'peak-float': '0 20px 40px -10px rgba(33, 29, 26, 0.12)',
      },
      maxWidth: {
        'page': '1640px',
      },
      aspectRatio: {
        'portrait': '3 / 4',
      },
      borderRadius: {
        'card': '10px',
        'peak': '12px',
        'peak-lg': '18px',
        'peak-xl': '24px',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-in': 'fade-in 200ms ease both',
        'slide-in-top': 'slide-in-from-top 200ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-in-from-top': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
