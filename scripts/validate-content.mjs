/**
 * validate-content.mjs
 * Validation éditoriale des fichiers src/lib/content/*.ts via Mistral AI.
 *
 * Usage : node scripts/validate-content.mjs
 *
 * Prérequis : MISTRAL_API_KEY dans .env.local
 * → Créer une clé sur https://console.mistral.ai/api-keys
 * → Ajouter dans .env.local : MISTRAL_API_KEY=sk-...
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ─── Configuration ────────────────────────────────────────────────────────────

const ENV_FILE = join(ROOT, ".env.local");
function readEnv(key) {
  try {
    for (const line of readFileSync(ENV_FILE, "utf8").split("\n")) {
      const [k, ...v] = line.split("=");
      if (k.trim() === key) return v.join("=").trim().replace(/^["']|["']$/g, "");
    }
  } catch {}
  return null;
}

const MISTRAL_API_KEY = readEnv("MISTRAL_API_KEY");
if (!MISTRAL_API_KEY) {
  console.error(`
❌ MISTRAL_API_KEY manquante.

Pour l'ajouter :
  1. Crée une clé sur https://console.mistral.ai/api-keys
  2. Ajoute cette ligne dans .env.local :
     MISTRAL_API_KEY=ta-cle-ici
  3. Relance : node scripts/validate-content.mjs
`);
  process.exit(1);
}

const MODEL = "mistral-large-latest";
const MISTRAL_URL = "https://api.mistral.ai/v1/chat/completions";

// ─── Fichiers à valider ────────────────────────────────────────────────────────

const CONTENT_DIR = join(ROOT, "src", "lib", "content");
const FILES_TO_VALIDATE = [
  "accords.ts",
  "lecons.ts",
  "etiquette.ts",
  "saisons.ts",
  "degustation.ts",
  "sols.ts",
  "climats.ts",
  "champagne.ts",
  "roue-terroir.ts",
];

// ─── Prompt système expert ─────────────────────────────────────────────────────

const SYSTEM_PROMPT = `Tu es un expert en viticulture et œnologie avec 20 ans d'expérience en Bourgogne et Champagne.
Tu travailles pour valider le contenu éditorial d'une application pédagogique sur le vin destinée au grand public.
Ton rôle : vérifier la précision factuelle du contenu technique sur le vin, en t'exprimant de manière humaine et directe.

Pour chaque fichier de contenu analysé :
- Note les erreurs factuelles (chiffres incorrects, appellations erronées, techniques mal décrites)
- Signale les imprécisions acceptables mais améliorables
- Valide ce qui est correct et bien formulé
- Propose des corrections concrètes (pas vagues)
- Adapte ton niveau de précision au public cible : curieux cultivé, pas sommelier professionnel

Format de réponse : un rapport clair, direct, sans fioritures. Max 300 mots par fichier.
Si le contenu est globalement correct, dis-le clairement — ne cherche pas à inventer des problèmes.`;

// ─── Fonction d'appel API ──────────────────────────────────────────────────────

async function validateFile(filename, content) {
  // Tronquer si trop long (max ~8000 tokens ≈ ~32000 chars)
  const truncated = content.length > 30000 ? content.slice(0, 30000) + "\n\n[... fichier tronqué à 30 000 caractères]" : content;

  const response = await fetch(MISTRAL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MISTRAL_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Fichier : ${filename}\n\nContenu :\n\`\`\`typescript\n${truncated}\n\`\`\``,
        },
      ],
      max_tokens: 800,
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Mistral API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

const report = [`# Rapport de validation éditoriale — LPMV PWA\n`, `*Généré le ${new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })} via Mistral ${MODEL}*\n`];

console.log(`\n🍷 Validation éditoriale — ${FILES_TO_VALIDATE.length} fichiers\n`);

for (const filename of FILES_TO_VALIDATE) {
  const filepath = join(CONTENT_DIR, filename);
  let fileContent;
  try {
    fileContent = readFileSync(filepath, "utf8");
  } catch {
    console.warn(`  ⚠ ${filename} — non trouvé, ignoré`);
    report.push(`## ${filename}\n\n*Fichier non trouvé.*\n`);
    continue;
  }

  process.stdout.write(`  Analyse ${filename}...`);
  try {
    const result = await validateFile(filename, fileContent);
    report.push(`## ${filename}\n\n${result}\n`);
    console.log(" ✓");
  } catch (err) {
    console.log(` ✗ erreur: ${err.message}`);
    report.push(`## ${filename}\n\n*Erreur lors de l'analyse : ${err.message}*\n`);
  }

  // Pause légère pour respecter les rate limits
  await new Promise((r) => setTimeout(r, 800));
}

// Écriture du rapport
mkdirSync(join(ROOT, "docs"), { recursive: true });
const outPath = join(ROOT, "docs", "content-validation-report.md");
writeFileSync(outPath, report.join("\n---\n\n"), "utf8");

console.log(`\n✅ Rapport écrit dans docs/content-validation-report.md\n`);
