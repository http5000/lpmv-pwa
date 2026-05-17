/**
 * Carte de France métropolitaine — contour réel issu du GeoJSON
 * gregoiredavid/france-geojson (CC BY-SA), projeté en équirectangulaire
 * corrigé pour la latitude (~46°N).
 *
 * SVG asset : /public/maps/france-metro.svg
 * Régénération si besoin : `node scripts/geojson-to-svg.mjs public/maps/france-metro.svg`
 *
 * Affiché en simple <img> pour que le CSS/layout reste prévisible.
 * Les hotspots des sols sont positionnés en absolute par-dessus le conteneur parent.
 */
export function FranceSilhouette({ className = "" }: { className?: string }) {
  return (
    <img
      src="/maps/france-metro.svg"
      alt="Carte de France métropolitaine"
      width={400}
      height={400}
      className={className}
      draggable={false}
      style={{
        // Empêche la sélection accidentelle sur tap mobile
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    />
  );
}

/**
 * Positions calculées par scripts/geojson-to-svg.mjs (en % du viewBox 0 0 100 100),
 * basées sur les coordonnées géographiques réelles des régions viticoles
 * emblématiques de chaque sol.
 */
export const SOL_REGION_POSITIONS: Record<
  string,
  { x: number; y: number; region: string }
> = {
  "1": { x: 53.15, y: 58.96, region: "Auvergne" },                  // Volcanique
  "2": { x: 24.75, y: 40.61, region: "Loire • Muscadet" },          // Sable / Limons
  "3": { x: 34.11, y: 62.83, region: "Bordeaux • Saint-Émilion" },  // Argile-calcaire
  "4": { x: 55.16, y: 84.56, region: "Roussillon • Banyuls" },      // Schiste
  "5": { x: 61.84, y: 20.80, region: "Champagne" },                 // Craie
  "6": { x: 66.19, y: 50.27, region: "Beaujolais • Morgon" },       // Granite
  "7": { x: 67.39, y: 70.94, region: "Châteauneuf-du-Pape" },       // Graviers / Galets
  "8": { x: 73.74, y: 79.93, region: "Provence • Bandol" },         // Argile rouge
};
