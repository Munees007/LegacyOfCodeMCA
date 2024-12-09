
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation:{
        scale:'scale 1s ease-in-out infinite'
      },
      keyframes:{
        scale:{
            '0%':{
              transform: 'scale(0.8)'
            },
            '50%':{
              transform: 'scale(1)'
            },
            '100%':{
              transform:'scale(0.8)'
            }
        }
      },
      fontFamily:{
        Orbiton:['Orbitron', 'sans-serif'],
        Roboto:['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}

