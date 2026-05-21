#!/usr/bin/env node
/**
 * scripts/cap-build.mjs — Build Capacitor cross-platform (Windows / Mac / Linux)
 *
 * Usage :
 *   node scripts/cap-build.mjs           → build + cap sync (tous les plateformes)
 *   node scripts/cap-build.mjs android   → build + cap sync android + cap open android
 *   node scripts/cap-build.mjs ios       → build + cap sync ios + cap open ios (macOS requis)
 *
 * Équivalent de :
 *   CAPACITOR_BUILD=1 next build && npx cap sync [platform]
 *
 * Pourquoi ce script plutôt qu'un npm script ?
 *   Sur Windows, on ne peut pas faire `VAR=val commande` en ligne.
 *   cross-env marcherait, mais évite une dépendance de plus.
 *
 * Pourquoi le "stash" de route.ts ?
 *   Next.js exige que les Route Handlers soient exclus d'un export statique.
 *   /auth/callback est uniquement utilisé sur Vercel (web) — dans l'app native,
 *   l'auth est gérée par CapacitorAuthHandler via le deep link lpmv://auth/callback.
 *   On stash le fichier le temps du build, puis on le restaure dans le bloc finally.
 */

import { execSync } from "child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const platform = process.argv[2]; // "ios" | "android" | undefined

const env = { ...process.env, CAPACITOR_BUILD: "1" };
const opts = { stdio: "inherit", env };

// Fichiers à stasher pendant le build statique
const STASH = [
  {
    src: path.join(repoRoot, "src/app/auth/callback/route.ts"),
    bak: path.join(repoRoot, "src/app/auth/callback/route.ts.bak"),
    // Page stub minimale : jamais rendue dans l'app native
    stub: path.join(repoRoot, "src/app/auth/callback/page.tsx"),
    stubContent: `// Stub Capacitor — l'auth native passe par CapacitorAuthHandler (deep link lpmv://)
// Ce fichier n'est jamais rendu dans l'app native.
export default function AuthCallbackStub() { return null; }
`,
  },
];

function stashRouteHandlers() {
  for (const f of STASH) {
    if (!fs.existsSync(f.src)) continue;
    fs.renameSync(f.src, f.bak);
    fs.writeFileSync(f.stub, f.stubContent, "utf8");
    console.log(`   ↳ Stash: ${path.relative(repoRoot, f.src)}`);
  }
}

function restoreRouteHandlers() {
  for (const f of STASH) {
    if (!fs.existsSync(f.bak)) continue;
    if (fs.existsSync(f.stub)) fs.unlinkSync(f.stub);
    fs.renameSync(f.bak, f.src);
    console.log(`   ↳ Restore: ${path.relative(repoRoot, f.src)}`);
  }
}

// ─── Build ────────────────────────────────────────────────────────────────────

console.log("\n⚙️  Préparation export statique Capacitor…");

// Supprimer .next/ pour éviter que les types générés par le dev server
// ne référencent les Route Handlers stashés (erreur TypeScript au build).
const nextCacheDir = path.join(repoRoot, ".next");
if (fs.existsSync(nextCacheDir)) {
  fs.rmSync(nextCacheDir, { recursive: true, force: true });
  console.log("   ↳ Cache .next/ supprimé");
}

stashRouteHandlers();

try {
  // 1. Build Next.js en mode export statique
  console.log("\n🔨  next build (CAPACITOR_BUILD=1) …\n");
  execSync("npx next build", opts);

  // 2. Copier les assets dans les projets natifs
  const syncTarget = platform ?? "";
  console.log(`\n📦  npx cap sync ${syncTarget}…\n`);
  execSync(`npx cap sync ${syncTarget}`.trim(), opts);

  // 3. Ouvrir l'IDE natif si plateforme spécifiée
  if (platform === "ios") {
    console.log("\n🍎  Ouverture Xcode…");
    execSync("npx cap open ios", opts);
  } else if (platform === "android") {
    console.log("\n🤖  Ouverture Android Studio…");
    execSync("npx cap open android", opts);
  }

  console.log("\n✅  Capacitor build terminé.\n");
} finally {
  // Toujours restaurer, même en cas d'erreur
  console.log("\n♻️  Restauration des Route Handlers…");
  restoreRouteHandlers();
}
