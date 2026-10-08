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
          50: '#FBF9F5', // Primary background
          100: '#F5F1E9',
        },
        cream: {
          50: '#FAF7F0',
          100: '#F3EFE6', // Card backgrounds
          200: '#E6DFD1', // Subtle borders
          300: '#D9CDBF',
          400: '#C2B1A0',
        },
        'earth-green': {
          50: '#F2F6F4',
          100: '#E1ECE6',
          200: '#C5D8CF',
          300: '#9DBEB0',
          400: '#6FA08C',
          500: '#4D826E',
          600: '#3A6856',
          700: '#284A3D',
          800: '#1E3A2F', // Main brand CTA
          900: '#152820', // Dark contrast
          950: '#0B1712',
        },
        sage: {
          50: '#EEF3EF', // Botanical & doctor quote tint
          100: '#DEE8E0',
          200: '#BFD3C4',
          300: '#9DBDA6',
          400: '#7AA387',
          500: '#5B7B68', // Secondary
          600: '#486252',
          700: '#394D41',
        },
        terracotta: {
          50: '#FDF6F3',
          100: '#F9ECE5',
          200: '#F2D7CB',
          300: '#E7B8A4',
          400: '#D99178',
          500: '#C25B40',
          600: '#A84D35', // Accent
          700: '#8A3B26',
          800: '#6D2F1E',
        },
        peach: {
          50: '#FCF7F3',
          100: '#F5E6DD', // Highlight
          200: '#EED9CD',
          300: '#E2C2B0',
          400: '#D3A38C',
        },
        charcoal: {
          50: '#F7F6F5',
          100: '#EDEBE9',
          200: '#DCD8D4',
          300: '#BDB6B0',
          400: '#988F88',
          500: '#776D66',
          600: '#574F49', // Muted text
          700: '#423B36',
          800: '#2E2824',
          900: '#211D1A', // Primary typography
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
