/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FA6900",
          light: "#FF8C42",
        },
        secondary: {
          DEFAULT: "#0F0F0F",
          light: "#F8FAFC",
        },
        accent: {
          DEFAULT: "#191919",
          light: "#E2E8F0",
        },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}