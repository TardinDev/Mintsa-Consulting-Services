/* ============================================================
   MINTSA — Thème JS « Bleu Nuit & Orange » (couleurs du logo)
   Mêmes clés que l'ancien thème (compat. styled-components).
   Surfaces : gray50 = plus sombre … gray900 = blanc le plus clair.
   primary = ORANGE (accent d'action), secondary/accent = BLEU (marque).
   gradientGold = gradient orange (conservé pour compat des CTA).
   ============================================================ */

const theme = {
  // Accent ORANGE (CTA, prix, focus, emphase)
  primary: '#f0901e',
  primaryDark: '#d2740c',
  primaryLight: '#ffab47',

  // Accent BLEU (marque, liens, labels, highlights)
  secondary: '#0e8fd6',
  secondaryLight: '#4cb8ed',
  accent: '#0e8fd6',

  // Texte le plus clair / surfaces claires ponctuelles
  white: '#e9f0f5',
  cream: '#081420',

  // Échelle inversée (sombre) : bas = surfaces, haut = texte
  gray50: '#0a1622',
  gray100: '#0f2233',
  gray200: '#14293d',
  gray300: '#1b344b',
  gray400: '#294a66',
  gray500: '#6d8498',
  gray600: '#9cb1c2',
  gray700: '#bccad7',
  gray800: '#d2dee8',
  gray900: '#e9f0f5',
  black: '#050d16',

  // États
  success: '#3fb98a',
  warning: '#f0901e',
  error: '#e0664f',
  info: '#4cb8ed',

  // Alias hérités
  blue: '#0e8fd6',
  lightGrey: '#0f2233',
  green: '#3fb98a',
  pink: '#e07a9a',
  red: '#e0664f',
  yellow: '#f0901e',
  purple: '#7c8fd0',
  orange: '#f0901e',

  // Gradients — bleu nuit & orange
  gradientPrimary: 'linear-gradient(135deg, #0f2233 0%, #050d16 100%)',
  gradientSecondary: 'linear-gradient(135deg, #0a6fa8 0%, #0e8fd6 100%)',
  gradientSuccess: 'linear-gradient(135deg, #3fb98a 0%, #2d8f69 100%)',
  gradientWarning: 'linear-gradient(135deg, #f0901e 0%, #d2740c 100%)',
  gradientHero: 'linear-gradient(160deg, #0f2233 0%, #081420 50%, #050d16 100%)',
  gradientConsulting: 'linear-gradient(160deg, #0f2233 0%, #081420 50%, #050d16 100%)',
  // CTA principal = gradient ORANGE (clé "gradientGold" conservée par compat)
  gradientGold: 'linear-gradient(135deg, #d2740c 0%, #f0901e 50%, #ffab47 100%)',
  gradientBlue: 'linear-gradient(135deg, #0a6fa8 0%, #0e8fd6 55%, #4cb8ed 100%)',

  // Ombres profondes + lueur orange
  shadowSm: '0 1px 2px rgba(0, 0, 0, 0.45)',
  shadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
  shadowMd: '0 8px 24px rgba(0, 0, 0, 0.5)',
  shadowLg: '0 18px 48px rgba(0, 0, 0, 0.55)',
  shadowXl: '0 30px 70px rgba(0, 0, 0, 0.6)',
  shadow2xl: '0 40px 90px rgba(0, 0, 0, 0.65)',
  shadowCopper: '0 12px 36px rgba(240, 144, 30, 0.3)',
  shadowOrange: '0 12px 36px rgba(240, 144, 30, 0.3)',
  shadowBlue: '0 12px 36px rgba(14, 143, 214, 0.28)',

  // Bordures / lignes fines
  line: 'rgba(233, 240, 245, 0.09)',
  lineStrong: 'rgba(233, 240, 245, 0.16)',
  copperLine: 'rgba(240, 144, 30, 0.32)',
  orangeLine: 'rgba(240, 144, 30, 0.32)',
  blueLine: 'rgba(14, 143, 214, 0.3)',
  copperGlow: 'rgba(240, 144, 30, 0.34)',
  orangeGlow: 'rgba(240, 144, 30, 0.34)',
  blueGlow: 'rgba(14, 143, 214, 0.3)',

  borderRadius: {
    sm: '0.25rem',
    md: '0.4rem',
    lg: '0.625rem',
    xl: '0.875rem',
    '2xl': '1.25rem',
    '3xl': '1.75rem',
    full: '9999px'
  },

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

  transition: {
    fast: '180ms cubic-bezier(0.16, 1, 0.3, 1)',
    normal: '360ms cubic-bezier(0.16, 1, 0.3, 1)',
    slow: '620ms cubic-bezier(0.16, 1, 0.3, 1)'
  },

  // Fonts
  fontDisplay: "'Fraunces Variable', 'Fraunces', Georgia, serif",
  fontBody: "'Hanken Grotesk Variable', 'Hanken Grotesk', -apple-system, sans-serif",

  zDropdown: 1000,
  zSticky: 1020,
  zFixed: 1030,
  zModalBackdrop: 1040,
  zModal: 1050,
  zPopover: 1060,
  zTooltip: 1070,

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

export default theme;
