import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { captions } from "./captions";
import { dartFontFamily } from "./font";

const INK = "#472023";
const CARD_BG = "#F4E8DC";

const CaptionCard: React.FC<{ text: string; variant?: "caption" | "title" | "cta" }> = ({
  text,
  variant = "caption",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Entrance: spring scale + rise, combined with a left-to-right wipe reveal.
  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.6 } });
  const wipe = interpolate(frame, [0, 16], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit: fade + soft blur + gentle scale-up dissolve.
  const exitStart = durationInFrames - 14;
  const exitProgress = interpolate(frame, [exitStart, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(enter, [0, 1], [0, 1]) * (1 - exitProgress);
  const translateY = interpolate(enter, [0, 1], [26, 0]);
  const scale = interpolate(enter, [0, 1], [0.92, 1]) + exitProgress * 0.05;
  const blur = exitProgress * 6;

  const isTitle = variant === "title";
  const isCta = variant === "cta";

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 72px",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          filter: `blur(${blur}px)`,
          clipPath: `inset(0 ${100 - wipe}% 0 0)`,
          backgroundColor: CARD_BG,
          borderRadius: 20,
          padding: isTitle ? "28px 48px" : "22px 40px",
          boxShadow: "0 18px 40px rgba(42,17,20,0.28)",
        }}
      >
        <div
          style={{
            fontFamily: dartFontFamily,
            fontWeight: isTitle ? 800 : isCta ? 700 : 600,
            fontSize: isTitle ? 72 : isCta ? 62 : 46,
            lineHeight: 1.25,
            color: INK,
            textAlign: "center",
            whiteSpace: "pre-line",
            letterSpacing: isTitle ? 1.5 : 0.2,
          }}
        >
          {text}
        </div>
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
