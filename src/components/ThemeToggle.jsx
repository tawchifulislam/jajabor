'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'jajabor-theme';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(current === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  function toggle() {
    const next = isDark ? 'light' : 'dark';

    function apply() {
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEY, next);
      setIsDark(next === 'dark');
    }

    if (document.startViewTransition) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition hover:bg-card"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
