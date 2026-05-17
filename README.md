# LPMV-PWA — Le Petit Musée du Vin (companion app)

PWA Next.js, compagnon mobile du musée physique « Le Petit Musée du Vin »
à Beaune. 16 modules pédagogiques répartis en 5 chapitres pour prolonger
la visite : Terroir, Vigne & Viticulture, Cycle de la vigne, Vinification,
Dégustation.

🌐 **Production** : https://lpmv-pwa.vercel.app

## Démarrage rapide

```bash
git clone <repo>
cd lpmv-pwa
npm install
cp .env.example .env.local           # puis remplir avec les vrais secrets
npm run dev                          # → http://localhost:3000
```

## Pour Claude Code

Lire **[CLAUDE.md](./CLAUDE.md)** puis **[HANDOFF.md](./HANDOFF.md)** avant
toute action. Ces deux fichiers contiennent les règles non-négociables et
tout le contexte projet.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript
- Tailwind CSS v4
- Framer Motion (animations), Lucide React (icônes)
- Supabase SSR (préparé, peu utilisé en v1)
- Vercel (hébergement)

## Structure

```
src/
  app/chapitres/           5 chapitres × 2-5 modules
  components/<theme>/      composants regroupés par module
  lib/
    chapitres.ts           source de vérité du parcours
    content/*.ts           contenu rédactionnel TypeScript
    storage/carnet.ts      carnet de dégustation localStorage
    supabase/*.ts          clients SSR + browser
  content/modules/*.json   exports JSON des bornes du musée
public/
  <theme>/                 assets visuels par module
  logo-lpmv.svg            logo officiel vectorisé
  maps/france-metro.svg    carte de France (générée)
```

## Scripts

```bash
npm run dev                    # serveur dev
npm run build                  # build prod (Turbopack)
npm run start                  # serveur prod local
npm run lint                   # ESLint
node scripts/geojson-to-svg.mjs public/maps/france-metro.svg
                               # régénérer la carte France depuis le GeoJSON
```

## Charte officielle

- Palette : aubergine `#310E31`, or `#CA9A2F`, cream `#FAF6EC`
- Typos : Josefin Sans (corps) + Cormorant Garamond (titres, substitut
  temporaire d'Ambroise Light de Typofonderie)
- Logo : blanc sur fond aubergine ou or, jamais en aubergine sur fond clair

## Déploiement

Projet Vercel : `haibis-projects/lpmv-pwa`. Domaine : `lpmv-pwa.vercel.app`.

```bash
vercel --prod --yes   # déploiement manuel
```

Auto-deploy GitHub à configurer après push initial (voir HANDOFF §4).

## Licence et crédits

- Code : propriétaire (Le Petit Musée du Vin / Haibi)
- Contour France : [gregoiredavid/france-geojson](https://github.com/gregoiredavid/france-geojson) CC BY-SA
- Contenu pédagogique source : exports des bornes du musée (référentiel
  interne du Petit Musée du Vin)
- Logo et charte : propriété du Petit Musée du Vin
