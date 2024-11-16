/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: {
          default: '#131314',
          sideBar: '#1e1f20'
        }
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      // Adding custom animation
      animation: {
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
}


