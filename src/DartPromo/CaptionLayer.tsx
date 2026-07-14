import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { captions } from "./captions";

const CaptionCard: React.FC<{ text: string; variant?: "caption" | "title" | "cta" }> = ({
  text,
  variant = "caption",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const fadeOut = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(enter, fadeOut);
  const translateY = interpolate(enter, [0, 1], [16, 0]);

  const isTitle = variant === "title";
  const isCta = variant === "cta";

  return (
    <AbsoluteFill
      style={{
        justifyContent: isTitle ? "center" : "flex-end",
        alignItems: "center",
        padding: isTitle ? 80 : "0 64px 220px 64px",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 700,
          fontSize: isTitle ? 76 : isCta ? 64 : 48,
          lineHeight: 1.25,
          color: "#ffffff",
          textAlign: "center",
          whiteSpace: "pre-line",
          textShadow: "0 2px 18px rgba(0,0,0,0.65)",
          letterSpacing: isTitle ? 1 : 0,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const CaptionLayer: React.FC = () => {
  return (
    <>
      {captions.map((c) => (
        <Sequence key={c.from} from={c.from} durationInFrames={c.durationInFrames} layout="none">
          <CaptionCard text={c.text} variant={c.variant} />
        </Sequence>
      ))}
    </>
  );
};
