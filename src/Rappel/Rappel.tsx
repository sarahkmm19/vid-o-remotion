import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const lines = [
  { text: "🤍 RAPPEL", from: 0, duration: 75, size: 90 },
  { text: "Le voile est bien plus\nqu'un tissu", from: 60, duration: 120, size: 72 },
  { text: "C'est une expression\nde pudeur, de dignité\net de foi", from: 165, duration: 150, size: 68 },
  {
    text: "Porté par choix,\navec fierté,\npar des millions de femmes\nà travers le monde",
    from: 300,
    duration: 210,
    size: 62,
  },
  { text: "Que le chemin de\nchacune soit facilité 🤍", from: 510, duration: 210, size: 68 },
  { text: "🤍", from: 720, duration: 180, size: 140 },
];

const TextCard: React.FC<{ text: string; size: number }> = ({ text, size }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const opacity = Math.min(enter, fadeOut);
  const translateY = interpolate(enter, [0, 1], [30, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: size,
          lineHeight: 1.4,
          color: "#3d2b1f",
          textAlign: "center",
          whiteSpace: "pre-line",
          fontWeight: 600,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const Rappel: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const glow = interpolate(frame, [0, durationInFrames], [0.15, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #fdf6ec 0%, #f3e3c9 45%, #e8cfa0 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 30%, rgba(212,175,120,${glow}) 0%, transparent 60%)`,
        }}
      />
      {lines.map((line) => (
        <Sequence key={line.text} from={line.from} durationInFrames={line.duration} layout="none">
          <TextCard text={line.text} size={line.size} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
