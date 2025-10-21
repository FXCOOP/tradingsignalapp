// TradeFlow Design System
// Unified design tokens for consistent UX across the application

export const designSystem = {
  colors: {
    // Primary Brand Colors
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1e40af',
      bg: '#eff6ff'
    },

    // Status Colors
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      bg: 'rgba(16, 185, 129, 0.12)'
    },
    danger: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      bg: 'rgba(239, 68, 68, 0.12)'
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      bg: 'rgba(245, 158, 11, 0.12)'
    },
    info: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
      bg: 'rgba(139, 92, 246, 0.12)'
    },

    // Neutral Grays
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    },

    // Accent (for broker/premium features)
    accent: {
      gold: '#FFD700',
      goldLight: '#FFA500',
      goldDark: '#DAA520'
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

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 30px rgba(0, 0, 0, 0.12)',
    xl: '0 20px 60px rgba(0, 0, 0, 0.15)',
    '2xl': '0 25px 80px rgba(0, 0, 0, 0.2)',

    // Colored shadows for CTAs
    primary: '0 4px 12px rgba(37, 99, 235, 0.3)',
    success: '0 4px 12px rgba(16, 185, 129, 0.3)',
    gold: '0 4px 12px rgba(255, 215, 0, 0.4)'
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
