module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
        danger: '#e74c3c',
        warning: '#f39c12',
        dark: '#2c3e50',
        light: '#ecf0f1',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      boxShadow: {
        DEFAULT: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
