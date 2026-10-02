'use client';

import * as React from 'react';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';

const options = [
  { value: 'system', label: 'Auto', Icon: MonitorIcon },
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return <div className="theme-switch-placeholder" aria-hidden="true" />;
  }

  const current = theme ?? 'system';

  return (
    <div className="theme-switch" role="radiogroup" aria-label="Toggle theme">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-label={o.label}
          aria-checked={current === o.value}
          title={`${o.label} theme`}
          onClick={() => setTheme(o.value)}
        >
          {current === o.value && (
            <motion.span
              layoutId="theme-option"
              className="theme-switch-indicator"
              transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
            />
          )}
          <o.Icon aria-hidden="true" size={16} />
        </button>
      ))}
    </div>
  );
}
