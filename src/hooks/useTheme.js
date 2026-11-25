import { useState, useEffect, useCallback } from 'react';

const THEME_STORAGE_KEY = 'cube_theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

/**
 * Unified theme hook backed by a single localStorage key ('cube_theme').
 * Syncs `dark` class on `document.documentElement` and broadcasts `theme-change`
 * so multiple consumers (e.g. App and LandingNavbar) stay in sync.
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      window.dispatchEvent(
        new CustomEvent('theme-change', { detail: { isDark: theme === 'dark', theme } })
      );
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  useEffect(() => {
    const handleThemeChange = (e) => {
      const nextTheme = e?.detail?.theme ?? (e?.detail?.isDark ? 'dark' : 'light');
      setTheme((prev) => (prev === nextTheme ? prev : nextTheme));
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    setTheme,
    toggleTheme,
  };
}
