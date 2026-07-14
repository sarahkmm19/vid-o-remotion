import { interpolate, useCurrentFrame } from "remotion";

// Stylized illustration inspired by the reference photo (warm beige living
// room: round mirror, wood console, bouclé sofa, rug) — code-drawn, not a
// photo. Reveal animation mirrors the floor plan's layered timing.
export const RoomScene: React.FC = () => {
  const frame = useCurrentFrame();

  const base = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const baseY = interpolate(base, [0, 1], [24, 0]);

  const furniture = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const furnitureY = interpolate(furniture, [0, 1], [30, 0]);

  const details = interpolate(frame, [55, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const detailsScale = interpolate(details, [0, 1], [0.9, 1]);

  const glow = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      viewBox="0 0 800 900"
      width="100%"
      height="100%"
      style={{ maxWidth: 720, maxHeight: 820 }}
    >
      {/* base: walls, floor, rug */}
      <g opacity={base} transform={`translate(0, ${baseY})`}>
        <rect x="0" y="0" width="800" height="620" fill="#ede2cf" />
        <rect x="0" y="620" width="800" height="280" fill="#c99b68" />
        <rect x="0" y="620" width="800" height="280" fill="#c99b68" />
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={i}
            x1={i * 60}
            y1={620}
            x2={i * 60 - 40}
            y2={900}
            stroke="#b6885a"
            strokeWidth={2}
          />
        ))}
        <ellipse cx="400" cy="790" rx="330" ry="105" fill="#e3d4b8" opacity={0.92} />
        {/* window glow, right side */}
        <rect x="600" y="60" width="160" height="260" rx="6" fill="#f7ecd8" opacity={0.6 + glow * 0.4} />
        <rect x="600" y="60" width="160" height="260" rx="6" fill="none" stroke="#d8c39a" strokeWidth={5} />
      </g>

      {/* furniture: console, sofa, tables */}
      <g opacity={furniture} transform={`translate(0, ${furnitureY})`}>
        {/* console */}
        <rect x="140" y="360" width="520" height="90" rx="6" fill="#8a5a34" />
        <rect x="140" y="360" width="520" height="14" rx="4" fill="#a3703f" />

        {/* fluted side table */}
        <rect x="40" y="560" width="110" height="200" rx="4" fill="#7a4d2b" />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x={48 + i * 13} y={560} width="4" height="200" fill="#69411f" />
        ))}

        {/* sofa */}
        <rect x="60" y="650" width="560" height="150" rx="46" fill="#e9ddc6" />
        <rect x="90" y="600" width="180" height="110" rx="40" fill="#ecdfca" />
        <rect x="280" y="630" width="130" height="80" rx="32" fill="#e4d6bd" />
        <rect x="280" y="700" width="230" height="60" rx="20" fill="#cbb98f" opacity={0.85} />

        {/* round coffee table */}
        <ellipse cx="600" cy="770" rx="90" ry="26" fill="#8a5a34" />
        <rect x="560" y="748" width="80" height="24" rx="10" fill="#a3703f" />
      </g>

      {/* details: mirror, art, vases */}
      <g opacity={details} style={{ transformOrigin: "400px 260px", transform: `scale(${detailsScale})` }}>
        <circle cx="330" cy="230" r="95" fill="#dcd0ba" stroke="#2b2b2b" strokeWidth={10} />
        <circle cx="330" cy="230" r="80" fill="#f4ede0" opacity={0.5} />

        <rect x="470" y="150" width="110" height="150" rx="4" fill="#f6efe1" stroke="#8a5a34" strokeWidth={6} />
        <path d="M 490 270 L 520 190 L 550 270 Z" fill="#c99b68" opacity={0.7} />

        <rect x="600" y="160" width="90" height="130" rx="4" fill="#f6efe1" stroke="#8a5a34" strokeWidth={6} />
        <circle cx="645" cy="225" r="26" fill="#3d2b1f" opacity={0.75} />

        <ellipse cx="200" cy="600" rx="18" ry="24" fill="#a3703f" />
        <ellipse cx="480" cy="345" rx="14" ry="18" fill="#a3703f" />
      </g>
    </svg>
  );
};
