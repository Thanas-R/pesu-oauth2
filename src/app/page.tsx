import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AsciiLockup } from '@/components/ascii-art';
import { DotGridSpotlight } from '@/components/dot-grid-spotlight';
import { GlyphTide } from '@/components/ui/background-ascii-plasma';

const features = [
  { index: '01', title: 'Your password stays yours.', description: 'Third-party apps receive standard RS256 tokens. They never handle your PESU Academy password.' },
  { index: '02', title: 'Encrypted by design.', description: 'Delegated integrations use an isolated AES-256-GCM vault with per-user data keys.' },
  { index: '03', title: 'Built on open standards.', description: 'OIDC and OAuth 2.0 with required S256 PKCE for every authorization flow.' },
];

export default function HomePage() {
  return (
    <div>
      <section className="home-hero" aria-label="PESU identity">
        <h1 className="hero-lockup reveal reveal-1" aria-label="PESU OAuth2">
          <AsciiLockup />
        </h1>
        <p className="home-lede reveal reveal-2">
          An unofficial OpenID Connect provider for PESU accounts. Register your application in the portal, configure a redirect URI, and connect with a standard OIDC library.
        </p>
        <div className="home-hero-row reveal reveal-3">
          <div className="home-links">
            <Link href="/login"><Button size="lg">Sign in <span aria-hidden="true">↗</span></Button></Link>
            <Link href="/portal"><Button variant="outline" size="lg">Developer portal <span aria-hidden="true">→</span></Button></Link>
          </div>
        </div>
      </section>

      <div className="home-plasma reveal reveal-4" aria-hidden="true">
        <GlyphTide cellSize={13} />
      </div>

      <section className="home-split" aria-label="How it works">
        <div className="home-steps">
          <span className="ascii-eyebrow">How it works</span>
          <h2>Built on open standards.</h2>
          {features.map((f) => (
            <div className="home-step" key={f.index}>
              <span className="index">{f.index}</span>
              <div><h3>{f.title}</h3><p>{f.description}</p></div>
            </div>
          ))}
        </div>
        <div className="home-console">
          <DotGridSpotlight />
          <div className="home-console-box">
            <div className="home-console-bar"><span>● DISCOVERY</span><span>GET</span></div>
            <pre>
<span className="dim">$ </span>curl /.well-known/openid-configuration{'\n'}
<span className="dim">{'{'}</span>{'\n'}
{'  '}&quot;response_types_supported&quot;: [&quot;code&quot;],{'\n'}
{'  '}&quot;code_challenge_methods&quot;: [&quot;S256&quot;],{'\n'}
{'  '}&quot;id_token_signing_alg&quot;: [&quot;RS256&quot;]{'\n'}
<span className="dim">{'}'}</span>{'\n'}
<span className="dim">$ </span><span className="cursor" />
            </pre>
          </div>
        </div>
      </section>

      <nav className="home-more" aria-label="More information">
        <span className="ascii-eyebrow">Keep exploring</span>
        <div>
          <Link href="/docs">Documentation <span aria-hidden="true">→</span></Link>
          <Link href="/faq">FAQ <span aria-hidden="true">→</span></Link>
        </div>
      </nav>
    </div>
  );
}
