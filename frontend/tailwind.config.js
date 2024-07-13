/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bodybg': "url('/public/pexels-photo-743986.webp')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

