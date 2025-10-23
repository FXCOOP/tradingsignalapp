// TradeFlow Design System - Enhanced Professional Trading Platform
// Unified design tokens for consistent UX across the application

export const designSystem = {
  colors: {
    // Primary Brand Colors - Financial Blue Theme
    primary: {
      main: '#0052CC',       // Deep professional blue
      light: '#0065FF',      // Vibrant blue
      dark: '#003D99',       // Dark blue
      bg: '#E8F2FF',         // Light blue background
      hover: '#0047B3',      // Hover state
      gradient: 'linear-gradient(135deg, #0052CC 0%, #0065FF 100%)'
    },

    // Status Colors - Trading Specific
    success: {
      main: '#00C853',       // Professional green
      light: '#5EFC82',      // Light green
      dark: '#009624',       // Dark green
      bg: 'rgba(0, 200, 83, 0.08)',
      gradient: 'linear-gradient(135deg, #00C853 0%, #00E676 100%)'
    },
    danger: {
      main: '#FF1744',       // Professional red
      light: '#FF5252',      // Light red
      dark: '#D50000',       // Dark red
      bg: 'rgba(255, 23, 68, 0.08)',
      gradient: 'linear-gradient(135deg, #FF1744 0%, #F50057 100%)'
    },
    warning: {
      main: '#FFA000',       // Professional orange
      light: '#FFCA28',      // Light orange
      dark: '#FF6F00',       // Dark orange
      bg: 'rgba(255, 160, 0, 0.08)',
      gradient: 'linear-gradient(135deg, #FFA000 0%, #FFB300 100%)'
    },
    info: {
      main: '#2962FF',       // Information blue
      light: '#448AFF',      // Light info blue
      dark: '#0039CB',       // Dark info blue
      bg: 'rgba(41, 98, 255, 0.08)',
      gradient: 'linear-gradient(135deg, #2962FF 0%, #448AFF 100%)'
    },

    // Neutral Grays - Enhanced contrast
    neutral: {
      0: '#FFFFFF',          // Pure white
      50: '#F8FAFC',         // Almost white
      100: '#F1F5F9',        // Very light gray
      200: '#E2E8F0',        // Light gray
      300: '#CBD5E1',        // Medium-light gray
      400: '#94A3B8',        // Medium gray
      500: '#64748B',        // Gray
      600: '#475569',        // Dark-medium gray
      700: '#334155',        // Dark gray
      800: '#1E293B',        // Very dark gray
      900: '#0F172A',        // Almost black
      950: '#020617'         // Near black
    },

    // Accent (for broker/premium features) - Enhanced gold
    accent: {
      gold: '#FFD700',
      goldLight: '#FFE55C',
      goldDark: '#E6C200',
      goldGradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      goldShadow: '0 8px 32px rgba(255, 215, 0, 0.35)'
    },

    // Background gradients
    backgrounds: {
      primary: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      secondary: 'linear-gradient(135deg, #F8FAFC 0%, #E8F2FF 100%)',
      dark: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
      card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)',
      glassmorphism: 'rgba(255, 255, 255, 0.85)'
    }
  },

  // Typography System
  typography: {
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace'
    },

    // Font Sizes with Mobile/Desktop variants
    sizes: {
      hero: { mobile: '36px', desktop: '56px' },
      h1: { mobile: '28px', desktop: '40px' },
      h2: { mobile: '24px', desktop: '32px' },
      h3: { mobile: '20px', desktop: '24px' },
      h4: { mobile: '18px', desktop: '20px' },
      body: { mobile: '16px', desktop: '16px' },
      bodySmall: { mobile: '14px', desktop: '14px' },
      caption: { mobile: '13px', desktop: '13px' },
      tiny: { mobile: '12px', desktop: '12px' }
    },

    // Font Weights
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },

    // Line Heights
    lineHeights: {
      tight: '1.2',
      snug: '1.4',
      normal: '1.5',
      relaxed: '1.7',
      loose: '2'
    },

    // Letter Spacing
    letterSpacing: {
      tighter: '-0.02em',
      tight: '-0.01em',
      normal: '0',
      wide: '0.01em',
      wider: '0.02em'
    }
  },

  // Spacing System (multiples of 4px)
  spacing: {
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',

    // Semantic spacing
    container: {
      mobile: '16px',
      desktop: '24px'
    },
    section: {
      mobile: '32px',
      tablet: '48px',
      desktop: '64px'
    }
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    full: '9999px'
  },

  // Shadows - Professional elevation system
  shadows: {
    none: 'none',
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
    md: '0 4px 16px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.12)',
    xl: '0 16px 48px rgba(0, 0, 0, 0.15)',
    '2xl': '0 24px 64px rgba(0, 0, 0, 0.18)',
    '3xl': '0 32px 80px rgba(0, 0, 0, 0.22)',

    // Colored shadows for CTAs and signal cards
    primary: '0 8px 24px rgba(0, 82, 204, 0.25)',
    success: '0 8px 24px rgba(0, 200, 83, 0.25)',
    danger: '0 8px 24px rgba(255, 23, 68, 0.25)',
    gold: '0 8px 32px rgba(255, 215, 0, 0.4)',

    // Card-specific shadows
    card: '0 2px 16px rgba(0, 0, 0, 0.06)',
    cardHover: '0 12px 40px rgba(0, 0, 0, 0.15)',

    // Inner shadows for depth
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
    innerLg: 'inset 0 4px 8px rgba(0, 0, 0, 0.1)'
  },

  // Breakpoints
  breakpoints: {
    mobile: 640,
    tablet: 1024,
    desktop: 1280,
    wide: 1536
  },

  // Common Transitions
  transitions: {
    fast: 'all 0.15s ease',
    normal: 'all 0.3s ease',
    slow: 'all 0.5s ease',
    spring: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },

  // Z-Index layers
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
  }
}

// Helper function to get responsive value
export const getResponsiveValue = (isMobile: boolean, mobileValue: string, desktopValue: string) => {
  return isMobile ? mobileValue : desktopValue
}

// Helper function to get font size from design system
export const getFontSize = (size: keyof typeof designSystem.typography.sizes, isMobile: boolean) => {
  const sizeObj = designSystem.typography.sizes[size]
  return isMobile ? sizeObj.mobile : sizeObj.desktop
}

export default designSystem
