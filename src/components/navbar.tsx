'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    fetch('/api/internal/auth/status')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data) {
          setIsAuthenticated(Boolean(data.authenticated));
          setIsAdmin(Boolean(data.isAdmin));
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/internal/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setIsAdmin(false);
      router.push('/');
      router.refresh();
    } catch {
      router.push('/');
    }
  };

  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden sm:flex items-center gap-4 text-xs font-medium">
        <Link
          href="/portal"
          className="site-nav-link"
        >
          Portal
        </Link>
        <Link
          href="/settings"
          className="site-nav-link"
        >
          Settings
        </Link>
        <Link
          href="/docs"
          className="site-nav-link"
        >
          Documentation
        </Link>
        <Link
          href="/faq"
          className="site-nav-link"
        >
          FAQ
        </Link>
        {isAdmin && (
          <Link href="/admin" className="site-nav-link">
            Admin
          </Link>
        )}
        {isAuthenticated ? (
          <button type="button" onClick={handleLogout} className="site-signout">
            Sign Out
          </button>
        ) : (
          <Link
            href="/login"
            className="site-nav-link"
          >
            Sign In
          </Link>
        )}
      </nav>

      {/* Mobile Menu Trigger */}
      <div className="flex sm:hidden items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="h-8 w-8 p-0 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 bg-background border-b border-line p-4 flex flex-col gap-3 text-sm font-medium sm:hidden z-50">
          <Link
            href="/portal"
            onClick={() => setMobileMenuOpen(false)}
            className="site-nav-link py-1"
          >
            Portal
          </Link>
          <Link
            href="/settings"
            onClick={() => setMobileMenuOpen(false)}
            className="site-nav-link py-1"
          >
            Settings
          </Link>
          <Link
            href="/docs"
            onClick={() => setMobileMenuOpen(false)}
            className="site-nav-link py-1"
          >
            Documentation
          </Link>
          <Link
            href="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="site-nav-link py-1"
          >
            FAQ
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="site-nav-link py-1"
            >
              Admin Dashboard
            </Link>
          )}
          {isAuthenticated ? (
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="site-signout self-start"
          >
            Sign Out
          </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="site-nav-link py-1"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </>
  );
}
