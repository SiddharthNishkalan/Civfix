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
        'primary': '#00452d',
        'primary-container': '#1f5d42',
        'on-primary': '#ffffff',
        'on-primary-container': '#95d4b1',
        'primary-fixed': '#b1f0cd',
        'primary-fixed-dim': '#95d4b2',
        'on-primary-fixed': '#002113',
        'on-primary-fixed-variant': '#0f5137',
        'inverse-primary': '#95d4b2',
        
        'secondary': '#3c6938',
        'secondary-container': '#bcf0b2',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#416f3d',
        'secondary-fixed': '#bcf0b2',
        'secondary-fixed-dim': '#a1d398',
        'on-secondary-fixed': '#002203',
        'on-secondary-fixed-variant': '#245022',
        
        'tertiary': '#4d3800',
        'tertiary-container': '#6a4e00',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#efc052',
        'tertiary-fixed': '#ffdf9e',
        'tertiary-fixed-dim': '#f0c052',
        'on-tertiary-fixed': '#261a00',
        'on-tertiary-fixed-variant': '#5b4300',
        
        'surface': '#eefdf4',
        'surface-dim': '#cfded5',
        'surface-bright': '#eefdf4',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#e8f7ee',
        'surface-container': '#e2f1e8',
        'surface-container-high': '#ddece3',
        'surface-container-highest': '#d7e6dd',
        'surface-variant': '#d7e6dd',
        'surface-tint': '#2d694d',
        
        'on-surface': '#111e19',
        'on-surface-variant': '#404943',
        'inverse-surface': '#26332d',
        'inverse-on-surface': '#e5f4eb',
        
        'outline': '#707972',
        'outline-variant': '#bfc9c1',
        
        'error': '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
        
        'background': '#eefdf4',
        'on-background': '#111e19',
        'civic-cream': '#f7f5ef',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'civic-sm': '0px 2px 8px rgba(31, 93, 66, 0.06)',
        'civic': '0px 4px 16px rgba(31, 93, 66, 0.08)',
        'civic-lg': '0px 8px 24px rgba(31, 93, 66, 0.12)',
        'civic-float': '0px 12px 32px rgba(0, 45, 29, 0.15)',
      }
    },
  },
  plugins: [],
}
