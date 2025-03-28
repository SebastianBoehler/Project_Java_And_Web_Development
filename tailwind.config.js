/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media', // Use 'media' to respect system preferences
  theme: {
    extend: {
      colors: {
        // Define your color scheme here for easy reference
        primary: {
          light: '#4f46e5', // indigo-600
          dark: '#6366f1',  // indigo-500 (brighter in dark mode)
        },
        secondary: {
          light: '#0ea5e9', // sky-500
          dark: '#38bdf8',  // sky-400 (brighter in dark mode)
        },
        background: {
          light: '#ffffff', // white
          dark: '#1f2937',  // gray-800
        },
        surface: {
          light: '#f9fafb', // gray-50
          dark: '#111827',  // gray-900
        },
        text: {
          light: {
            primary: '#111827',   // gray-900
            secondary: '#4b5563', // gray-600
          },
          dark: {
            primary: '#f9fafb',   // gray-50
            secondary: '#d1d5db', // gray-300
          },
        },
        border: {
          light: '#e5e7eb', // gray-200
          dark: '#374151',  // gray-700
        },
      },
    },
  },
  plugins: [],
}
