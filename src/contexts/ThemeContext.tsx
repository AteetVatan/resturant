import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'teal' | 'sunset' | 'forest' | 'royal' | 'ocean';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Array<{
    id: Theme;
    name: string;
    description: string;
    preview: string;
  }>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = [
  {
    id: 'teal' as Theme,
    name: 'Teal Elegance',
    description: 'Classic teal sophistication',
    preview: 'hsl(174, 45%, 45%)'
  },
  {
    id: 'sunset' as Theme,
    name: 'Sunset Spice',
    description: 'Warm Afghan sunset colors',
    preview: 'hsl(25, 85%, 55%)'
  },
  {
    id: 'forest' as Theme,
    name: 'Forest Garden',
    description: 'Natural green harmony',
    preview: 'hsl(140, 60%, 35%)'
  },
  {
    id: 'royal' as Theme,
    name: 'Royal Purple',
    description: 'Majestic Afghan celebration',
    preview: 'hsl(280, 65%, 45%)'
  },
  {
    id: 'ocean' as Theme,
    name: 'Ocean Blue',
    description: 'Deep ocean tranquility',
    preview: 'hsl(210, 70%, 45%)'
  }
];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('teal');

  useEffect(() => {
    const savedTheme = localStorage.getItem('rouin-safi-theme') as Theme;
    if (savedTheme && themes.find(t => t.id === savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('rouin-safi-theme', currentTheme);
  }, [currentTheme]);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
