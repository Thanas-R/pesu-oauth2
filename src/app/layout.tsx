import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
  title: 'PESU OAuth2 | Sign in with PESU',
  description:
    'Unofficial OpenID Connect identity provider and developer portal for PESU accounts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>{/* eslint-disable @next/next/no-page-custom-font -- loaded for every App Router page */}<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet" /></head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        <ThemeProvider>
          {/* Shared site navigation */}
          <header className="site-header sticky top-0 z-40 w-full transition-colors">
            <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-6">
                <Link
                  href="/"
                  className="site-mark hover:opacity-70 transition-opacity"
                >
                  <span>PESU</span><span className="site-mark-glyph">OAuth2</span>
                </Link>
                <Navbar />
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
            {children}
          </main>

        </ThemeProvider>
      </body>
    </html>
  );
}
