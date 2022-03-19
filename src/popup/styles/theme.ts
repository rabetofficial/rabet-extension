const screens = {
  sm: { min: '640px', max: '767px' },
  md: { min: '768px', max: '1023px' },
  lg: { min: '1024px', max: '1279px' },
  xl: { min: '1280px', max: '1535px' },
  xxl: { min: '1536px' },
};

const theme = {
  colors: {
    primary: {
      lightest: '#ffffff',
      lighter: '#f3f3f3',
      light: '#d9d9d9',
      main: '#afafaf',
      dark: '#6c6c6c',
      darker: '#444444',
      darkest: '#000000',
    },
    other: {
      lightGray: '#f8f8f8',
    },
    success: {
      main: '#26c362',
    },
    error: {
      main: '#ce3d3d',
    },
    warn: {
      main: '#f48b00',
    },
  },
  screens: { ...screens },
  rounded: {
    main: '2px',
    md: '4px',
    lg: '8px',
  },
};

export default theme;
