export const TAGLINE = 'Engineered to Perform. Designed to Inspire.';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon';
  size?: number;
  className?: string;
}

/**
 * Brand logo — single full-lockup image ("AiSoft Tech Olution").
 * `size` controls the rendered height in px; width scales automatically.
 */
export function Logo({ variant = 'compact', size = 40, className }: LogoProps) {
  // The lockup sits inside a square canvas, so display it a bit taller
  // than the old constructed mark to keep visual weight similar.
  const height = variant === 'full' ? size * 1.9 : size * 1.6;

  return (
    <img
      src="/logo-full.png"
      alt="AiSoft Tech Olution"
      style={{ height, width: 'auto' }}
      className={`object-contain select-none ${className ?? ''}`}
      draggable={false}
    />
  );
}

export function LogoMark({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <img
      src="/logo-full.png"
      alt="AiSoft Tech Olution"
      style={{ height: size, width: 'auto' }}
      className={`object-contain select-none ${className ?? ''}`}
      draggable={false}
    />
  );
}
