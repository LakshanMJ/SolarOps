/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  corePlugins: {
    // Keep existing MUI-heavy app styling stable.
    preflight: false,
  },
  plugins: [],
}

