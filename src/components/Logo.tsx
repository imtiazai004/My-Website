export const TAGLINE = 'Engineered to Perform. Designed to Inspire.';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon';
  size?: number;
  className?: string;
}

/* Renders the Soft Tech Solution brand logo image (public/logo.png). */
export function Logo({ variant = 'compact', size = 40, className }: LogoProps) {
  // The logo image is square (icon + wordmark stacked). Scale height per variant.
  const height = variant === 'full' ? size * 1.9 : variant === 'icon' ? size : size * 1.5;

  return (
    <img
      src="/logo.png"
      alt="Soft Tech Solution"
      style={{ height, width: 'auto' }}
      className={`object-contain select-none ${className ?? ''}`}
      draggable={false}
    />
  );
}

export function LogoMark({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="Soft Tech Solution"
      style={{ height: size, width: 'auto' }}
      className={`object-contain select-none ${className ?? ''}`}
      draggable={false}
    />
  );
}
