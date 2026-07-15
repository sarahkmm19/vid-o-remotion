export type Caption = {
  from: number;
  durationInFrames: number;
  lead?: string;
  highlight: string;
  trail?: string;
  variant?: "caption" | "title" | "cta";
};

// All timings in frames at 30fps, matching the approved script's second marks.
// lead/trail = small supporting lines, highlight = the emphasized keyword (big, on a color chip).
export const captions: Caption[] = [
  // [0-4s] HOOK — positive, valorizing tone
  { from: 0, durationInFrames: 60, lead: "Un espace", highlight: "bien pensé," },
  { from: 60, durationInFrames: 60, lead: "ça se ressent dans votre", highlight: "énergie," },

  // [4-16s]
  { from: 120, durationInFrames: 60, lead: "Depuis", highlight: "2020", trail: "dans la décoration," },
  { from: 180, durationInFrames: 60, highlight: "Une conviction", trail: "nous anime :" },
  { from: 240, durationInFrames: 60, lead: "Chaque projet mérite", highlight: "vos besoins réels," },
  { from: 300, durationInFrames: 60, lead: "Toujours", highlight: "réactif,", trail: "à chaque étape" },
  { from: 360, durationInFrames: 60, lead: "Avec la", highlight: "créativité", trail: "qui vous ressemble" },
  { from: 420, durationInFrames: 60, lead: "Voilà ce que", highlight: "D.Art", trail: "offre à chaque projet" },

  // [16-30s] LA DIFFÉRENCE D.ART
  { from: 480, durationInFrames: 60, highlight: "LA DIFFÉRENCE D.ART", variant: "title" },
  { from: 540, durationInFrames: 60, lead: "Ce qui", highlight: "distingue", trail: "D.Art" },
  { from: 600, durationInFrames: 60, highlight: "Une exigence", trail: "créative" },
  { from: 660, durationInFrames: 60, lead: "Portée par une vraie", highlight: "stratégie", trail: "de visibilité" },
  { from: 720, durationInFrames: 60, lead: "Chaque réalisation", highlight: "pensée", trail: "pour être vue" },
  { from: 780, durationInFrames: 60, highlight: "D'elle-même," },

  // [30-40s]
  { from: 840, durationInFrames: 90, lead: "D.Art vous", highlight: "accompagne", trail: "étape par étape" },
  { from: 930, durationInFrames: 90, lead: "De la première", highlight: "idée" },
  { from: 1020, durationInFrames: 90, lead: "À la dernière", highlight: "finition," },
  { from: 1110, durationInFrames: 90, lead: "Pour un", highlight: "résultat", trail: "qui vous ressemble" },

  // [40-44s] CTA
  { from: 1200, durationInFrames: 60, lead: "Découvrez", highlight: "D.Art," },
  { from: 1260, durationInFrames: 60, highlight: "Suivez-nous 🌹", variant: "cta" },
];

export const TOTAL_DURATION = 1320;
