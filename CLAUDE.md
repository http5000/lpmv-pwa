@AGENTS.md

# CLAUDE.md — LPMV-PWA (lecture obligatoire avant d'agir)

> Tu es Claude Code, démarrant sur ce projet. Lis ce fichier **et** [HANDOFF.md](./HANDOFF.md)
> avant toute action. Les règles ci-dessous **priment** sur tout comportement par défaut.

## Ce que c'est

PWA Next.js 16, **compagnon du musée physique « Le Petit Musée du Vin »** à Beaune.
L'app prolonge la visite (sols, climat, vigne, vinification, dégustation) avec
16 modules répartis en 5 chapitres. Production : https://lpmv-pwa.vercel.app

## Règles non-négociables

### 1. Ne jamais dénigrer le musée
L'app est **prolongement**, jamais substitut. Interdit dans tout texte UI :
- ❌ « la version complète du musée »
- ❌ « le musée a encore à dire sur… »
- ❌ « sur la borne, on glisse… »
- ❌ tout ce qui suggère que l'app remplace ou dévalorise la borne / la visite

Reformuler en invitation ou en exploration. Voir HANDOFF.md §Règles.

### 2. Ne jamais effacer le contenu utilisateur
Le carnet de dégustation (`src/lib/storage/carnet.ts`) est sacré : aucune suppression
sans confirmation explicite à deux clics. Pareil pour tout futur contenu user.

### 3. Secrets jamais visibles
- `.env*` est gitignoré (sauf `.env.example`).
- Préfixe `NEXT_PUBLIC_` interdit pour tout secret côté serveur uniquement.
- Jamais coller un secret en clair dans le code ou le chat.

### 4. Charte officielle obligatoire
Palette : aubergine `#310E31`, or `#CA9A2F`, cream `#FAF6EC` (voir `src/app/globals.css`).
Logo blanc sur fond aubergine ou or — **jamais aubergine sur fond clair**.
Typos : Josefin Sans (corps) + Cormorant Garamond (titres, substitut temporaire
d'Ambroise Light qui est une typo licenciée Typofonderie).

## Stack & arborescence

- **Next.js 16** App Router + Turbopack + Tailwind v4 + TypeScript
- **Framer Motion** (animations) + **Lucide React** (icônes)
- **Supabase SSR** (`@supabase/ssr`) — branché mais peu utilisé en v1 (carnet = localStorage)
- **Vercel** déploiement (projet `haibis-projects/lpmv-pwa`)

```
src/
  app/chapitres/          ← 5 chapitres × 2-5 modules chacun
  components/             ← regroupés par module (sols/, climats/, roue/, etc.)
  lib/
    chapitres.ts          ← source de vérité du parcours (slug + status)
    content/*.ts          ← contenu rédactionnel TypeScript (à éditer ici)
    storage/carnet.ts     ← carnet localStorage
    supabase/{client,server}.ts
  content/modules/*.json  ← JSON sources du musée (NE PAS modifier)
public/
  sols/, climats/, roue/, vigne/, phylloxera/, biodynamie/,
  raisin-vin/, choix-vigneron/, champagne/, bio-conv/, maps/, …
  logo-lpmv.svg           ← logo officiel vectorisé
```

## Workflow recommandé

1. **Une branche par feature** : `feat/module-N-xxx` ou `fix/...`
2. **Build local** avant commit : `npx next build`
3. **Commit + merge sur master** : message clair, co-author Claude
4. **Deploy** : `vercel --prod --yes` (compte Vercel `haibi` à connecter)

## Sources de contenu

Le contenu pédagogique des modules vient de :
- `content/modules/*.json` — exporté des bornes du musée (référentiel, NE PAS modifier)
- `lib/content/*.ts` — contenu rédigé from scratch par Claude
  - `saisons.ts` (Cycle de la vigne 4 saisons)
  - `etiquette.ts` (Lire une étiquette)
  - `accords.ts` (Accords mets-vin)
  - `lecons.ts` (10 mini-leçons)
  - `degustation.ts` (vocabulaire dégustation + roue aromatique)
  - **À VALIDER avec un expert vin** avant prod (cf HANDOFF.md)

Les assets visuels (PNG, SVG illustrations sols/climats/phylloxéra/etc.) sont
extraits de l'exécutable V6 de la borne, copiés dans `/public/<theme>/`.

## Ce qui n'est PAS encore fait

- [ ] Carnet en cloud (actuellement localStorage). v2 = Supabase + auth
- [ ] Auth utilisateur (pas de compte aujourd'hui)
- [ ] Mode premium / paywall Stripe
- [ ] Photos réelles bouteilles pour Dégustation
- [ ] Game « Chef de Cave » (composer 6 doses) — teaser en bas page Champagne
- [ ] i18n EN / ES (la séparation locales/structure du JSON musée est prête)
- [ ] PWA install icons définitifs (placeholders 192/512 à remplacer)
- [ ] GitHub repo — actuellement local seulement
- [ ] Supabase CLI link (peu critique, schémas via dashboard SQL Editor)

## Onboarding rapide sur nouvelle machine

Voir `HANDOFF.md` pour la procédure complète.
