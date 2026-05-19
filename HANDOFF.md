# HANDOFF — Reprendre LPMV-PWA sur une autre machine

Ce document contient **tout ce qu'il faut savoir** pour reprendre le développement
sans contexte préalable. À lire en premier par toute personne (humaine ou Claude
Code) qui ouvre ce repo pour la première fois.

---

## 1. Le projet en 3 lignes

PWA Next.js, **compagnon mobile du « Petit Musée du Vin »** (musée physique à Beaune).
16 modules pédagogiques en 5 chapitres (Terroir, Vigne, Cycle, Vinification, Dégustation).
Production live : **https://lpmv-pwa.vercel.app**

Le user / owner : **Haibi** (compte Vercel `haibis-projects`, compte GitHub à connecter).

---

## 2. État actuel (au dernier commit)

✅ **16/16 modules livrés et déployés**

| Chapitre | Modules disponibles |
|---|---|
| 🌍 Terroir | Sols (carte France interactive), Climat (13 climats), Roue Terroir (slot machine 280 combos) |
| 🌿 Vigne | Anatomie (parcours 6 organes), Phylloxéra (récit 6 actes), Bio vs Conv (swipe quiz), Biodynamie (8 stations) |
| 🍂 Cycle | Hiver, Printemps, Été, Automne (contenu Claude à valider) |
| 🍷 Vinification | Du raisin au vin (4 chemins en tabs), Choix vigneron (7 décisions), Champagne (5 actes + teaser jeu) |
| 👃 Dégustation | Guide étape-par-étape + roue aromatique, Carnet localStorage, Lire étiquette, Accords mets-vin, 10 Mini-leçons |

⏸️ **Non fait** : GitHub repo (pas encore poussé), Supabase CLI link (peu critique), auth, premium Stripe, photos réelles bouteilles, jeu Chef de Cave, i18n.

---

## 3. Pour reprendre sur une nouvelle machine

### Prérequis à installer

```bash
# Node ≥ 20 (testé sur v24.15)
# Git
# Vercel CLI :         npm i -g vercel
# GitHub CLI :         https://cli.github.com/ ou winget install GitHub.cli
# Claude Code :        https://claude.com/code
```

### Clone et installation

```bash
# Une fois le repo poussé sur GitHub (voir §4)
gh repo clone http5000/lpmv-pwa  # ou git clone https://github.com/http5000/lpmv-pwa
cd lpmv-pwa
npm install
```

### Configurer les variables d'environnement

```bash
cp .env.example .env.local
# Éditer .env.local et coller les valeurs Supabase (voir §5 secrets)
```

### Connecter Vercel

```bash
vercel login        # se logger avec le compte haibi
vercel link         # lier au projet existant haibis-projects/lpmv-pwa
vercel env pull     # rapatrier les env vars de Vercel vers .env.local
```

### Vérifier que ça tourne

```bash
npm run dev         # → http://localhost:3000
npx next build      # build de production (doit passer sans erreur)
```

### Lancer Claude Code

Dans le dossier `lpmv-pwa` :
```bash
claude   # ou via l'IDE
```

Claude Code lira automatiquement `CLAUDE.md` (qui inclut `AGENTS.md`) et trouvera
ce `HANDOFF.md`. Tu peux directement dire « lis CLAUDE.md et HANDOFF.md puis on
continue ».

---

## 4. Ce qui doit être fait AVANT la migration

> Ces étapes sont à faire **sur la machine actuelle** par le user.

### 4.1 Pousser sur GitHub (priorité absolue)

```bash
gh auth login
# choisir : GitHub.com → HTTPS → Y → Login with web browser
gh repo create lpmv-pwa --private --source="C:\Users\graph\Desktop\Claude App\lpmv-pwa" --remote=origin --push
```

Ensuite :
```bash
git push origin --all      # pousser toutes les branches locales (feat/* incluses)
```

### 4.2 Connecter Vercel ↔ GitHub (auto-deploy)

Dashboard Vercel → projet `lpmv-pwa` → Settings → Git → connecter le repo
GitHub fraîchement créé. À partir de là, chaque push sur master déploiera
automatiquement.

### 4.3 Sauvegarder les secrets

Le fichier `.env.local` n'est PAS dans git. Avant de migrer, en faire une copie
sécurisée (1Password, Bitwarden, ou note chiffrée) avec :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- Plus tard : `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_*` etc.

Le mot de passe DB Supabase n'est dans aucun fichier projet — il a été utilisé
une fois pour le link CLI (qui a échoué) et le user en a une copie.

---

## 5. Secrets et accès (à fournir sur la nouvelle machine)

| Quoi | Où le trouver |
|---|---|
| Supabase URL + publishable key | `.env.local` actuel ; aussi dans Vercel env vars (`vercel env pull`) |
| Supabase DB password | Fichier `Desktop\LPMV PWA.txt` (à conserver hors repo) ; sinon régénérer depuis le dashboard Supabase |
| Login Vercel (`haibi`) | Email/password Vercel ou GitHub auth |
| Login GitHub | À configurer avec `gh auth login` |
| Login Supabase (pour CLI) | À refaire avec `npx supabase login` si on veut le CLI |
| Compte Google Drive | Pour les JSON sources musée : `G:\Mon Drive\Le Petit Musée du Vin\` (le contenu est déjà dans `src/content/modules/`, n'est plus une dépendance critique) |

---

## 6. Sources externes utilisées (pour info)

- **JSON contenu musée** : `G:\Mon Drive\Le Petit Musée du Vin\Contenu\Borne\Texte\FR\` (Google Drive du musée)
- **Assets visuels** : extraits de l'exécutable V6 de la borne `Cahier des charges Dev\Executable\V6.zip`
- **Logo SVG officiel** : `Cahier des charges Dev\LPMV-content-empty\content\assets\logo.svg` → copié dans `/public/logo-lpmv.svg`
- **France GeoJSON** : `gregoiredavid/france-geojson` (CC BY-SA) → script `scripts/geojson-to-svg.mjs` génère `/public/maps/france-metro.svg`
- **Charte officielle** : board reçu du musée le 2026-05-18 (palette aubergine/or, typos Ambroise Light + Josefin Sans)

---

## 7. Mémoire Claude Code (transfert optionnel)

Sur la machine actuelle, Claude a accumulé des fichiers de mémoire dans :
```
C:\Users\graph\.claude\projects\C--Users-graph-Desktop-Claude-App-Formation-Kajiro\memory\
```

Ces fichiers contiennent les règles et conventions internalisées
(`feedback_lpmv_ne_pas_denigrer_musee.md`, `design_lpmv_charte.md`,
`persona_formateur_chevronne.md`, etc.).

**Pour transférer sur la nouvelle machine** : copier ce dossier à l'emplacement
équivalent. Sinon, **toutes ces règles sont déjà résumées dans CLAUDE.md et
ce HANDOFF.md** — la perte est minime.

---

## 8. Roadmap suggérée (par ordre de valeur)

### Court terme (avant test public)
1. **Push GitHub** + auto-deploy Vercel
2. **Relire le contenu rédactionnel par un expert vin** (`src/lib/content/{saisons,etiquette,accords,lecons,degustation}.ts`)
3. **Charte Ambroise Light** : acheter la licence Typofonderie (~70 €) et remplacer Cormorant Garamond
4. **Photos réelles** : remplacer les SVG génériques de l'étiquette par des illustrations / photos
5. **Icônes PWA finales** : créer `/public/icons/icon-192.png` et `icon-512.png` (actuellement placeholders)

### Moyen terme
6. **Auth Supabase** + carnet en cloud (sync multi-device)
7. **Jeu Chef de Cave** (composer 6 doses → simulation fermentation → dosage → verdict)
8. **i18n EN/ES** (utiliser la séparation locales/structure déjà présente dans le JSON source)
9. **Mode QR sur place** : scanner un QR du musée → débloquer contenu bonus

### Long terme
10. **Stripe premium** (carnet illimité, modules avancés)
11. **Notifications push PWA** (rappels dégustation, événements musée)
12. **Native apps** (Capacitor.js depuis la PWA)

---

## 9. Limites et conventions à respecter

### Règles que Claude DOIT respecter
- ✅ Ne JAMAIS dénigrer le musée (voir CLAUDE.md §1)
- ✅ Ne JAMAIS effacer du contenu utilisateur sans confirmation explicite
- ✅ Secrets jamais en clair dans le code ou le chat
- ✅ Charte palette/logo/typo respectée
- ✅ Une branche par feature, commit puis merge sur master
- ✅ Build local avant chaque commit

### Choix techniques posés
- App Router (pas Pages Router)
- Tailwind v4 avec tokens CSS définis dans `globals.css`
- Server Components par défaut, Client Components uniquement quand nécessaire (interactivité)
- Pas de state management global (useState local + localStorage suffisent)
- Pas d'auth en v1 (le carnet vit sur l'appareil)
- Pas de tests automatisés en v1 (à ajouter avant prod si on monte en équipe)

---

## 10. Contacts et ressources

- **Production live** : https://lpmv-pwa.vercel.app
- **Vercel dashboard** : https://vercel.com/haibis-projects/lpmv-pwa
- **Supabase project** : `hgijgsjawkoxfmyecqxe` (dashboard accessible depuis le compte du user)
- **Repo GitHub** : à créer (voir §4.1)
- **Musée physique** : Le Petit Musée du Vin, Beaune
- **Charte officielle** : board reçu 2026-05-18 (palette aubergine/or, typos Ambroise + Josefin)

---

## Tldr pour Claude Code qui arrive ici la première fois

1. Tu vas lire `CLAUDE.md` (déjà fait par l'import automatique d'AGENTS.md)
2. Tu as maintenant lu `HANDOFF.md` (ce fichier)
3. Tu as une **vision complète** du projet et de ses règles
4. Tu peux **commencer à coder** en respectant :
   - les règles non-négociables (CLAUDE.md §Règles)
   - le workflow branche → commit → merge → deploy
   - la palette et la charte
5. Le user te dira par où commencer
