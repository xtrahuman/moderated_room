/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'homegreen' : '#3AAFA9'
      },
      fontFamily: {
        'sans': ['Fantasy','ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
}

