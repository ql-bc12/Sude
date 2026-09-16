/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        stride: {
          primary: '#FF5528',
          glow: '#FF7338',
          dark: '#0E0907',
          card: '#18100C',
          border: '#2E1E17',
          'text-muted': '#A3928B',
        },
      },
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
        display: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'flow': 'flow 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 85, 40, 0.3), 0 0 40px rgba(255, 85, 40, 0.1)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 85, 40, 0.5), 0 0 60px rgba(255, 85, 40, 0.2)' },
        },
        flow: {
          '0%': { strokeDashoffset: 20 },
          '100%': { strokeDashoffset: 0 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
