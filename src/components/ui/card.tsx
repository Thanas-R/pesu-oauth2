'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'ascii-card relative p-6 overflow-hidden transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  iconColor?: string;
}

export function CardHeader({
  className,
  children,
  icon,
  iconColor,
  ...props
}: CardHeaderProps) {
  if (icon) {
    return (
      <div className={cn('flex items-center gap-2.5 mb-4', className)} {...props}>
        <div
          className="w-9 h-9 border border-line flex items-center justify-center text-foreground shrink-0"
          data-icon-color={iconColor}
        >
          {icon}
        </div>
        <div>{children}</div>
      </div>
    );
  }
  return (
    <div className={cn('mb-4 space-y-1.5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-xl font-semibold text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-ink-muted leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
}
