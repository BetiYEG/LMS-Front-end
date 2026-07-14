/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ✅ Team colors as CSS variables
        primary: 'var(--primary-color, #4f46e5)',
        secondary: 'var(--secondary-color, #6366f1)',
        accent: 'var(--accent-color, #818cf8)',
        background: 'var(--bg-color, #f8fafc)',
        foreground: 'var(--text-color, #1e293b)',
      },
    },
  },
  plugins: [],
}