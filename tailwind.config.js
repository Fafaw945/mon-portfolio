// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class', // 👈 on active le mode par classe
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
  extend: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
},
}
