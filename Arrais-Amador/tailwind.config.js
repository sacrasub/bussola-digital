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
        navy: {
          950: '#040B14',
          900: '#07101E',
          850: '#091526',
          800: '#0B192C',
          700: '#1E3E62',
          600: '#2E5A88',
        },
        gold: {
          300: '#FDE047',
          400: '#F5BE75',
          500: '#E0A96D',
          600: '#C78F52',
        },
        maritime: {
          red: '#EF4444',
          green: '#10B981',
          yellow: '#F59E0B',
          blue: '#0284C7',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'flip-in': 'flipIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
