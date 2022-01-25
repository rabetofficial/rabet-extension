module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-lightest': '#ffffff',
        'primary-lighter': '#f3f3f3',
        'primary-light': '#d9d9d9',
        primary: '#afafaf',
        'primary-dark': '#6c6c6c',
        'primary-darker': '#444444',
        'primary-darkest': '#000000',
        success: '#26c362',
        error: '#ce3d3d',
      },
      boxShadow: {
        base: '0 4px 10px 0 rgba(33, 35, 38, 0.05)',
        lg: '0 2px 12px 0 rgba(0, 0, 0, 0.05)',
      },
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
    },
  },
  plugins: [],
};
