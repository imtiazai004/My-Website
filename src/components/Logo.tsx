export const TAGLINE = 'Engineered to Perform. Designed to Inspire.';

const FACES: { letter: string; type: 'S' | 'T' | 'AI' | 'dot' }[] = [
  { letter: 'S',  type: 'S'  },
  { letter: 'S',  type: 'S'  },
  { letter: 'T',  type: 'T'  },
  { letter: 'S',  type: 'S'  },
  { letter: 'AI', type: 'AI' },
  { letter: '·',  type: 'dot'},
];

function faceTransform(index: number, half: number): string {
  switch (index) {
    case 0: return `translateZ(${half}px)`;
    case 1: return `rotateY(180deg) translateZ(${half}px)`;
    case 2: return `rotateY(90deg) translateZ(${half}px)`;
    case 3: return `rotateY(-90deg) translateZ(${half}px)`;
    case 4: return `rotateX(90deg) translateZ(${half}px)`;
    default: return `rotateX(-90deg) translateZ(${half}px)`;
  }
}

function letterStyle(type: 'S' | 'T' | 'AI' | 'dot', size: number): React.CSSProperties {
  const base: React.CSSProperties = {
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 800,
    lineHeight: 1,
    fontSize: type === 'AI' ? size * 0.2 : size * 0.38,
  };

  if (type === 'S' || type === 'dot') {
    return { ...base, color: 'rgba(255,255,255,0.92)', WebkitTextFillColor: 'rgba(255,255,255,0.92)' };
  }
  if (type === 'T') {
    return {
      ...base,
      background: 'linear-gradient(135deg, #00E5FF, #3B82F6, #8B5CF6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    };
  }
  // AI face
  return {
    ...base,
    background: 'linear-gradient(135deg, #00E5FF, #A78BFA)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
}

function Cube({ size = 40 }: { size?: number }) {
  const half = size / 2;

  return (
    <div style={{ perspective: size * 6, width: size, height: size, flexShrink: 0 }}>
      <div className="sts-cube-spin" style={{ width: size, height: size }}>
        {FACES.map((face, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0, 229, 255, 0.18)',
              background: 'rgba(0, 229, 255, 0.02)',
              transform: faceTransform(i, half),
            }}
          >
            <span style={letterStyle(face.type, size)}>{face.letter}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon';
  size?: number;
  className?: string;
}

const sharedFont = (size: number): React.CSSProperties => ({
  fontFamily: "'Orbitron', sans-serif",
  fontWeight: 800,
  fontSize: Math.max(13, size * 0.36),
  letterSpacing: '0.1em',
  lineHeight: 1,
  whiteSpace: 'nowrap' as const,
});

export function Logo({ variant = 'compact', size = 40, className }: LogoProps) {
  if (variant === 'icon') {
    return (
      <div className={className}>
        <Cube size={size} />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className ?? ''}`}>
      <Cube size={size} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

        {/* SOFT (white) + TECH (gradient) */}
        <span style={{ ...sharedFont(size), display: 'block' }}>
          <span style={{ color: 'rgba(255,255,255,0.95)', WebkitTextFillColor: 'rgba(255,255,255,0.95)' }}>
            SOFT{' '}
          </span>
          <span
            style={{
              background: 'linear-gradient(90deg, #00E5FF, #3B82F6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            TECH
          </span>
        </span>

        {/* SOLUTION — light-sweep animation */}
        <span
          className="sts-solution-animate"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 500,
            fontSize: Math.max(7, size * 0.18),
            letterSpacing: '0.45em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            display: 'block',
          }}
        >
          SOLUTION
        </span>

        {variant === 'full' && (
          <span
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: Math.max(7, size * 0.16),
              color: 'rgba(255,255,255,0.28)',
              letterSpacing: '0.2em',
              whiteSpace: 'nowrap',
              marginTop: 2,
            }}
          >
            INNOVATE · DEVELOP · TRANSFORM
          </span>
        )}
      </div>
    </div>
  );
}

export function LogoMark({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <div className={className}>
      <Cube size={size} />
    </div>
  );
}
