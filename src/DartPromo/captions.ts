export type Caption = {
  from: number;
  durationInFrames: number;
  text: string;
  variant?: "caption" | "title" | "cta";
};

// All timings in frames at 30fps, matching the approved script's second marks.
export const captions: Caption[] = [
  // [0-4s] HOOK — reformulated to a positive, valorizing tone
  { from: 0, durationInFrames: 60, text: "Un espace bien pensé,\nça se ressent —" },
  { from: 60, durationInFrames: 60, text: "dans votre humeur, votre énergie,\nvotre quotidien." },

  // [4-16s]
  { from: 120, durationInFrames: 60, text: "Depuis 2020 dans le secteur\nde la décoration," },
  { from: 180, durationInFrames: 60, text: "une conviction nous anime :" },
  { from: 240, durationInFrames: 60, text: "chaque projet mérite quelqu'un\nqui comprend vos besoins réels," },
  { from: 300, durationInFrames: 60, text: "qui reste réactif à chaque étape,\net s'adapte aux nouvelles tendances," },
  { from: 360, durationInFrames: 60, text: "avec la créativité\nqui vous ressemble vraiment." },
  { from: 420, durationInFrames: 60, text: "Voilà ce que D.Art offre\nà chaque projet." },

  // [16-30s] LA DIFFÉRENCE D.ART
  { from: 480, durationInFrames: 60, text: "LA DIFFÉRENCE D.ART", variant: "title" },
  { from: 540, durationInFrames: 60, text: "Ce qui distingue D.Art :" },
  { from: 600, durationInFrames: 60, text: "une exigence créative" },
  { from: 660, durationInFrames: 60, text: "portée par une vraie\nstratégie de visibilité." },
  { from: 720, durationInFrames: 60, text: "Chaque réalisation est pensée\npour être vue —" },
  { from: 780, durationInFrames: 60, text: "et pour parler d'elle-même." },

  // [30-40s]
  { from: 840, durationInFrames: 90, text: "D.Art vous accompagne\nétape par étape," },
  { from: 930, durationInFrames: 90, text: "de la première idée" },
  { from: 1020, durationInFrames: 90, text: "à la dernière finition," },
  { from: 1110, durationInFrames: 90, text: "pour un résultat\nqui vous ressemble vraiment." },

  // [40-44s] CTA
  { from: 1200, durationInFrames: 60, text: "Découvrez D.Art,\npour vos projets d'espaces." },
  { from: 1260, durationInFrames: 60, text: "Suivez-nous 🌹", variant: "cta" },
];

export const TOTAL_DURATION = 1320;
