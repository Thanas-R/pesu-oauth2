const pesu = [
  '██████╗░███████╗░██████╗██╗░░░██╗',
  '██╔══██╗██╔════╝██╔════╝██║░░░██║',
  '██████╔╝█████╗░░╚█████╗░██║░░░██║',
  '██╔═══╝░██╔══╝░░░╚═══██╗██║░░░██║',
  '██║░░░░░███████╗██████╔╝╚██████╔╝',
  '╚═╝░░░░░╚══════╝╚═════╝░░╚═════╝░',
].join('\n');

function wave(rows: number, columns: number) {
  const glyphs = ['·', ':', '▒'];
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: columns }, (_, col) => {
      const crest = Math.sin(col * 0.11 + row * 0.36) * 1.9 + Math.sin(col * 0.031 - row * 0.42) * 1.5;
      const distance = Math.abs(row - rows / 2 - crest);
      if (distance > 2.6) return ' ';
      const index = Math.max(0, Math.min(glyphs.length - 1, Math.floor((2.6 - distance) * 1.3)));
      return glyphs[index];
    }).join(''),
  ).join('\n');
}

const waveField = wave(14, 180);

export function AsciiLogo({ compact = false }: { compact?: boolean }) {
  return <pre className={`ascii-logo${compact ? ' ascii-logo-compact' : ''}`} aria-hidden="true">{pesu}</pre>;
}

/**
 * The brand lockup: block-letter PESU with a serif "OAuth2" set beside it,
 * aligned on a shared baseline.
 */
export function AsciiLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`ascii-lockup${compact ? ' ascii-lockup-compact' : ''}`}>
      <AsciiLogo />
      <span className="ascii-lockup-word">OAuth2</span>
    </span>
  );
}

export function AsciiWave({ className = '' }: { className?: string }) {
  return <div className={`ascii-wave ${className}`} aria-hidden="true"><pre>{waveField}</pre></div>;
}
