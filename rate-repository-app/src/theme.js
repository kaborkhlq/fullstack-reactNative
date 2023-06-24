import { Platform } from 'react-native';

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      error: '#d73a4a'
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    // fonts: {
    //   main: 'System',
    // },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    fonts: Platform.select({
        android: 'robot',
        ios: 'sans-serif',
        default: 'System',
      }),
  };
  
  export default theme;