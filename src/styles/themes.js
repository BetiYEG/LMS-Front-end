export const themes = {
  light: {
    id: 'light',
    name: 'Light',
    colors: {
      background: '#ffffff',
      foreground: '#0a0a0a',
      card: '#ffffff',
      cardForeground: '#0a0a0a',
      popover: '#ffffff',
      popoverForeground: '#0a0a0a',
      primary: '#2563eb',
      primaryForeground: '#f8fafc',
      secondary: '#f1f5f9',
      secondaryForeground: '#0f172a',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      accent: '#f1f5f9',
      accentForeground: '#0f172a',
      destructive: '#ef4444',
      destructiveForeground: '#f8fafc',
      border: '#e2e8f0',
      input: '#e2e8f0',
      ring: '#2563eb',
    },
    borderRadius: '0.5rem',
  },
  
  dark: {
    id: 'dark',
    name: 'Dark',
    colors: {
      background: '#0a0a0a',
      foreground: '#f8fafc',
      card: '#0f172a',
      cardForeground: '#f8fafc',
      popover: '#0f172a',
      popoverForeground: '#f8fafc',
      primary: '#3b82f6',
      primaryForeground: '#0f172a',
      secondary: '#1e293b',
      secondaryForeground: '#f8fafc',
      muted: '#1e293b',
      mutedForeground: '#94a3b8',
      accent: '#1e293b',
      accentForeground: '#f8fafc',
      destructive: '#ef4444',
      destructiveForeground: '#f8fafc',
      border: '#1e293b',
      input: '#1e293b',
      ring: '#3b82f6',
    },
    borderRadius: '0.5rem',
  },
  
  blue: {
    id: 'blue',
    name: 'Blue',
    colors: {
      background: '#f8fafc',
      foreground: '#0f172a',
      card: '#ffffff',
      cardForeground: '#0f172a',
      popover: '#ffffff',
      popoverForeground: '#0f172a',
      primary: '#1d4ed8',
      primaryForeground: '#f8fafc',
      secondary: '#e2e8f0',
      secondaryForeground: '#0f172a',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      accent: '#dbeafe',
      accentForeground: '#1e3a8a',
      destructive: '#ef4444',
      destructiveForeground: '#f8fafc',
      border: '#e2e8f0',
      input: '#e2e8f0',
      ring: '#2563eb',
    },
    borderRadius: '0.5rem',
  },
  
  purple: {
    id: 'purple',
    name: 'Purple',
    colors: {
      background: '#faf5ff',
      foreground: '#1a0a2e',
      card: '#ffffff',
      cardForeground: '#1a0a2e',
      popover: '#ffffff',
      popoverForeground: '#1a0a2e',
      primary: '#7c3aed',
      primaryForeground: '#faf5ff',
      secondary: '#ede9fe',
      secondaryForeground: '#1a0a2e',
      muted: '#f3e8ff',
      mutedForeground: '#7c3aed',
      accent: '#ede9fe',
      accentForeground: '#5b21b6',
      destructive: '#ef4444',
      destructiveForeground: '#faf5ff',
      border: '#e5deef',
      input: '#e5deef',
      ring: '#7c3aed',
    },
    borderRadius: '0.5rem',
  },
  
  green: {
    id: 'green',
    name: 'Green',
    colors: {
      background: '#f0fdf4',
      foreground: '#052e16',
      card: '#ffffff',
      cardForeground: '#052e16',
      popover: '#ffffff',
      popoverForeground: '#052e16',
      primary: '#16a34a',
      primaryForeground: '#f0fdf4',
      secondary: '#dcfce7',
      secondaryForeground: '#052e16',
      muted: '#dcfce7',
      mutedForeground: '#16a34a',
      accent: '#bbf7d0',
      accentForeground: '#14532d',
      destructive: '#ef4444',
      destructiveForeground: '#f0fdf4',
      border: '#bbf7d0',
      input: '#bbf7d0',
      ring: '#16a34a',
    },
    borderRadius: '0.5rem',
  },
  
  orange: {
    id: 'orange',
    name: 'Orange',
    colors: {
      background: '#fff7ed',
      foreground: '#1c0a00',
      card: '#ffffff',
      cardForeground: '#1c0a00',
      popover: '#ffffff',
      popoverForeground: '#1c0a00',
      primary: '#ea580c',
      primaryForeground: '#fff7ed',
      secondary: '#fed7aa',
      secondaryForeground: '#1c0a00',
      muted: '#ffedd5',
      mutedForeground: '#ea580c',
      accent: '#fed7aa',
      accentForeground: '#9a3412',
      destructive: '#ef4444',
      destructiveForeground: '#fff7ed',
      border: '#fed7aa',
      input: '#fed7aa',
      ring: '#ea580c',
    },
    borderRadius: '0.5rem',
  },
}

// Theme configuration
export const themeConfig = {
  defaultTheme: 'light',
  themes: themes,
  storageKey: 'lms-theme',
  systemPreference: true, // Use system preference as fallback
}

// Get theme colors for CSS variables
export const getThemeCSS = (themeId) => {
  const theme = themes[themeId] || themes.light
  const { colors } = theme
  
  return `
    --background: ${colors.background};
    --foreground: ${colors.foreground};
    --card: ${colors.card};
    --card-foreground: ${colors.cardForeground};
    --popover: ${colors.popover};
    --popover-foreground: ${colors.popoverForeground};
    --primary: ${colors.primary};
    --primary-foreground: ${colors.primaryForeground};
    --secondary: ${colors.secondary};
    --secondary-foreground: ${colors.secondaryForeground};
    --muted: ${colors.muted};
    --muted-foreground: ${colors.mutedForeground};
    --accent: ${colors.accent};
    --accent-foreground: ${colors.accentForeground};
    --destructive: ${colors.destructive};
    --destructive-foreground: ${colors.destructiveForeground};
    --border: ${colors.border};
    --input: ${colors.input};
    --ring: ${colors.ring};
    --radius: ${theme.borderRadius};
  `
}

export default {
  themes,
  themeConfig,
  getThemeCSS,
}