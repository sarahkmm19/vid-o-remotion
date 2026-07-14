import { interpolate, useCurrentFrame } from "remotion";

const BG = "#B49894";
const INK = "#2A1114";

// Outer + interior walls as one continuous-enough path set, revealed via a
// normalized pathLength so the dash trick works regardless of geometry.
const WALLS = [
  "M 40 40 H 760 V 760 H 40 Z", // outer shell
  "M 400 40 V 380", // top vertical split (salon / séjour)
  "M 40 380 H 760", // horizontal split (top rooms / bottom rooms)
  "M 400 420 V 760", // bottom vertical split (escalier+salon / cuisine+sdb)
  "M 560 420 V 620", // kitchen / bathroom split
  "M 40 620 H 260", // small nook wall, bottom-left
];

const DOOR_ARCS = [
  "M 320 380 A 60 60 0 0 1 260 440", // salon <-> séjour opening area (near split)
  "M 400 470 A 50 50 0 0 0 450 420", // escalier <-> cuisine
  "M 560 500 A 40 40 0 0 1 520 540", // kitchen <-> bathroom
  "M 360 760 A 60 60 0 0 0 420 700", // entrance door, bottom center
  "M 420 760 A 60 60 0 0 1 480 700",
];

const Sofa: React.FC<{ x: number; y: number; w: number; h: number; rotate?: number }> = ({
  x,
  y,
  w,
  h,
  rotate = 0,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`} stroke={INK} strokeWidth={3} fill="none">
    <rect x={0} y={0} width={w} height={h} rx={10} />
    <rect x={6} y={6} width={w - 12} height={h * 0.4} rx={6} />
  </g>
);

const Armchair: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 26 }) => (
  <g transform={`translate(${x} ${y})`} stroke={INK} strokeWidth={3} fill="none">
    <circle r={r} />
    <circle r={r * 0.55} />
  </g>
);

const DiningSet: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <g transform={`translate(${x} ${y})`} stroke={INK} strokeWidth={3} fill="none">
    <rect x={0} y={0} width={w} height={h} rx={6} />
    {Array.from({ length: 3 }).map((_, i) => (
      <rect key={`t${i}`} x={-22} y={(i * h) / 2.2} width={16} height={h / 3.6} rx={4} />
    ))}
    {Array.from({ length: 3 }).map((_, i) => (
      <rect key={`b${i}`} x={w + 6} y={(i * h) / 2.2} width={16} height={h / 3.6} rx={4} />
    ))}
  </g>
);

const Stairs: React.FC<{ x: number; y: number; w: number; steps: number }> = ({ x, y, w, steps }) => (
  <g transform={`translate(${x} ${y})`} stroke={INK} strokeWidth={2.5} fill="none">
    {Array.from({ length: steps }).map((_, i) => (
      <line key={i} x1={0} y1={(i * 120) / steps} x2={w} y2={(i * 120) / steps} />
    ))}
    <path d={`M ${w * 0.3} 100 L ${w * 0.5} 118 L ${w * 0.7} 100`} />
  </g>
);

const KitchenCounter: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <g transform={`translate(${x} ${y})`} stroke={INK} strokeWidth={3} fill="none">
    <rect x={0} y={0} width={w} height={h} rx={4} />
    <circle cx={w * 0.25} cy={h / 2} r={h * 0.28} />
    <circle cx={w * 0.55} cy={h / 2} r={h * 0.22} />
    <circle cx={w * 0.8} cy={h / 2} r={h * 0.22} />
  </g>
);

const Bathroom: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} stroke={INK} strokeWidth={2.5} fill="none">
    <ellipse cx={0} cy={0} rx={16} ry={22} />
    <rect x={-14} y={26} width={28} height={30} rx={6} />
  </g>
);

const Plant: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} stroke={INK} strokeWidth={2} fill="none">
    <path d="M 0 0 L -14 -22 M 0 0 L 0 -26 M 0 0 L 14 -22" />
  </g>
);

export const FloorPlan: React.FC = () => {
  const frame = useCurrentFrame();

  const draw = interpolate(frame, [0, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const doors = interpolate(frame, [65, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const furniture = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const furnitureY = interpolate(furniture, [0, 1], [10, 0]);
  const labels = interpolate(frame, [90, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg viewBox="0 0 800 800" width="100%" height="100%" style={{ maxWidth: 640, maxHeight: 640 }}>
      <rect x="0" y="0" width="800" height="800" fill={BG} />

      {WALLS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={INK}
          strokeWidth={7}
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
      ))}

      <g opacity={doors} stroke={INK} strokeWidth={2.5} fill="none">
        {DOOR_ARCS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      <g opacity={furniture} transform={`translate(0, ${furnitureY})`}>
        {/* SALON — top left */}
        <Sofa x={70} y={70} w={90} h={180} rotate={0} />
        <Armchair x={230} y={140} />
        <Armchair x={230} y={210} />
        <circle cx={200} cy={175} r={14} stroke={INK} strokeWidth={3} fill="none" />
        <Plant x={110} y={330} />

        {/* SÉJOUR — top right */}
        <DiningSet x={470} y={90} w={170} h={130} />
        <Armchair x={720} y={330} r={22} />
        <rect x={710} y={60} width={30} height={200} rx={4} stroke={INK} strokeWidth={3} fill="none" />

        {/* ESCALIER + coin salon — bottom left */}
        <Stairs x={90} y={420} w={140} steps={8} />
        <Sofa x={60} y={630} w={220} h={70} rotate={0} />
        <Armchair x={310} y={470} r={20} />
        <Armchair x={310} y={520} r={20} />

        {/* CUISINE + SDB — bottom right */}
        <KitchenCounter x={430} y={710} w={190} h={40} />
        <Bathroom x={650} y={470} />
      </g>

      <g opacity={labels} fill={INK} fontFamily="Georgia, serif" fontSize={20} letterSpacing={2}>
        <text x="70" y="360">
          SALON
        </text>
        <text x="470" y="360">
          SÉJOUR
        </text>
        <text x="70" y="740">
          ESCALIER
        </text>
        <text x="430" y="700">
          CUISINE
        </text>
      </g>
    </svg>
  );
};
