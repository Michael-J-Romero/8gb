/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",     // Next.js pages
    "./components/**/*.{js,ts,jsx,tsx}", // Your components
    "./app/**/*.{js,ts,jsx,tsx}",        // If using /app dir (Next.js 13+)
  ],
  safelist: [
    "border-green-500", // Add any class you use in @apply that might get purged
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
