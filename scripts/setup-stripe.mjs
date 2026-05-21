#!/usr/bin/env node
/**
 * setup-stripe.mjs — Configuration Stripe en une commande
 *
 * Usage :
 *   node scripts/setup-stripe.mjs sk_live_XXXXXXXX
 *   node scripts/setup-stripe.mjs sk_live_XXXXXXXX https://mon-domaine.vercel.app
 *
 * Ce que ça fait automatiquement :
 *   1. Crée le produit "Accès complet — Le Petit Musée du Vin"
 *   2. Crée le prix 19,90 € (paiement unique)
 *   3. Crée le Payment Link Stripe
 *   4. Enregistre le webhook → /api/stripe/webhook sur Vercel
 *   5. Met à jour .env.local avec toutes les clés
 *   6. Tente de mettre à jour Vercel via le CLI (si disponible)
 */

import Stripe from "stripe";
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const ENV_FILE = path.join(ROOT, ".env.local");

// ── Arguments ──────────────────────────────────────────────────────────────
const stripeKey = process.argv[2];
const vercelUrl = (process.argv[3] ?? "https://lpmv-pwa.vercel.app").replace(/\/$/, "");

if (!stripeKey || !stripeKey.startsWith("sk_")) {
  console.error("\n❌  Usage: node scripts/setup-stripe.mjs sk_live_... [https://votre-domaine.vercel.app]\n");
  process.exit(1);
}

const isLive = stripeKey.startsWith("sk_live_");
console.log(`\n🍷  Setup Stripe LPMV`);
console.log(`   Mode       : ${isLive ? "⚠️  LIVE (vrai argent)" : "✅  TEST (sandbox)"}`);
console.log(`   Webhook URL: ${vercelUrl}/api/stripe/webhook\n`);

const stripe = new Stripe(stripeKey, { apiVersion: "2026-04-22.dahlia" });

// ── 1. Produit ─────────────────────────────────────────────────────────────
process.stdout.write("   [1/5] Création du produit…");
let product;
// Chercher si déjà créé
const existingProducts = await stripe.products.search({ query: 'name:"Accès complet — Le Petit Musée du Vin"' });
if (existingProducts.data.length > 0) {
  product = existingProducts.data[0];
  process.stdout.write(` ✓ existant (${product.id})\n`);
} else {
  product = await stripe.products.create({
    name: "Accès complet — Le Petit Musée du Vin",
    description: "Accès à vie aux 5 chapitres, accords mets & vin, toutes les mini-leçons.",
    type: "service",
    metadata: { app: "lpmv-pwa" },
  });
  process.stdout.write(` ✓ créé (${product.id})\n`);
}

// ── 2. Prix ────────────────────────────────────────────────────────────────
process.stdout.write("   [2/5] Création du prix 19,90 €…");
let price;
const existingPrices = await stripe.prices.list({ product: product.id, active: true, limit: 5 });
const existing1990 = existingPrices.data.find((p) => p.unit_amount === 1990 && p.currency === "eur");
if (existing1990) {
  price = existing1990;
  process.stdout.write(` ✓ existant (${price.id})\n`);
} else {
  price = await stripe.prices.create({
    product: product.id,
    unit_amount: 1990, // 19,90 €
    currency: "eur",
    metadata: { label: "standard" },
  });
  process.stdout.write(` ✓ créé (${price.id})\n`);
}

// ── 3. Payment Link ────────────────────────────────────────────────────────
process.stdout.write("   [3/5] Création du Payment Link…");
const existingLinks = await stripe.paymentLinks.list({ active: true, limit: 20 });
const existingLink = existingLinks.data.find(
  (l) => l.metadata?.app === "lpmv-pwa" && l.metadata?.type === "premium_access",
);
let paymentLink;
if (existingLink) {
  paymentLink = existingLink;
  process.stdout.write(` ✓ existant\n`);
} else {
  paymentLink = await stripe.paymentLinks.create({
    line_items: [{ price: price.id, quantity: 1 }],
    after_completion: {
      type: "redirect",
      redirect: { url: `${vercelUrl}/compte?premium=true` },
    },
    allow_promotion_codes: true, // ← Permet d'entrer les codes musée
    billing_address_collection: "auto",
    metadata: { app: "lpmv-pwa", type: "premium_access" },
  });
  process.stdout.write(` ✓ créé\n`);
}
const paymentLinkUrl = `https://buy.stripe.com/${paymentLink.id}`;

// ── 4. Webhook ─────────────────────────────────────────────────────────────
process.stdout.write("   [4/5] Enregistrement du webhook…");
const webhookUrl = `${vercelUrl}/api/stripe/webhook`;
const existingWebhooks = await stripe.webhookEndpoints.list({ limit: 20 });
const existingWebhook = existingWebhooks.data.find((w) => w.url === webhookUrl && w.status === "enabled");
let webhookSecret;
if (existingWebhook) {
  process.stdout.write(` ✓ existant (${existingWebhook.id})\n`);
  console.warn("   ⚠  Le signing secret existant n'est pas récupérable via API.");
  console.warn("      → Dans Stripe Dashboard > Webhooks, cliquer sur \"Reveal\" pour récupérer whsec_...");
  webhookSecret = null;
} else {
  const webhook = await stripe.webhookEndpoints.create({
    url: webhookUrl,
    enabled_events: ["checkout.session.completed"],
    metadata: { app: "lpmv-pwa" },
  });
  webhookSecret = webhook.secret; // Disponible UNE SEULE FOIS
  process.stdout.write(` ✓ créé\n`);
}

// ── 5. Mise à jour .env.local ──────────────────────────────────────────────
process.stdout.write("   [5/5] Mise à jour .env.local…");
let envContent = readFileSync(ENV_FILE, "utf8");

function setEnvVar(content, key, value) {
  if (!value) return content; // Skip if null
  const regex = new RegExp(`^(${key}=.*)$`, "m");
  const newLine = `${key}=${value}`;
  if (regex.test(content)) {
    return content.replace(regex, newLine);
  }
  return content + `\n${newLine}`;
}

envContent = setEnvVar(envContent, "STRIPE_SECRET_KEY", stripeKey);
envContent = setEnvVar(envContent, "STRIPE_PAYMENT_LINK_URL", paymentLinkUrl);
if (webhookSecret) {
  envContent = setEnvVar(envContent, "STRIPE_WEBHOOK_SECRET", webhookSecret);
}
writeFileSync(ENV_FILE, envContent, "utf8");
process.stdout.write(` ✓\n`);

// ── Résumé ─────────────────────────────────────────────────────────────────
console.log(`
✅  Setup Stripe terminé !

   Payment Link : ${paymentLinkUrl}
   ${webhookSecret ? `Webhook secret : ${webhookSecret}` : "Webhook secret : voir Stripe Dashboard > Webhooks > Reveal"}

─────────────────────────────────────────────────────────
 Étape finale : Ajouter les 3 variables dans Vercel
─────────────────────────────────────────────────────────

Option A — Vercel CLI (copie-colle ces 3 commandes) :

   echo "${stripeKey}" | vercel env add STRIPE_SECRET_KEY production
   echo "${paymentLinkUrl}" | vercel env add STRIPE_PAYMENT_LINK_URL production${webhookSecret ? `\n   echo "${webhookSecret}" | vercel env add STRIPE_WEBHOOK_SECRET production` : "\n   # STRIPE_WEBHOOK_SECRET : récupérer depuis Stripe Dashboard puis :"}${!webhookSecret ? `\n   echo "whsec_COLLER_ICI" | vercel env add STRIPE_WEBHOOK_SECRET production` : ""}

Option B — Dashboard Vercel :
   https://vercel.com/haibi/lpmv-pwa/settings/environment-variables

   STRIPE_SECRET_KEY          = ${stripeKey.slice(0, 12)}...
   STRIPE_PAYMENT_LINK_URL    = ${paymentLinkUrl}${webhookSecret ? `\n   STRIPE_WEBHOOK_SECRET      = ${webhookSecret.slice(0, 12)}...` : "\n   STRIPE_WEBHOOK_SECRET      = (récupérer depuis Stripe Dashboard > Webhooks)"}

─────────────────────────────────────────────────────────
 Après : relancer un deploy Vercel pour activer les vars
─────────────────────────────────────────────────────────
`);

// ── Tentative Vercel CLI ───────────────────────────────────────────────────
const keysToSync = [
  ["STRIPE_SECRET_KEY", stripeKey],
  ["STRIPE_PAYMENT_LINK_URL", paymentLinkUrl],
  ...(webhookSecret ? [["STRIPE_WEBHOOK_SECRET", webhookSecret]] : []),
];

let vercelAvailable = false;
try {
  execSync("vercel --version", { stdio: "ignore" });
  vercelAvailable = true;
} catch {
  // Vercel CLI non installé
}

if (vercelAvailable) {
  console.log("   Vercel CLI détecté — synchronisation des variables en cours…");
  for (const [key, value] of keysToSync) {
    try {
      // Supprimer l'ancienne valeur (ignore si n'existe pas)
      try { execSync(`vercel env rm ${key} production --yes`, { stdio: "ignore" }); } catch {}
      // Ajouter la nouvelle
      execSync(`vercel env add ${key} production`, {
        input: value + "\n",
        stdio: ["pipe", "ignore", "ignore"],
      });
      console.log(`   ✓ ${key} → Vercel`);
    } catch {
      console.warn(`   ⚠  Échec ${key} — ajouter manuellement`);
    }
  }
  console.log("\n   Pour que les variables prennent effet :");
  console.log("   vercel deploy --prod\n");
}
