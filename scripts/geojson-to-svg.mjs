// Convert a GeoJSON MultiPolygon of metropolitan France into a single-path SVG.
// Project lng/lat to a Mercator-ish flat coord, normalize to viewBox 0 0 100 100.
import { readFileSync, writeFileSync } from "node:fs";

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const geo = JSON.parse(readFileSync(join(__dirname, "france.geojson"), "utf8"));
const polys = geo.geometry.coordinates; // MultiPolygon = array of polygons

// Collect every (lng, lat) to find bounds.
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
for (const poly of polys) {
  for (const ring of poly) {
    for (const [lng, lat] of ring) {
      if (lng < minX) minX = lng;
      if (lng > maxX) maxX = lng;
      if (lat < minY) minY = lat;
      if (lat > maxY) maxY = lat;
    }
  }
}
const dx = maxX - minX;
const dy = maxY - minY;

// Equirectangular projection corrected for latitude.
// At lat L, 1° lng ≈ cos(L) × 1° lat in real distance.
// To preserve aspect ratio: scaleX_lng = scaleY_lat × cos(L).
const cosLat = Math.cos(((minY + maxY) / 2) * Math.PI / 180);
const kmDx = dx * cosLat; // "equivalent" lng span in lat-equivalent km units
const fit = 0.98 * Math.min(100 / kmDx, 100 / dy);
const scaleY = fit; // px per 1° lat
const scaleX = fit * cosLat; // px per 1° lng

const width = dx * scaleX;
const height = dy * scaleY;
const offsetX = (100 - width) / 2;
const offsetY = (100 - height) / 2;

function project(lng, lat) {
  const x = (lng - minX) * scaleX + offsetX;
  // Flip Y (SVG y-axis is inverted relative to lat)
  const y = (maxY - lat) * scaleY + offsetY;
  return [x.toFixed(2), y.toFixed(2)];
}

// Helper: also project the sol regions and log them, so we can update FranceSilhouette.tsx
const SOLS = {
  "1 Volcanique (Auvergne)":     [2.7, 45.3],
  "2 Sable (Loire)":             [-1.55, 47.2],
  "3 Argile-calc (Bordeaux)":    [-0.15, 44.9],
  "4 Schiste (Roussillon)":      [3.0, 42.65],
  "5 Craie (Champagne)":         [4.0, 49.25],
  "6 Granite (Beaujolais)":      [4.65, 46.2],
  "7 Graviers (Châteauneuf)":    [4.83, 44.06],
  "8 Argile rouge (Provence)":   [5.78, 43.13],
};
console.log("Sol positions in viewBox 0 0 100 100:");
for (const [name, [lng, lat]] of Object.entries(SOLS)) {
  const [x, y] = project(lng, lat);
  console.log(`  ${name}: x=${x} y=${y}`);
}

const paths = [];
for (const poly of polys) {
  for (const ring of poly) {
    const points = ring.map(([lng, lat]) => project(lng, lat));
    const [x0, y0] = points[0];
    let d = `M${x0},${y0}`;
    for (let i = 1; i < points.length; i++) {
      d += `L${points[i][0]},${points[i][1]}`;
    }
    d += "Z";
    paths.push(d);
  }
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
  <path d="${paths.join(" ")}" fill="currentColor" />
</svg>
`;

writeFileSync(process.argv[2] ?? "/tmp/france-out.svg", svg);
console.log(`Wrote ${svg.length} bytes. Bounds: lng [${minX.toFixed(2)}, ${maxX.toFixed(2)}], lat [${minY.toFixed(2)}, ${maxY.toFixed(2)}]`);
