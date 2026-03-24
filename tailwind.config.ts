import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        p:      '#8e78fb',
        p2:     '#ede9ff',
        p3:     '#c4b8fd',
        orange: '#ff9b28',
        o2:     '#fff3e4',
        cyan:   '#47c7ea',
        c2:     '#e4f8fd',
        pink:   '#f65887',
        pk2:    '#ffe4ee',
        brand: {
          bg:   '#f7f7fe',
          t1:   '#1a1730',
          t2:   '#46426a',
          t3:   '#9590b8',
          bd:   '#e8e4ff',
          bd2:  '#d4ccff',
          white:'#ffffff',
        },
        dark: {
          bg:   '#12111a',
          white:'#1c1a2e',
          t1:   '#f0eeff',
          t2:   '#b8b2e0',
          t3:   '#7a7598',
          bd:   '#2e2a4a',
          bd2:  '#413b6e',
          p2:   '#1e1a35',
          p3:   '#3d3570',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'Tajawal', 'sans-serif'],
      },
      borderRadius: {
        'xl':  '12px',
        '2xl': '16px',
        '3xl': '24px',
        'full':'9999px',
      },
      animation: {
        'blob-move':    'blobMove 9s ease-in-out infinite',
        'float-pill':   'floatPill 6s ease-in-out infinite',
        'blink':        'blink 0.8s ease-in-out infinite',
        'ring-pulse':   'ringPulse 4s ease-in-out infinite',
        'fade-down':    'fadeDown 0.7s ease both',
        'fade-up':      'fadeUp 0.7s ease both',
        'slide-down':   'slideDown 0.3s ease both',
      },
      keyframes: {
        blobMove:   { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(30px,-20px) scale(1.05)' }, '66%': { transform: 'translate(-20px,15px) scale(0.95)' } },
        floatPill:  { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        blink:      { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        ringPulse:  { '0%,100%': { transform: 'scale(1)', opacity: '0.25' }, '50%': { transform: 'scale(1.05)', opacity: '0.1' } },
        fadeDown:   { from: { opacity: '0', transform: 'translateY(-16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeUp:     { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown:  { from: { opacity: '0', height: '0' }, to: { opacity: '1', height: 'var(--radix-accordion-content-height)' } },
      },
    },
  },
  plugins: [],
}

export default config
