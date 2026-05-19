// Tooling local pour piloter le projet Supabase via l'API Management.
// Usage : node scripts/supabase-admin.mjs <command> [args...]
// Commands :
//   query <sqlFile>                         Exécute un fichier SQL
//   get-auth                                Affiche la config auth actuelle
//   set-auth <siteUrl> <redirectUrls,...>   Met à jour site_url + uri_allow_list
//
// Lit SUPABASE_ACCESS_TOKEN depuis .env.local (à la racine du repo). Le PAT
// reste sur la machine, n'est jamais commité ni envoyé à Vercel.
//
// Project ref dérivé de NEXT_PUBLIC_SUPABASE_URL (hgijgsjawkoxfmyecqxe.supabase.co).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const envPath = path.join(repoRoot, ".env.local");

function loadEnv() {
  const text = fs.readFileSync(envPath, "utf8");
  const env = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/i);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    env[m[1]] = v;
  }
  return env;
}

function projectRefFromUrl(url) {
  const m = url?.match(/^https?:\/\/([a-z0-9]+)\.supabase\.co/);
  if (!m) throw new Error(`Cannot derive project ref from URL: ${url}`);
  return m[1];
}

async function api(method, pathSuffix, token, body) {
  const url = `https://api.supabase.com${pathSuffix}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let parsed;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = text;
  }
  if (!res.ok) {
    const err = new Error(`${method} ${pathSuffix} → ${res.status} ${res.statusText}`);
    err.body = parsed;
    throw err;
  }
  return parsed;
}

const env = loadEnv();
const token = env.SUPABASE_ACCESS_TOKEN;
if (!token) {
  console.error("SUPABASE_ACCESS_TOKEN manquant dans .env.local");
  process.exit(1);
}
const ref = projectRefFromUrl(env.NEXT_PUBLIC_SUPABASE_URL);

const [, , cmd, ...rest] = process.argv;

try {
  switch (cmd) {
    case "query": {
      const file = rest[0];
      if (!file) throw new Error("Usage: query <sqlFile>");
      const sql = fs.readFileSync(file, "utf8");
      const out = await api("POST", `/v1/projects/${ref}/database/query`, token, { query: sql });
      console.log(JSON.stringify(out, null, 2));
      break;
    }
    case "get-auth": {
      const out = await api("GET", `/v1/projects/${ref}/config/auth`, token);
      console.log(JSON.stringify(out, null, 2));
      break;
    }
    case "set-auth": {
      const siteUrl = rest[0];
      const redirectUrls = rest[1];
      if (!siteUrl || !redirectUrls) throw new Error("Usage: set-auth <siteUrl> <redirectUrls,csv>");
      const body = { site_url: siteUrl, uri_allow_list: redirectUrls };
      const out = await api("PATCH", `/v1/projects/${ref}/config/auth`, token, body);
      console.log(JSON.stringify(out, null, 2));
      break;
    }
    default:
      console.error("Unknown command. See header comment for usage.");
      process.exit(1);
  }
} catch (e) {
  console.error(e.message);
  if (e.body) console.error(JSON.stringify(e.body, null, 2));
  process.exit(2);
}
