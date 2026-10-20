export const TAGLINE = 'Engineered to Perform. Designed to Inspire.';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon';
  size?: number;
  /** 'light' swaps the dark navy lettering to white, for dark backgrounds. */
  tone?: 'dark' | 'light';
  className?: string;
}

/**
 * Brand logo — the SoftTech Solution lockup (S + T mark, wordmark beside it).
 * `size` sets the rendered height in px; width scales automatically.
 */
export function Logo({ variant = 'compact', size = 40, tone = 'dark', className }: LogoProps) {
  if (variant === 'icon') return <LogoMark size={size} className={className} />;
  const height = variant === 'full' ? size * 1.3 : size * 1.15;

  return (
    <img
      src={tone === 'light' ? '/logo-full-light.png' : '/logo-full.png'}
      alt="SoftTech Solution"
      width={1452}
      height={390}
      style={{ height, width: 'auto' }}
      className={`object-contain select-none ${className ?? ''}`}
      draggable={false}
    />
  );
}

export function LogoMark({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <img
      src="/logo-s.png"
      alt="SoftTech Solution"
      width={312}
      height={373}
      style={{ height: size, width: 'auto' }}
      className={`object-contain select-none ${className ?? ''}`}
      draggable={false}
    />
  );
}
