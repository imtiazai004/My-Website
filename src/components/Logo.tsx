export const TAGLINE = 'Engineered to Perform. Designed to Inspire.';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon';
  size?: number;
  className?: string;
}

/**
 * Brand logo lockup: "AI" + the shared 3D "S" + the words that start from
 * that S — "oft Tech" (top) and "olution" (bottom) → Soft Tech / Solution.
 * Wordmark color adapts: dark on light backgrounds, white on dark (variant="full").
 */
export function Logo({ variant = 'compact', size = 40, className }: LogoProps) {
  if (variant === 'icon') {
    return (
      <img
        src="/logo-s.png"
        alt="Soft Tech Solution"
        style={{ height: size, width: 'auto' }}
        className={`object-contain select-none ${className ?? ''}`}
        draggable={false}
      />
    );
  }

  const onDark = variant === 'full';
  const sHeight = onDark ? size * 1.55 : size * 1.25;   // big shared S
  const wordSize = onDark ? size * 0.6 : size * 0.5;    // each word line
  const aiSize = onDark ? size * 0.55 : size * 0.46;    // "AI" prefix
  const wordColor = onDark ? '#ffffff' : '#0f172a';

  return (
    <div className={`flex items-center select-none ${className ?? ''}`} style={{ gap: size * 0.12 }}>
      {/* AI prefix */}
      <span
        style={{
          fontSize: aiSize,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#6366f1',
          lineHeight: 1,
        }}
      >
        AI
      </span>

      {/* Shared 3D S */}
      <img
        src="/logo-s.png"
        alt="Soft Tech Solution"
        style={{ height: sHeight, width: 'auto' }}
        className="object-contain shrink-0"
        draggable={false}
      />

      {/* Words that start from the S */}
      <div className="flex flex-col justify-center" style={{ lineHeight: 0.96, marginLeft: -(size * 0.08) }}>
        <span style={{ fontSize: wordSize, fontWeight: 700, letterSpacing: '-0.02em', color: wordColor }}>
          oft <span style={{ color: '#6366f1' }}>Tech</span>
        </span>
        <span style={{ fontSize: wordSize, fontWeight: 700, letterSpacing: '-0.02em', color: wordColor }}>
          olution
        </span>
      </div>
    </div>
  );
}

export function LogoMark({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <img
      src="/logo-s.png"
      alt="Soft Tech Solution"
      style={{ height: size, width: 'auto' }}
      className={`object-contain select-none ${className ?? ''}`}
      draggable={false}
    />
  );
}
