/** @type {import('tailwindcss').Config} */
export default {
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "loader":"url('/images/escudoH.png')",
        "wallpaper":"url('/images/fondo.jpg')"
      },

      keyframes:{
        changeColor:{
          '0%': { backgroundColor: '#1035af' },
          '25%': { backgroundColor: '#a30f0f' },
          '50%': { backgroundColor: '#117e3b' },
          '75%': { backgroundColor: '#e4cf12' },
          '100%': { backgroundColor: '#1035af' }
        }
      },
      animation: {
        changeColor: 'changeColor 4s infinite cubic-bezier(.25, 1, .30, 1)'
      }
    },
  },
  plugins: [],
}

