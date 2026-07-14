# dart-promo

- **Client** : D.Art (décoration/agencement d'espaces, résidentiel & professionnel, depuis 2020)
- **Type** : rush filmé + voix off fournie
- **Format** : short - tiktok/raw, 9:16, 1080x1920
- **Durée cible** : ~44s

## Statut

- [x] Intake : 5 rushes reçus dans `raw/` (IMG_4930 4K/6s, IMG_4963 5s, IMG_4974 9.3s, IMG_5017 4.6s, IMG_5039 10.6s — tous 16:9, recadrés en 9:16 via object-fit cover)
- [x] Rough cut : les 5 clips séquencés avec un ralenti uniforme (~11%, playbackRate 0.888) pour couvrir exactement les 40s de b-roll (44s - 4s de hook)
- [x] Graphics : hook = plan stylisé dessiné en SVG animé (`FloorPlan.tsx`) ; wordmark D.ART persistant sur le b-roll
- [x] Captions : texte du script converti en captions animées bas d'écran, synchronisées frame par frame sur les timecodes approuvés (`captions.ts`)
- [x] Export : `outputs/dart-promo.final.mp4` (composition `DartPromo`, 1080x1920, 1320 frames/44s)
- [ ] **Voix off réelle** : non disponible — aucun outil TTS dans cet environnement. Remplacée par les captions animées. À remplacer par un vrai enregistrement audio si besoin (le montage vidéo resterait le même, il suffirait d'ajouter la piste audio et d'ajuster le calage).
- [ ] **Image du plan** : non disponible — aucun outil de génération d'image photo. Remplacée par un dessin vectoriel stylisé, pas une photo réelle.
- [ ] Musique de fond (optionnelle, non ajoutée)
- [ ] Validation client sur le montage envoyé

## Script (voix off)

**[0-4s] HOOK**
"Un espace mal agencé, ce n'est pas juste une question d'esthétique — c'est un lieu où l'on se sent mal, chaque jour, sans savoir pourquoi."
(image d'un plan bien agencé à fournir)

**[4-16s]**
"Depuis 2020 dans le secteur de la décoration, une conviction reste la même : qu'il s'agisse d'un intérieur personnel ou d'un espace professionnel, chaque projet a besoin de quelqu'un qui comprend les besoins réels derrière la demande, qui reste réactif à chaque étape, qui s'adapte aux nouvelles tendances, et qui sait trouver la créativité qui correspond vraiment à chaque client. Voilà ce que D.Art met au service de chaque projet."
(Visuel : réalisations, avant/après d'espaces — alterner résidentiel et professionnel)

**[16-30s] LA DIFFÉRENCE D.ART**
"Ce qui distingue D.Art : une exigence créative portée par une vraie stratégie de visibilité. Chaque réalisation est pensée pour être vue — et pour parler d'elle-même."
(Visuel : montage de projets, détails soignés)

"D.Art vous accompagne étape par étape, de la première idée à la dernière finition, pour un résultat qui vous ressemble vraiment."
(Visuel : espace final, ambiance premium)

**[40-44s] CTA**
"Découvrez D.Art, pour vos projets d'espaces. Suivez-nous."
(Texte à l'écran : "Suivez-nous 🌹")
