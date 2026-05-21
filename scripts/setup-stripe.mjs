#!/usr/bin/env node
/**
 * setup-stripe.mjs — Configuration Stripe complète en une commande
 *
 * Usage :
 *   node scripts/setup-stripe.mjs sk_live_...
 *   node scripts/setup-stripe.mjs sk_live_... https://mon-domaine.vercel.app
 *
 * Ce que ça fait automatiquement :
 *   1. Crée le produit "Accès complet — Le Petit Musée du Vin"
 *   2. Crée le prix 19,90 € (paiement unique)
 *   3. Crée le Payment Link (codes promo activés, redirect /compte?premium=true)
 *   4. Enregistre le webhook → /api/stripe/webhook sur Vercel
 *   5. Met à jour .env.local avec toutes les clés
 *   6. Tente de pousser vers Vercel via CLI si disponible
 */

import Stripe from "stripe";
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const ENV_FILE = path.join(ROOT, ".env.local");

const stripeKey = process.argv[2];
const vercelUrl = (process.argv[3] ?? "https://lpmv-pwa.vercel.app").replace(/\/$/, "");

if (!stripeKey || (!stripeKey.startsWith("sk_") && !stripeKey.startsWith("rk_"))) {
  console.error("\n❌  Usage: node scripts/setup-stripe.mjs sk_live_... [https://votre-domaine.vercel.app]\n");
  process.exit(1);
}

const isLive = stripeKey.includes("_live_");
console.log(`\n🍷  Setup Stripe LPMV`);
console.log(`   Mode       : ${isLive ? "⚠️  LIVE (vrai argent)" : "✅  TEST (sandbox)"}`);
console.log(`   Webhook URL: ${vercelUrl}/api/stripe/webhook\n`);

const stripe = new Stripe(stripeKey, { apiVersion: "2026-04-22.dahlia" });

// ── 1. Produit ─────────────────────────────────────────────────────────────
process.stdout.write("   [1/5] Produit…");
let product;
const existingProducts = await stripe.products.search({
  query: 'name:"Accès complet — Le Petit Musée du Vin"',
});
if (existingProducts.data.length > 0) {
  product = existingProducts.data[0];
  // Réactiver si désactivé
  if (!product.active) {
    product = await stripe.products.update(product.id, { active: true });
  }
  process.stdout.write(` ✓ existant (${product.id})\n`);
} else {
  product = await stripe.products.create({
    name: "Accès complet — Le Petit Musée du Vin",
    description: "Accès à vie aux 5 chapitres, accords mets & vin, toutes les mini-leçons.",
    metadata: { app: "lpmv-pwa" },
  });
  process.stdout.write(` ✓ créé (${product.id})\n`);
}

// ── 2. Prix ────────────────────────────────────────────────────────────────
process.stdout.write("   [2/5] Prix 19,90 €…");
let price;
const existingPrices = await stripe.prices.list({ product: product.id, active: true, limit: 5 });
const existing1990 = existingPrices.data.find(
  (p) => p.unit_amount === 1990 && p.currency === "eur"
);
if (existing1990) {
  price = existing1990;
  process.stdout.write(` ✓ existant (${price.id})\n`);
} else {
  price = await stripe.prices.create({
    product: product.id,
    unit_amount: 1990,
    currency: "eur",
    metadata: { label: "standard" },
  });
  process.stdout.write(` ✓ créé (${price.id})\n`);
}

// ── 3. Payment Link ────────────────────────────────────────────────────────
process.stdout.write("   [3/5] Payment Link…");
const existingLinks = await stripe.paymentLinks.list({ active: true, limit: 20 });
const existingLink = existingLinks.data.find(
  (l) => l.metadata?.app === "lpmv-pwa" && l.metadata?.type === "premium_access"
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
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    metadata: { app: "lpmv-pwa", type: "premium_access" },
  });
  process.stdout.write(` ✓ créé\n`);
}
const paymentLinkUrl = `https://buy.stripe.com/${paymentLink.id}`;

// ── 4. Webhook ─────────────────────────────────────────────────────────────
process.stdout.write("   [4/5] Webhook…");
const webhookUrl = `${vercelUrl}/api/stripe/webhook`;
const existingWebhooks = await stripe.webhookEndpoints.list({ limit: 20 });
const existingWebhook = existingWebhooks.data.find(
  (w) => w.url === webhookUrl && w.status === "enabled"
);
let webhookSecret;
if (existingWebhook) {
  process.stdout.write(` ✓ existant (${existingWebhook.id})\n`);
  console.warn("   ⚠  Signing secret non récupérable via API.");
  console.warn("      Stripe Dashboard → Developers → Webhooks → Reveal signing secret");
  webhookSecret = null;
} else {
  const webhook = await stripe.webhookEndpoints.create({
    url: webhookUrl,
    enabled_events: ["checkout.session.completed"],
    metadata: { app: "lpmv-pwa" },
  });
  webhookSecret = webhook.secret;
  process.stdout.write(` ✓ créé (${webhook.id})\n`);
}

// ── 5. .env.local ──────────────────────────────────────────────────────────
process.stdout.write("   [5/5] .env.local…");
let envContent = readFileSync(ENV_FILE, "utf8");

function setEnvVar(content, key, value) {
  if (!value) return content;
  const regex = new RegExp(`^${key}=.*$`, "m");
  const newLine = `${key}=${value}`;
  return regex.test(content) ? content.replace(regex, newLine) : content + `\n${newLine}`;
}

envContent = setEnvVar(envContent, "STRIPE_SECRET_KEY", stripeKey);
envContent = setEnvVar(envContent, "STRIPE_PAYMENT_LINK_URL", paymentLinkUrl);
if (webhookSecret) {
  envContent = setEnvVar(envContent, "STRIPE_WEBHOOK_SECRET", webhookSecret);
}
writeFileSync(ENV_FILE, envContent, "utf8");
process.stdout.write(" ✓\n");

// ── Résumé ─────────────────────────────────────────────────────────────────
console.log(`
✅  Setup Stripe terminé !

   Payment Link    : ${paymentLinkUrl}
   Webhook secret  : ${webhookSecret ? webhookSecret.slice(0, 14) + "..." : "voir Dashboard > Webhooks > Reveal"}
`);

// ── Vercel CLI ─────────────────────────────────────────────────────────────
const keysToSync = [
  ["STRIPE_SECRET_KEY", stripeKey],
  ["STRIPE_PAYMENT_LINK_URL", paymentLinkUrl],
  ...(webhookSecret ? [["STRIPE_WEBHOOK_SECRET", webhookSecret]] : []),
];

let vercelAvailable = false;
try { execSync("vercel --version", { stdio: "ignore" }); vercelAvailable = true; } catch {}

if (vercelAvailable) {
  console.log("   Vercel CLI détecté — push des variables…");
  for (const [key, value] of keysToSync) {
    try {
      try { execSync(`vercel env rm ${key} production --yes`, { stdio: "ignore" }); } catch {}
      execSync(`vercel env add ${key} production`, {
        input: value + "\n",
        stdio: ["pipe", "ignore", "ignore"],
      });
      console.log(`   ✓ ${key} → Vercel`);
    } catch {
      console.warn(`   ⚠  Échec ${key} — ajouter manuellement`);
    }
  }
  console.log("\n   vercel deploy --prod   ← pour activer\n");
} else {
  console.log(`Variables à ajouter dans Vercel :
   https://vercel.com/haibi/lpmv-pwa/settings/environment-variables

   STRIPE_SECRET_KEY       = ${stripeKey.slice(0, 14)}...
   STRIPE_PAYMENT_LINK_URL = ${paymentLinkUrl}${webhookSecret ? `\n   STRIPE_WEBHOOK_SECRET   = ${webhookSecret.slice(0, 14)}...` : "\n   STRIPE_WEBHOOK_SECRET   = (récupérer depuis Stripe Dashboard)"}
`);
}
