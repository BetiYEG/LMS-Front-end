// src/utils/colors.ts

export const teamColors = {
  default: {
    primary: '#4f46e5',
    secondary: '#6366f1',
    accent: '#818cf8',
    background: '#f8fafc',
    text: '#1e293b',
  },
  osu: {
    primary: '#0891b2',
    secondary: '#06b6d4',
    accent: '#22d3ee',
    background: '#ecfeff',
    text: '#164e63',
  },
  oeb: {
    primary: '#2563eb',
    secondary: '#3b82f6',
    accent: '#60a5fa',
    background: '#eff6ff',
    text: '#1e3a8a',
  },
  central: {
    primary: '#d97706',
    secondary: '#f59e0b',
    accent: '#fbbf24',
    background: '#fffbeb',
    text: '#78350f',
  },
  geb: {
    primary: '#dc2626',
    secondary: '#ef4444',
    accent: '#f87171',
    background: '#fef2f2',
    text: '#7f1d1d',
  },
}

export const getTeamColors = (teamKey: string = 'default') => {
  return teamColors[teamKey as keyof typeof teamColors] || teamColors.default
}

export const applyTeamColors = (teamKey: string = 'default') => {
  const colors = getTeamColors(teamKey)
  const root = document.documentElement
  
  root.style.setProperty('--primary-color', colors.primary)
  root.style.setProperty('--secondary-color', colors.secondary)
  root.style.setProperty('--accent-color', colors.accent)
  root.style.setProperty('--bg-color', colors.background)
  root.style.setProperty('--text-color', colors.text)
  
  root.style.setProperty('--primary', colors.primary)
  root.style.setProperty('--primary-foreground', '#ffffff')
  root.style.setProperty('--secondary', colors.secondary)
  root.style.setProperty('--secondary-foreground', '#ffffff')
  root.style.setProperty('--accent', colors.accent)
  root.style.setProperty('--accent-foreground', '#ffffff')
  root.style.setProperty('--background', colors.background)
  root.style.setProperty('--foreground', colors.text)
}

export default {
  teamColors,
  getTeamColors,
  applyTeamColors,
}