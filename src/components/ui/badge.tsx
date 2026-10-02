'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'testing' | 'pending' | 'pending_production' | 'production' | 'suspended' | 'identity' | 'delegated' | 'neutral' | 'required' | 'optional';
}

export function Badge({
  className,
  variant = 'neutral',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    testing:
      'bg-zinc-900/10 text-zinc-800 dark:bg-white/10 dark:text-zinc-200 border border-zinc-900/10 dark:border-white/10',
    pending:
      'bg-zinc-900/10 text-zinc-800 dark:bg-white/10 dark:text-zinc-200 border border-zinc-900/10 dark:border-white/10',
    pending_production:
      'bg-zinc-900/10 text-zinc-800 dark:bg-white/10 dark:text-zinc-200 border border-zinc-900/10 dark:border-white/10',
    production:
      'bg-zinc-900/10 text-zinc-800 dark:bg-white/10 dark:text-zinc-200 border border-zinc-900/10 dark:border-white/10',
    suspended:
      'bg-zinc-900/10 text-zinc-800 dark:bg-white/10 dark:text-zinc-200 border border-zinc-900/10 dark:border-white/10',
    identity:
      'bg-zinc-900/10 text-zinc-800 dark:bg-white/10 dark:text-zinc-200 border border-zinc-900/10 dark:border-white/10',
    delegated:
      'bg-zinc-900/10 text-zinc-800 dark:bg-white/10 dark:text-zinc-200 border border-zinc-900/10 dark:border-white/10',
    neutral:
      'bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 border border-black/5 dark:border-white/10',
    required:
      'bg-zinc-900/10 text-zinc-800 dark:bg-white/10 dark:text-zinc-200 border border-zinc-900/10 dark:border-white/10',
    optional:
      'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide uppercase',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
