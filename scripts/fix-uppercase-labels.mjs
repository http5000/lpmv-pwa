/**
 * fix-uppercase-labels.mjs
 * Replaces AI-editorial uppercase-tracked labels with italic serif labels
 * across all module pages (one-shot migration script, safe to re-run).
 */
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function walk(dir, acc = []) {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, f.name);
    if (f.isDirectory() && f.name !== "node_modules" && f.name !== ".next") {
      walk(full, acc);
    } else if (f.isFile() && f.name.endsWith(".tsx")) {
      acc.push(full);
    }
  }
  return acc;
}

// Each pair: [exact string to find, replacement]
const REPLACEMENTS = [
  // Module counter / section labels — or color (most common)
  [
    "font-serif text-[10px] uppercase tracking-[0.3em] text-or",
    "font-serif text-sm italic text-champetre",
  ],
  // Intro kickers — or color (stronger, 0.4em)
  [
    "font-serif text-[10px] uppercase tracking-[0.4em] text-or",
    "font-serif text-sm italic text-or",
  ],
  // Nav prev/next mini labels
  [
    "text-[10px] uppercase tracking-wider text-champetre",
    "font-serif text-xs italic text-champetre",
  ],
  // Fine tracking variants
  [
    "font-serif text-[10px] uppercase tracking-[0.25em] text-champetre",
    "font-serif text-xs italic text-champetre",
  ],
  [
    "font-serif text-[10px] uppercase tracking-[0.25em] text-or",
    "font-serif text-xs italic text-or",
  ],
  // Badge/pill — aubergine text (sols page)
  [
    "font-serif text-[10px] uppercase tracking-[0.3em] text-aubergine",
    "font-serif text-xs text-aubergine",
  ],
];

const files = walk(join(ROOT, "src", "app"));
let totalFiles = 0;
let totalChanges = 0;

for (const file of files) {
  const original = readFileSync(file, "utf8");
  let content = original;

  for (const [from, to] of REPLACEMENTS) {
    let idx = content.indexOf(from);
    while (idx !== -1) {
      content = content.slice(0, idx) + to + content.slice(idx + from.length);
      totalChanges++;
      idx = content.indexOf(from, idx + to.length);
    }
  }

  if (content !== original) {
    writeFileSync(file, content, "utf8");
    totalFiles++;
    console.log(`  ✓ ${file.replace(ROOT, "").replace(/\\/g, "/")}`);
  }
}

console.log(`\nDone. ${totalFiles} files modified, ${totalChanges} replacements.`);
