'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InlineAlert } from '@/components/ui/inline-alert';
import { PageLoader } from '@/components/ui/page-loader';
import { AlertCircle } from 'lucide-react';
import { GlyphTide } from '@/components/ui/background-ascii-plasma';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('return_to') || '/portal';

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/internal/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, returnTo }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push(data.redirectTo || returnTo);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-scene">
      <div className="login-plasma" aria-hidden="true">
        <GlyphTide cellSize={13} />
      </div>
      <div className="login-layout">
        <div className="login-intro reveal">
          <h1>Sign in with <em>PESU OAuth2</em></h1>
        </div>
        <div className="login-form-wrap reveal reveal-2">


        {error ? (
          <InlineAlert
            variant="error"
            message={error}
            icon={<AlertCircle className="w-4 h-4" />}
            className="mb-5 text-xs p-3"
          />
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="PRN or SRN"
            placeholder="e.g. PES1UG20CS001"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            disabled={loading}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Academy Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            disabled={loading}
          />

          <Button
            type="submit"
            className="w-full mt-2"
            size="lg"
            loading={loading}
          >
            Sign in
          </Button>
        </form>

        <p className="login-disclaimer">
          Your credentials are authenticated directly with PESU Academy. In identity mode, your password is never stored on our servers.
        </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={<PageLoader />}>
      <LoginForm />
    </React.Suspense>
  );
}
