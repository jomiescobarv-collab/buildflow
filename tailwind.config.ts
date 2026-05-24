import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Azul acero oscuro — metálico, profundo, desaturado
        brand: {
          50:  '#f0f3ff',
          100: '#dde4ff',
          200: '#beccff',
          300: '#91a8fd',
          400: '#5e7bf8',
          500: '#3555f0',
          600: '#1f3dd6',  // botones / estado activo — azul acero
          700: '#1630b0',  // hover — marino profundo
          800: '#122690',
          900: '#0f1c6e',
          950: '#090f45',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
