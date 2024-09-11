/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { right: '-100%' },
          '100%': { right: '3rem' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

