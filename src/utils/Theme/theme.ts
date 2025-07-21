
const theme = {
  // Couleurs principales - Palette Consulting Professionnelle
  primary: '#1e40af', // Bleu professionnel
  primaryDark: '#1e3a8a', // Bleu foncé
  primaryLight: '#3b82f6', // Bleu clair
  secondary: '#f59e0b', // Orange doré pour les accents
  accent: '#10b981', // Vert émeraude pour le succès
  
  // Couleurs neutres professionnelles
  white: '#ffffff',
  gray50: '#f8fafc',
  gray100: '#f1f5f9',
  gray200: '#e2e8f0',
  gray300: '#cbd5e1',
  gray400: '#94a3b8',
  gray500: '#64748b',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1e293b',
  gray900: '#0f172a',
  black: '#000000',
  
  // Couleurs de statut
  success: '#10b981', // Vert émeraude
  warning: '#f59e0b', // Orange
  error: '#ef4444', // Rouge
  info: '#3b82f6', // Bleu info
  
  // Couleurs spéciales pour le projet
  blue: '#1e40af', // Bleu principal du projet
  lightGrey: '#f8fafc', // Gris très clair pour les fonds
  green: '#059669',
  pink: '#db2777',
  red: '#dc2626',
  yellow: '#d97706',
  purple: '#7c3aed',
  orange: '#f97316', // Orange vif
  
  // Couleurs pour les gradients - Professionnels
  gradientPrimary: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
  gradientSecondary: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
  gradientSuccess: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  gradientWarning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  gradientHero: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #6366f1 100%)',
  gradientConsulting: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)',
  
  // Ombres modernes et professionnelles
  shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  shadowXl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  shadow2xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  
  // Bordures
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px'
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
  