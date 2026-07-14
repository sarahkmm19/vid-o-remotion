import { AbsoluteFill, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { CaptionLayer } from "./CaptionLayer";
import { FloorPlan } from "./FloorPlan";

const HOOK_DURATION = 120;

const clips = [
  { src: "IMG_4930.mp4", originalDuration: 6.065 },
  { src: "IMG_4963.mp4", originalDuration: 5.003 },
  { src: "IMG_4974.mp4", originalDuration: 9.325 },
  { src: "IMG_5017.mp4", originalDuration: 4.605 },
  { src: "IMG_5039.mp4", originalDuration: 10.577 },
];

const BROLL_DURATION = 1200; // 40s at 30fps
const totalRaw = clips.reduce((sum, c) => sum + c.originalDuration, 0);
const speed = totalRaw / (BROLL_DURATION / 30); // uniform slow-down to stretch footage to exactly 40s

let cursor = 0;
const clipSlots = clips.map((c) => {
  const durationInFrames = Math.round((c.originalDuration / speed) * 30);
  const slot = { ...c, from: cursor, durationInFrames, playbackRate: speed };
  cursor += durationInFrames;
  return slot;
});

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.25) 100%)",
    }}
  />
);

const Wordmark: React.FC = () => (
  <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "flex-start", padding: 48 }}>
    <div
      style={{
        fontFamily: "Georgia, serif",
        fontSize: 34,
        fontWeight: 700,
        color: "#ffffff",
        textShadow: "0 2px 10px rgba(0,0,0,0.6)",
        letterSpacing: 2,
      }}
    >
      D.ART
    </div>
  </AbsoluteFill>
);

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#B49894", opacity: bgOpacity }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 260 }}>
        <FloorPlan />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const DartPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence from={0} durationInFrames={HOOK_DURATION} layout="none">
        <Hook />
      </Sequence>

      <Sequence from={HOOK_DURATION} layout="none">
        <AbsoluteFill>
          {clipSlots.map((clip) => (
            <Sequence key={clip.src} from={clip.from} durationInFrames={clip.durationInFrames} layout="none">
              <OffthreadVideo
                src={staticFile(`videos/dart-promo/${clip.src}`)}
                playbackRate={clip.playbackRate}
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Sequence>
          ))}
          <Vignette />
          <Wordmark />
        </AbsoluteFill>
      </Sequence>

      <CaptionLayer />
    </AbsoluteFill>
  );
};
