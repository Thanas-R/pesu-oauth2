// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ThemeProvider } from '@/components/ui/theme-provider';

const mockSetTheme = vi.fn();
const mockResolvedTheme = 'light';

vi.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: mockResolvedTheme,
    setTheme: mockSetTheme,
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Theme Components', () => {
  it('renders ThemeProvider with children', () => {
    render(
      <ThemeProvider>
        <div>Child Content</div>
      </ThemeProvider>
    );
    expect(screen.getByText('Child Content')).toBeDefined();
  });

  it('renders a theme group with auto, light and dark options', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('radiogroup', { name: /toggle theme/i })).toBeDefined();
    fireEvent.click(screen.getByRole('radio', { name: 'Dark' }));
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
    fireEvent.click(screen.getByRole('radio', { name: 'Light' }));
    expect(mockSetTheme).toHaveBeenCalledWith('light');
    fireEvent.click(screen.getByRole('radio', { name: 'Auto' }));
    expect(mockSetTheme).toHaveBeenCalledWith('system');
  });

  it('renders placeholder skeleton in SSR via renderToString', async () => {
    const { renderToString } = await import('react-dom/server');
    const html = renderToString(<ThemeToggle />);
    expect(html).not.toContain('<button');
  });
});
