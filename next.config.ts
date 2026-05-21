import type { NextConfig } from "next";

/**
 * CAPACITOR_BUILD=1  → export statique pour le bundle Capacitor (iOS/Android)
 *   - Route Handlers exclus (webhook Stripe tourne sur Vercel uniquement)
 *   - Images non-optimisées (pas de serveur Next)
 *   - trailingSlash pour la navigation dans WebView
 *
 * Normal (pas CAPACITOR_BUILD) → build Next.js classique pour Vercel
 *   - Route Handlers inclus (webhook Stripe actif)
 *   - Optimisation images active
 */
const isCapacitorBuild = process.env.CAPACITOR_BUILD === "1";

const nextConfig: NextConfig = {
  ...(isCapacitorBuild && {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
