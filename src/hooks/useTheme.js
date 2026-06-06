import { useContext } from 'react';
import { ThemeContext } from '../context/themeContextValue';
import { ERROR_MESSAGES } from '../utils/errors';

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(ERROR_MESSAGES.THEME_CONTEXT);
  }
  return ctx;
}
