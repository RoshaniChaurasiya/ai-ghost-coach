import { useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './themeContextValue';
import { THEME_STORAGE_KEY, THEMES } from '../utils/constants';

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return THEMES.light;
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === THEMES.dark || stored === THEMES.light) {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.dark
    : THEMES.light;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(THEMES.light, THEMES.dark);
    root.classList.add(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === THEMES.dark,
      toggleTheme: () => setTheme((current) => (current === THEMES.dark ? THEMES.light : THEMES.dark)),
      setTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
