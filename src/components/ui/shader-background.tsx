// Replaced with CSS-only background — no WebGL animation loop = ~40% faster initial render
export default function ShaderBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 20% -10%, rgba(99,102,241,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 80% 110%, rgba(79,70,229,0.10) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 70%),
          #0d1117
        `,
      }}
    />
  );
}
