/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Host Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#F5F0E8',
        dark: '#110000',
        brown: {
          900: '#2A1810',
          800: '#3D2A1F',
          700: '#5C4A3D',
          600: '#5C5045',
          500: '#A09080',
        }
      },
      maxWidth: {
        'container': '1200px',
      }
    },
  },
  plugins: [],
}
