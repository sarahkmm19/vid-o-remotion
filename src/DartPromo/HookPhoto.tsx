import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

// Same layered reveal timing as the earlier illustration: base fade/rise (0-40),
// emphasis zoom (30-60), warm detail vignette (55-85), window glow (70-100).
export const HookPhoto: React.FC = () => {
  const frame = useCurrentFrame();

  const base = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const baseY = interpolate(base, [0, 1], [24, 0]);

  const kenBurns = interpolate(frame, [0, 120], [1, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const details = interpolate(frame, [55, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glow = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: base,
        transform: `translateY(${baseY}px)`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "86%",
          aspectRatio: "431 / 641",
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(61,43,31,0.35)",
        }}
      >
        <Img
          src={staticFile("images/dart-promo/hook-room.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${kenBurns})`,
          }}
        />
        <AbsoluteFill
          style={{
            background: "linear-gradient(160deg, rgba(61,43,31,0) 55%, rgba(61,43,31,0.35) 100%)",
            opacity: details,
          }}
        />
        <AbsoluteFill
          style={{
            background: "radial-gradient(circle at 78% 25%, rgba(255,247,225,0.55) 0%, transparent 45%)",
            opacity: glow,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
