/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        fnp: {
          pink:    '#e91e8c',
          'pink-light': '#fce4f3',
          'pink-muted': '#f8d7ee',
          gold:    '#c9921a',
          'gold-light': '#fdf3e0',
          cream:   '#fdfaf8',
          'warm':  '#fef6f2',
          dark:    '#1a1a1a',
          muted:   '#6b7280',
          border:  '#f0e0ec',
        },
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:    '0 4px 24px rgba(233,30,140,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 40px rgba(233,30,140,0.16), 0 2px 8px rgba(0,0,0,0.06)',
        gold:    '0 4px 20px rgba(201,146,26,0.25)',
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #fdfaf8 0%, #fef6f2 50%, #fdf4fb 100%)',
        'pink-gradient': 'linear-gradient(135deg, #e91e8c, #c9921a)',
        'card-glass':    'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
      },
    },
  },
  plugins: [],
}
