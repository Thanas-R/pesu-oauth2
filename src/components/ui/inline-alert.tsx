'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface InlineAlertProps {
  message: string;
  icon?: React.ReactNode;
  variant?: 'error' | 'warning' | 'info' | 'success';
  className?: string;
}

const variantStyles = {
  error:
    'bg-zinc-600/10 border border-zinc-600/20 text-zinc-900 dark:text-zinc-500',
  warning:
    'bg-zinc-600/10 border border-zinc-600/20 text-zinc-800 dark:text-zinc-500',
  info:
    'bg-zinc-600/10 border border-zinc-600/20 text-zinc-800 dark:text-zinc-500',
  success:
    'bg-zinc-600/10 border border-zinc-600/20 text-zinc-800 dark:text-zinc-500',
};

export function InlineAlert({
  message,
  icon,
  variant = 'error',
  className,
}: InlineAlertProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm',
        variantStyles[variant],
        className
      )}
      role="alert"
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{message}</span>
    </div>
  );
}
