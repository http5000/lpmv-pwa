/**
 * generate-icons.mjs
 * Génère les icônes PWA 192×192 et 512×512 depuis le logo SVG officiel.
 *
 * - Fond : aubergine #310E31 (couleur signature musée, theme_color du manifest)
 * - Logo : blanc (original logo-lpmv.svg) centré, 75 % de la largeur de l'icône
 * - Output : public/icons/icon-192.png et public/icons/icon-512.png
 *
 * Usage : node scripts/generate-icons.mjs
 */

import sharp from "sharp";
import { readFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// Source : logo officiel blanc sur fond transparent
const svgPath = join(ROOT, "public", "logo-lpmv.svg");
const outDir = join(ROOT, "public", "icons");

// Couleur de fond : aubergine officielle du musée
const AUBERGINE = { r: 49, g: 14, b: 49, alpha: 1 };

const SIZES = [192, 512];
// Le logo occupe 75 % de la largeur de l'icône, centré verticalement
const LOGO_RATIO = 0.75;

mkdirSync(outDir, { recursive: true });

const svgBuffer = readFileSync(svgPath);

for (const size of SIZES) {
  const logoWidth = Math.round(size * LOGO_RATIO);

  // 1. Redimensionner le SVG à logoWidth (hauteur calculée automatiquement)
  const logoBuffer = await sharp(svgBuffer)
    .resize(logoWidth)
    .png()
    .toBuffer();

  // 2. Obtenir les dimensions réelles du logo redimensionné
  const { width: lw, height: lh } = await sharp(logoBuffer).metadata();

  // 3. Créer le fond aubergine
  const background = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: AUBERGINE,
    },
  })
    .png()
    .toBuffer();

  // 4. Composer : logo centré sur le fond
  const left = Math.round((size - lw) / 2);
  const top = Math.round((size - lh) / 2);

  const outPath = join(outDir, `icon-${size}.png`);

  await sharp(background)
    .composite([{ input: logoBuffer, left, top }])
    .png()
    .toFile(outPath);

  console.log(`✓ ${outPath}  (logo ${lw}×${lh} px centré sur fond ${size}×${size})`);
}

console.log("\nDone. Icônes disponibles dans public/icons/");
