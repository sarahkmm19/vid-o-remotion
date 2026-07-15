import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Matches the display serif used in the D.Art logo (high-contrast, Didot-style).
export const dartFontFamily = "Bodoni Moda";

loadFont({
  family: dartFontFamily,
  url: staticFile("fonts/BodoniModa-700.woff2"),
  weight: "400 900",
  style: "normal",
});
