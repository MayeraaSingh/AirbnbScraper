/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'airbnb-red': '#FF5A5F',
        'airbnb-dark-red': '#D70466',
        'airbnb-pink': '#FF385C',
        'airbnb-teal': '#00A699',
        'airbnb-purple': '#914669',
        'airbnb-dark-gray': '#484848',
        'airbnb-light-gray': '#F7F7F7',
      },
      fontFamily: {
        sans: ['Circular', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      borderRadius: {
        'large': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'listing': '0 6px 16px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
} 