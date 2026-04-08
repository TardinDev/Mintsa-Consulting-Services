
const theme = {
  // Luxury Consulting Palette
  primary: '#0f2b5b',
  primaryDark: '#091d3e',
  primaryLight: '#1a4a8a',
  secondary: '#c8963e',
  secondaryLight: '#dbb06a',
  accent: '#0d9488',

  // Warm neutral palette
  white: '#ffffff',
  cream: '#faf8f5',
  gray50: '#f7f6f3',
  gray100: '#efede8',
  gray200: '#ddd9d0',
  gray300: '#c4bfb4',
  gray400: '#9a9487',
  gray500: '#706a5f',
  gray600: '#524d44',
  gray700: '#3b3731',
  gray800: '#252220',
  gray900: '#131211',
  black: '#000000',

  // Status colors
  success: '#0d9488',
  warning: '#c8963e',
  error: '#c0392b',
  info: '#1a4a8a',

  // Legacy color aliases
  blue: '#0f2b5b',
  lightGrey: '#f7f6f3',
  green: '#0d9488',
  pink: '#db2777',
  red: '#c0392b',
  yellow: '#c8963e',
  purple: '#6b21a8',
  orange: '#c8963e',

  // Gradients - Deep luxury
  gradientPrimary: 'linear-gradient(135deg, #0f2b5b 0%, #091d3e 100%)',
  gradientSecondary: 'linear-gradient(135deg, #1a4a8a 0%, #0f2b5b 100%)',
  gradientSuccess: 'linear-gradient(135deg, #0d9488 0%, #0a7a70 100%)',
  gradientWarning: 'linear-gradient(135deg, #c8963e 0%, #a67c30 100%)',
  gradientHero: 'linear-gradient(135deg, #0f2b5b 0%, #1a4a8a 40%, #0d2d5e 100%)',
  gradientConsulting: 'linear-gradient(160deg, #0f2b5b 0%, #091d3e 40%, #060f1f 100%)',
  gradientGold: 'linear-gradient(135deg, #c8963e 0%, #dbb06a 50%, #c8963e 100%)',

  // Shadows - subtle warmth
  shadowSm: '0 1px 2px 0 rgb(15 43 91 / 0.04)',
  shadow: '0 1px 3px 0 rgb(15 43 91 / 0.08), 0 1px 2px -1px rgb(15 43 91 / 0.06)',
  shadowMd: '0 4px 6px -1px rgb(15 43 91 / 0.07), 0 2px 4px -2px rgb(15 43 91 / 0.05)',
  shadowLg: '0 10px 15px -3px rgb(15 43 91 / 0.08), 0 4px 6px -4px rgb(15 43 91 / 0.04)',
  shadowXl: '0 20px 25px -5px rgb(15 43 91 / 0.1), 0 8px 10px -6px rgb(15 43 91 / 0.06)',
  shadow2xl: '0 25px 50px -12px rgb(15 43 91 / 0.2)',

  // Border radius
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },

  // Transitions
  transition: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out'
  },

  // Z-index
  zDropdown: 1000,
  zSticky: 1020,
  zFixed: 1030,
  zModalBackdrop: 1040,
  zModal: 1050,
  zPopover: 1060,
  zTooltip: 1070,

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

export default theme;
