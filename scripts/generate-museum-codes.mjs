#!/usr/bin/env node
/**
 * Générateur de codes promo musée (Stripe Promotion Codes)
 *
 * Usage :
 *   node scripts/generate-museum-codes.mjs [count] [prefix]
 *
 *   count  — nombre de codes à générer (défaut : 10)
 *   prefix — préfixe lisible (défaut : MUSEE)
 *
 * Exemples :
 *   node scripts/generate-museum-codes.mjs 50
 *   node scripts/generate-museum-codes.mjs 100 VMDV
 *
 * Prérequis :
 *   STRIPE_SECRET_KEY doit être défini dans .env.local (chargé automatiquement)
 *
 * Le script :
 *   1. Récupère ou crée le Coupon "MUSEE50" (50 % off, single use)
 *   2. Génère `count` Promotion Codes attachés à ce Coupon
 *   3. Affiche la liste en sortie (CSV : code,url)
 *   4. Sauvegarde dans scripts/museum-codes-YYYY-MM-DD.csv
 */

import Stripe from "stripe";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

// Charger .env.local manuellement (pas de dotenv dans le projet)
const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../.env.local");
try {
  const env = readFileSync(envPath, "utf8");
  for (const line of env.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
} catch {
  // .env.local absent — on continue (les clés doivent être dans l'env système)
}

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY.includes("REMPLACER")) {
  console.error("❌  STRIPE_SECRET_KEY manquante ou placeholder dans .env.local");
  process.exit(1);
}

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2026-04-22.dahlia" });

const count = parseInt(process.argv[2] ?? "10", 10);
const prefix = (process.argv[3] ?? "MUSEE").toUpperCase().replace(/[^A-Z0-9]/g, "");

if (isNaN(count) || count < 1 || count > 500) {
  console.error("❌  count doit être entre 1 et 500");
  process.exit(1);
}

console.log(`\n🍷  Générateur de codes musée LPMV`);
console.log(`   Stripe : ${STRIPE_SECRET_KEY.startsWith("sk_test") ? "mode TEST" : "mode LIVE ⚠️"}`);
console.log(`   Codes à créer : ${count} · Préfixe : ${prefix}\n`);

// ── 1. Coupon "MUSEE50" ───────────────────────────────────────────────────
let coupon;
const couponId = "LPMV_MUSEUM_50";

try {
  coupon = await stripe.coupons.retrieve(couponId);
  console.log(`✓  Coupon existant récupéré : ${couponId} (-${coupon.percent_off}%)`);
} catch {
  coupon = await stripe.coupons.create({
    id: couponId,
    percent_off: 50,
    duration: "once",
    name: "Code Musée — 50% de réduction",
    currency: "eur",
  });
  console.log(`✓  Coupon créé : ${couponId} (-50%)`);
}

// ── 2. Générer les Promotion Codes ───────────────────────────────────────
const results = [];
let created = 0;
let errors = 0;

for (let i = 1; i <= count; i++) {
  const paddedIndex = String(i).padStart(4, "0");
  const code = `${prefix}-${paddedIndex}`;

  try {
    const promoCode = await stripe.promotionCodes.create({
      // API 2026-04-22.dahlia : coupon encapsulé dans promotion.{type,coupon}
      promotion: { type: "coupon", coupon: couponId },
      code,
      max_redemptions: 1,
      metadata: { source: "museum_lpmv", batch_date: new Date().toISOString().slice(0, 10) },
    });
    results.push({ code: promoCode.code, id: promoCode.id });
    process.stdout.write(created % 10 === 0 ? `\r   Créés : ${created}/${count}` : "");
    created++;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`\n   ⚠  Code ${code} ignoré : ${msg}`);
    errors++;
  }
}

console.log(`\r   Créés : ${created}/${count}${errors > 0 ? ` (${errors} erreurs)` : ""}\n`);

// ── 3. Sauvegarde CSV ─────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
const filename = `scripts/museum-codes-${today}.csv`;
const csv = ["code,stripe_id", ...results.map((r) => `${r.code},${r.id}`)].join("\n");
writeFileSync(filename, csv, "utf8");

console.log(`✅  ${created} codes générés et sauvegardés dans ${filename}`);
console.log(`   Mode d'emploi : distribuer chaque code musée à un visiteur.`);
console.log(`   Le code entre sur la page /premium et Stripe applique -50%.\n`);
