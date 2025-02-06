/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22c55e'
        },
        secondary: {
          DEFAULT: '#303235'
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

