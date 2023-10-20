import { Theme } from '@emotion/react';

const colors = {
  text: '#333',
  background: '#f2efe6',
  primary: '#ef3e36',
  secondary: '#17bebb',
  accent: '#ef3e36',
  highlight: '#fff',
  muted: '#888',

  accentHigh: '#372248',
  accentLow: '#171123',

  textTitle: '#555',
  textHeading: '#666',

  shadow: '#22222200',
  bgLight: '#f2efe6',
  bgDark: '#fffcf2',

  backGradSketchHigh: '#118ab24d',
  backGradSketchLow: '#18284844',
  backTextShadow: '#00000000',

  contactText: '#1f242c',
  contactInput: '#ccc',

  backOffWhite: '#fdfdfd',
  timelineLine: '#333',

  black: '#000000',

  workLogoBrightness: '25%',

  modes: {
    dark: {
      text: '#eee',
      background: '#171a20',
      primary: '#ef3e36',
      secondary: '#17bebb',
      accent: '#ef3e36',
      highlight: '#fff',
      muted: '#999',

      accentHigh: '#06d6a0',
      accentLow: '#118ab2',

      textTitle: '#ccc',
      textHeading: '#ddd',

      shadow: '#171a20',
      bgLight: '#1f242c',
      bgDark: '#171a20',

      backGradSketchHigh: '#18284844',
      backGradSketchLow: '#18284844',
      backTextShadow: '#1d424e',

      contactText: '#1f242c',
      contactInput: '#ccc',

      backOffWhite: '#fdfdfd',
      timelineLine: '#fff',

      workLogoBrightness: '100%',
    },
  },
};

export const theme: Theme = {
  config: {
    initialColorModeName: 'dark',
  },
  colors,
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    heading: 'Georgia, serif',
    monospace: 'Menlo, monospace',
    code: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  letterSpacings: {
    body: 'normal',
    caps: '0.2em',
  },
};
