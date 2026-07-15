import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { captions } from "./captions";
import { dartFontFamily } from "./font";

const INK = "#472023";
const CHIP_BG = "#B49894";

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
        fontWeight: 600,
        fontSize: 40,
        color: "#FBF3EA",
        textShadow: "0 3px 14px rgba(0,0,0,0.55)",
        letterSpacing: 0.3,
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
        transformOrigin: "left center",
        display: "inline-block",
        backgroundColor: CHIP_BG,
        borderRadius: 14,
        padding: "10px 26px",
        boxShadow: "0 14px 30px rgba(42,17,20,0.35)",
      }}
    >
      <span
        style={{
          fontFamily: dartFontFamily,
          fontWeight: 800,
          fontSize,
          lineHeight: 1.05,
          color: INK,
          whiteSpace: "pre-line",
        }}
      >
        {text}
      </span>
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
  const centered = isTitle || isCta;
  const highlightSize = isTitle ? 68 : isCta ? 76 : 88;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: centered ? "center" : "flex-start",
        padding: centered ? "0 80px" : "0 0 0 72px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: centered ? "center" : "flex-start" }}>
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
