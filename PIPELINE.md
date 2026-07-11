# Pipeline

Référence commune pour toutes les vidéos de ce dépôt. Mêmes 7 étapes à chaque job, du raw au final.

## Les 7 étapes

1. **Intake** — copier le clip brut dans `projects/<job>/raw/` (si le job part d'un rush filmé ; sauté si le job est une animation générée, ex. `RappelVoile`).
2. **Rough cut** — coupe via transcription, suppression des silences/fillers, script propre. Off-ramp possible vers Premiere Pro. Sauté si pas de rush.
3. **Graphics** — plan des beats, puis construction des graphismes (compositions Remotion dans `src/`). *Change selon le format.*
4. **Second pass** — relecture manuelle, recomposition incrémentale.
5. **Captions** — burn-in, presets par format. *Change selon le format.*
6. **Background music** — optionnel, sidechain duck, renormalisation.
7. **Export** — `scripts/finalize.sh` copie le rendu vers `outputs/<job>.final.mp4`.

## Variantes de format (étapes 3 & 5 seulement)

| | short - explainer | short - tiktok/raw | long-form - youtube |
|---|---|---|---|
| Format | 9:16, 1080x1920 | 9:16, 1080x1920 | 16:9, 1920x1080 |
| Graphics | cartes en haut | hook card → raw | glass + zoom |
| Captions | centrées, fixes | bas, sous le visage | aucune (CC YouTube) |
| Thumbnail | généralement sauté | sauté | toujours |

## Statut actuel dans ce dépôt

- **Engine** : Remotion (compositions dans `src/`, une par job/format).
- **Steps 1-2 (intake/rough-cut sur rush filmé)** : pas encore outillés (pas de WhisperX, pas de toolkit "HyperFrames" vendored ici) — à construire quand un premier job avec rush filmé arrivera.
- **Steps 3-7 (graphics → export)** : fonctionnels pour les jobs animés via Remotion + `scripts/finalize.sh`.
- Chaque job vit dans `projects/<job>/` (notes, rush éventuel) ; le rendu final va dans `outputs/<job>.final.mp4` (non versionné).
