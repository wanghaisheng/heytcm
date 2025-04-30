/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f8f9',
          100: '#e6f1f4',
          200: '#c1dde3',
          300: '#9bc9d2',
          400: '#51a0b1',
          500: '#06778f',
          600: '#056b81',
          700: '#04596b',
          800: '#034756',
          900: '#023a46',
        },
        secondary: {
          50: '#fcf7ed',
          100: '#f9efdb',
          200: '#f1d8a8',
          300: '#e8c074',
          400: '#d79210',
          500: '#c66305',
          600: '#b25904',
          700: '#954a04',
          800: '#783b03',
          900: '#623102',
        },
        accent: {
          50: '#f5f3fc',
          100: '#ebe7f9',
          200: '#ccc2f0',
          300: '#ad9de7',
          400: '#7053d5',
          500: '#3309c3',
          600: '#2e08b0',
          700: '#260693',
          800: '#1f0576',
          900: '#190461',
        },
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
      },
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
        body: ['Nunito Sans', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'flow': 'flow 20s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        flow: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(10px) translateY(-5px)' },
          '50%': { transform: 'translateX(0) translateY(-10px)' },
          '75%': { transform: 'translateX(-10px) translateY(-5px)' },
        },
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/6765882/pexels-photo-6765882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        'texture': "url('https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      },
    },
  },
  plugins: [],
};