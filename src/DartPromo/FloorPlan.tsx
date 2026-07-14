import { interpolate, useCurrentFrame } from "remotion";

// Stylized line-art floor plan (code-drawn, not a photo) for the hook.
const PATH =
  "M 60 40 H 340 V 180 H 460 V 40 H 740 V 340 H 560 V 460 H 740 V 620 H 60 V 340 H 220 V 460 H 60 Z";

const DOOR_PATHS = [
  "M 340 40 A 40 40 0 0 1 380 80",
  "M 460 340 A 40 40 0 0 1 500 380",
  "M 220 340 A 40 40 0 0 0 180 380",
];

export const FloorPlan: React.FC = () => {
  const frame = useCurrentFrame();

  const draw = interpolate(frame, [0, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const doorsOpacity = interpolate(frame, [55, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelOpacity = interpolate(frame, [70, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      viewBox="0 0 800 660"
      width="100%"
      height="100%"
      style={{ maxWidth: 640, maxHeight: 520 }}
    >
      <path
        d={PATH}
        fill="none"
        stroke="#3d2b1f"
        strokeWidth={6}
        strokeLinejoin="round"
        strokeDasharray={2600}
        strokeDashoffset={2600 * (1 - draw)}
      />
      <g opacity={doorsOpacity} stroke="#3d2b1f" strokeWidth={4} fill="none">
        {DOOR_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g
        opacity={labelOpacity}
        fill="#8a6a3f"
        fontFamily="Georgia, serif"
        fontSize={22}
        letterSpacing={2}
      >
        <text x="150" y="120">
          SÉJOUR
        </text>
        <text x="540" y="120">
          CUISINE
        </text>
        <text x="130" y="420">
          CHAMBRE
        </text>
        <text x="580" y="480">
          BUREAU
        </text>
      </g>
    </svg>
  );
};
