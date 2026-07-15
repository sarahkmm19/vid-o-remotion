import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { captions } from "./captions";
import { dartFontFamily } from "./font";

const INK = "#472023";

// Auto-shrink long phrases so they still fit within the frame width.
const fitFontSize = (text: string, base: number) => {
  const overflow = Math.max(0, text.length - 9);
  return Math.max(base - overflow * 4.5, base * 0.45);
};

const GLOW = "0 0 30px rgba(251,243,234,0.9), 0 0 70px rgba(251,243,234,0.5), 0 6px 18px rgba(42,17,20,0.35)";

const SmallLine: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  const enter = spring({ frame: local, fps, config: { damping: 200 } });
  const exitProgress = interpolate(frame, [durationInFrames - 12, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = enter * (1 - exitProgress);
  const translateY = interpolate(enter, [0, 1], [18, 0]) + exitProgress * -14;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        fontFamily: dartFontFamily,
        fontWeight: 700,
        fontSize: fitFontSize(text, 62),
        color: INK,
        textShadow: GLOW,
        letterSpacing: 0.3,
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
};

const HighlightLine: React.FC<{ text: string; delay: number; fontSize: number }> = ({ text, delay, fontSize }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  // Punchier pop-in than the small lines: overshoot spring for a "beat" feel.
  const enter = spring({ frame: local, fps, config: { damping: 12, mass: 0.5, stiffness: 180 } });
  const exitProgress = interpolate(frame, [durationInFrames - 12, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(enter, 1) * (1 - exitProgress);
  const scale = interpolate(enter, [0, 1], [0.55, 1]) - exitProgress * 0.08;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "center",
        fontFamily: dartFontFamily,
        fontWeight: 800,
        fontSize: fitFontSize(text, fontSize),
        lineHeight: 1.05,
        color: INK,
        textShadow: GLOW,
        whiteSpace: "pre-line",
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
};

const CaptionCard: React.FC<{ lead?: string; highlight: string; trail?: string; variant?: "caption" | "title" | "cta" }> = ({
  lead,
  highlight,
  trail,
  variant = "caption",
}) => {
  const isTitle = variant === "title";
  const isCta = variant === "cta";
  const highlightSize = isTitle ? 96 : isCta ? 130 : 150;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 64px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
        {lead ? <SmallLine text={lead} delay={0} /> : null}
        <HighlightLine text={highlight} delay={lead ? 6 : 0} fontSize={highlightSize} />
        {trail ? <SmallLine text={trail} delay={lead ? 14 : 8} /> : null}
      </div>
    </AbsoluteFill>
  );
};

export const CaptionLayer: React.FC = () => {
  return (
    <>
      {captions.map((c) => (
        <Sequence key={c.from} from={c.from} durationInFrames={c.durationInFrames} layout="none">
          <CaptionCard lead={c.lead} highlight={c.highlight} trail={c.trail} variant={c.variant} />
        </Sequence>
      ))}
    </>
  );
};
