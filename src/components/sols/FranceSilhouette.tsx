/**
 * Silhouette stylisée de la France (forme hexagonale arrondie).
 * Pas une carte géographique précise — un "ancrage visuel" lisible.
 * Pour le polish v2 : remplacer par une vraie carte SVG (e.g. France-OFC ou tracé NaturalEarth simplifié).
 */
export function FranceSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        {/* Légère texture papier pour l'effet "carte d'atlas" */}
        <filter id="paper-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
          <feColorMatrix
            values="0 0 0 0 0.2
                    0 0 0 0 0.06
                    0 0 0 0 0.2
                    0 0 0 0.06 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <path
        d="
          M 68 6
          C 60 4 50 4 42 8
          C 33 11 26 14 19 22
          C 13 30 10 40 11 51
          C 13 60 14 67 19 72
          C 16 79 22 88 30 91
          C 39 94 49 95 59 92
          C 70 90 77 86 81 80
          C 86 70 88 60 86 50
          C 88 42 90 33 85 24
          C 80 15 74 9 68 6 Z
        "
        fill="var(--color-cream-light)"
        stroke="var(--color-aubergine)"
        strokeWidth="0.6"
        strokeOpacity="0.45"
        strokeDasharray="0.8 0.8"
      />
      <path
        d="
          M 68 6
          C 60 4 50 4 42 8
          C 33 11 26 14 19 22
          C 13 30 10 40 11 51
          C 13 60 14 67 19 72
          C 16 79 22 88 30 91
          C 39 94 49 95 59 92
          C 70 90 77 86 81 80
          C 86 70 88 60 86 50
          C 88 42 90 33 85 24
          C 80 15 74 9 68 6 Z
        "
        fill="transparent"
        filter="url(#paper-grain)"
        opacity="0.6"
      />
    </svg>
  );
}

/** Positions approximatives des régions viticoles (sur viewBox 0 0 100 100). */
export const SOL_REGION_POSITIONS: Record<string, { x: number; y: number; region: string }> = {
  "1": { x: 49, y: 58, region: "Auvergne" },                   // Volcanique
  "2": { x: 36, y: 44, region: "Loire" },                      // Sable / Limons
  "3": { x: 28, y: 62, region: "Bordeaux • Saint-Émilion" },   // Argile-calcaire
  "4": { x: 53, y: 84, region: "Roussillon" },                 // Schiste
  "5": { x: 67, y: 22, region: "Champagne" },                  // Craie
  "6": { x: 64, y: 54, region: "Beaujolais" },                 // Granite
  "7": { x: 71, y: 70, region: "Châteauneuf-du-Pape" },        // Graviers / Galets
  "8": { x: 78, y: 80, region: "Provence • Bandol" },          // Argile rouge
};
