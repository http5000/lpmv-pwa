# Design System — LPMV-PWA

## Overall Vision

Manuel de terrain artisanal pour apprenti-vigneron. La page se tient en main comme un petit guide imprimé sur papier crème : marges généreuses, typographie qui respire, accents or quand on veut souligner un mot, dérive vers l'aubergine pour les moments où on demande l'attention. Imagery réelle (sols, vignes, ciels, mains) plutôt que vectoriels propres. Rythme contemplatif, jamais pressé.

**Aesthetic lane** : *artisan field guide* — entre le carnet de domaine en linen relié, le livre d'art Phaidon mini, et le manuel d'identification botanique des années 70. Pas magazine. Pas tech-minimal. Pas dashboard.

**Référence physique** : un cahier crème glissé dans la poche de la veste pendant la visite, avec un crayon, des annotations à l'encre aubergine, parfois une photo collée.

## Color Palette

Charte officielle reçue du musée le 2026-05-18, non-négociable au niveau des hex. Ce qu'on peut faire varier : la *stratégie* — passer de Restrained (l'actuel, accents seulement) à **Committed** (aubergine drench pour les moments forts).

### Tokens (OKLCH-converti pour le code, conservé HEX dans la charte)

| Rôle | Hex | OKLCH | Usage |
|---|---|---|---|
| `--color-aubergine` | `#310E31` | `oklch(0.22 0.064 327)` | Texte primaire, surface drench pour les moments forts |
| `--color-aubergine-soft` | `#6B4A6B` | `oklch(0.46 0.044 327)` | Texte secondaire |
| `--color-aubergine-deep` | `#1D061D` | `oklch(0.14 0.054 327)` | Hover, focus, ombre teintée |
| `--color-or` | `#CA9A2F` | `oklch(0.7 0.124 80)` | Accent moments de chaleur, "or moutarde" |
| `--color-or-olive` | `#BB9531` | `oklch(0.66 0.118 88)` | Accent secondaire |
| `--color-champetre` | `#C6A15B` | `oklch(0.71 0.094 80)` | Accent soft, métadonnées |
| `--color-sable` | `#CB9966` | `oklch(0.71 0.099 60)` | Accent chaud, optionnel |
| `--color-cream` | `#FAF6EC` | `oklch(0.97 0.014 90)` | Surface principale |
| `--color-cream-light` | `#FDFAF2` | `oklch(0.98 0.011 90)` | Surface sur-élevée |
| `--color-cream-dark` | `#EFE9D8` | `oklch(0.93 0.018 90)` | Bordures, séparateurs |

### Color strategy

**Committed.** Le cream reste la surface dominante (70% du temps), mais l'aubergine **drench** s'invite franchement sur les surfaces narratives clés (hero home, intros de chapitre, écrans de transition, /compte). Pas un accent timide en background-tint, mais une vraie surface qui occupe 100% du fold.

Règle pour l'or : utilisé pour *réchauffer* (un mot souligné, une étoile pleine, un trait d'union, une étiquette de progression), jamais en remplissage. Quand l'or se transforme en aplat de plus de 10% d'une surface, on relit deux fois.

Pas de couleurs hors charte. Si un module a besoin d'un accent spécifique (climat océanique = bleu ? sol volcanique = ocre ?), on dérive en variant la **luminosité** d'un token charte, pas en injectant une nouvelle teinte.

## Typography

### Fonts

- **Body / UI** : Josefin Sans (Google Fonts, weights 100/300/400/500). C'est la typo officielle du musée.
- **Display / titres** : Cormorant Garamond (Google Fonts, weights 300/400/500/600), **substitut temporaire** de Ambroise Light (Typofonderie licenciée, ~70€, à acheter avant prod publique). Cormorant est sur la reflex-reject list du skill impeccable — on l'utilise **avec discipline** : sizes très grands ou très petits, jamais entre, weight contrast fort, pas d'italique par défaut, pas de cap-pseudo-uppercase tracked.

### Scale modulaire (ratio 1.333, "perfect fourth")

```css
--text-2xs: clamp(0.6875rem, 0.65rem + 0.18vw, 0.75rem);
--text-xs:  clamp(0.75rem, 0.71rem + 0.2vw, 0.875rem);
--text-sm:  clamp(0.875rem, 0.82rem + 0.27vw, 1rem);
--text-base: clamp(1rem, 0.93rem + 0.36vw, 1.125rem);
--text-lg:  clamp(1.125rem, 1.04rem + 0.43vw, 1.375rem);
--text-xl:  clamp(1.375rem, 1.27rem + 0.55vw, 1.75rem);
--text-2xl: clamp(1.75rem, 1.59rem + 0.84vw, 2.25rem);
--text-3xl: clamp(2.25rem, 2rem + 1.2vw, 3rem);
--text-4xl: clamp(3rem, 2.55rem + 2.3vw, 4.5rem);   /* hero secondaire */
--text-5xl: clamp(4rem, 3.2rem + 4vw, 6.5rem);      /* hero principal, mots signature */
--text-6xl: clamp(5rem, 3.8rem + 6vw, 9rem);        /* drench oversize, un mot par page */
```

Line-heights : 1.05 pour les display sizes (4xl+), 1.15 pour titres (xl-3xl), 1.55 pour body, 1.7 pour quotes longs.

### Hierarchy

- **H1 hero** : `--text-5xl` ou `--text-6xl`, Cormorant weight 400, leading-[0.95] sur les très grands. Une seule par page.
- **H2 section** : `--text-3xl`, Cormorant 400.
- **H3** : `--text-xl`, Cormorant 500 ou Josefin 500 selon contexte.
- **Body** : `--text-base`, Josefin 400, leading 1.55, max-width 65ch.
- **Caption / metadata** : `--text-xs` ou `--text-2xs`, Josefin 400, **PAS uppercase tracked** par défaut.

### Restrictions / hygiène

- **Pas plus d'un uppercase-tracked kicker** dans la nav globale d'une page. Si tu veux un "Chapitre 2 / 5", c'est `text-sm font-serif` italic ou simple, pas la formule auto-AI.
- Pas de drop-cap décoratif sauf intention narrative explicite.
- Pas d'italique pour les pseudo-titres ; réserver l'italique aux citations du Mentor et aux noms latins (cépages, sols).

## Spacing & Layout

### Spacing scale (rem)

`0.25 · 0.5 · 0.75 · 1 · 1.5 · 2 · 3 · 4 · 6 · 9 · 13 · 20`

Pas linéaire. **Varier pour le rythme** : titres séparés du body par 1rem, sections séparées par 6rem ou 9rem (pas la même valeur partout), respiration aux moments-clés.

### Layout patterns

- **Mobile-first**, contenu en colonne unique sub-screen-sm. Au-delà, le contenu se cale en marges plus larges, **pas** en grilles complexes.
- **Asymmetric** : le numéro de chapitre est un *hanging numeral* dans la marge gauche, pas un kicker au-dessus. Les CTAs ne sont pas centrés sur la page mais alignés à un axe (gauche le plus souvent).
- **Drench moments** : full-bleed couleur d'arrière-plan (aubergine), padding intérieur 6rem-9rem vertical, contenu max-width 38ch pour rester lisible.

### Card discipline

Pas de cartes par défaut. Une carte = un objet *séparable* qui pourrait vivre seul (une dégustation enregistrée, un module isolé). Si l'objet est juste "un item de liste" → liste typographiée, pas carte.

Quand une carte est légitime :
- `bg-cream-light` (pas cream-dark)
- `border-cream-dark` (1px), **jamais** de border-left/right colorée
- `rounded-2xl` (16px) ou `rounded-3xl` (24px) pour les blocs plus importants
- Padding ≥1.5rem
- Pas de carte imbriquée dans une carte

## Imagery

**Brand sans imagery = bug.** Pour LPMV, on a déjà des assets dans `/public/` (sols/, climats/, vigne/, phylloxera/, biodynamie/, raisin-vin/, choix-vigneron/, champagne/, bio-conv/, maps/).

- Hero de chapitre = image full-bleed (aspect 4:5 mobile, 21:9 desktop), avec overlay aubergine 60% + texte par-dessus, **pas** une image timide en sidebar.
- Modules = une illustration ou photo représentative en ouverture, pas un icône Lucide générique.
- Carnet : préfère icône Lucide discrète à pas d'image (la dégustation est texte-first).
- Alt text : narratif. "Sol calcaire crayeux sous une rangée de pinot, midi juin." pas "calcaire".

## Components

### Boutons

```
Primary  → bg-aubergine text-cream-light rounded-full px-6 py-3 text-sm
Ghost    → border border-aubergine text-aubergine rounded-full px-6 py-3
Subtle   → text-aubergine underline-offset-4 hover:underline
```

Pas de gradient. Pas de shadow forte. Hover = très léger lift (translateY -1px) + opacité 0.92.

### Liens internes

Texte aubergine, soulignement à 1px solid `currentColor` avec `text-underline-offset: 3px`. Hover = couleur or.

### Champs de formulaire

```
border-b border-cream-dark, fond transparent (pas d'input "bubble")
padding-y 0.75rem, font Josefin
focus: border-b color or, pas de ring
```

L'input email du LoginForm actuel est en `rounded-2xl border bg-cream-light` — à reconsidérer si on veut commit field-guide.

### Logo

Variant `aubergine` (blanc sur fond aubergine) — déjà OK. Variant `or` = à valider si on rajoute des fonds or.

## Motion

### Énergie

**Discrète mais présente.** Pas de bounce, pas d'elastic, pas de spring. Une seule courbe maîtresse : `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-quart, le standard impeccable).

### Patterns

- **Page entrance** : stagger fade-up sur les 3-4 premiers blocs. Décalage 80ms, durée 600ms, distance 12px.
- **Hover cards/links** : `transition-colors duration-200`, jamais d'animation de taille (`scale`) sauf sur boutons primaires (`active:scale-[0.98]` OK).
- **Module transitions** : pas de transition de page complexe. Next App Router default.
- **Reduced motion** : respecter `prefers-reduced-motion: reduce` — pas d'opacity-0 → 1 (laisse statique), pas de transform.

### Bans motion

- Animation de `width`, `height`, `margin`, `padding`, `top/left` (CSS layout props).
- Animation infinite-loop décorative (sauf cas isolé : roue Terroir qui tourne).
- Parallax agressif.

## Shadows

OKLCH tintées aubergine, jamais grises pures.

```
--shadow-soft: 0 1px 2px oklch(0.22 0.064 327 / 0.04),
               0 2px 8px oklch(0.22 0.064 327 / 0.04);
--shadow-lift: 0 2px 4px oklch(0.22 0.064 327 / 0.06),
               0 8px 24px oklch(0.22 0.064 327 / 0.08);
```

Usage parcimonieux : seulement sur les surfaces qui *flottent vraiment* (cartes carnet, modal).

## Tone of voice (reprise PRODUCT.md)

Le Mentor (vigneron imaginaire) — chaleureux, érudit, contemplatif. Voir CLAUDE.md §1 pour les interdits absolus (jamais dénigrer le musée).
