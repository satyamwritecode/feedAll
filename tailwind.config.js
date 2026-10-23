/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f3',
          100: '#dceee3',
          200: '#bbdecb',
          300: '#8ec7ab',
          400: '#5da987',
          500: '#3c8c6a',
          600: '#2c7053',
          700: '#225943',
          800: '#1a4736',
          900: '#134431', // Brand Dark Forest Green
          950: '#0a261b', // Ultra Deep Forest
        },
        brand: {
          dark: '#134431',
          darker: '#0a261b',
          orange: '#F26224',
          orangeHover: '#d94f15',
          gold: '#F5A623',
          leaf: '#4EA044',
          cream: '#FCFBF7',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
