import { BrandMark } from "./BrandMark";
import { Breadcrumb } from "./Breadcrumb";

type Crumb = { label: string; href?: string };

/**
 * Header commun à toutes les pages "intérieures" de l'app.
 * - BrandMark à gauche (retour accueil)
 * - Breadcrumb sous le brand pour situer
 */
export function AppHeader({ crumbs }: { crumbs?: Crumb[] }) {
  return (
    <header className="sticky top-0 z-20 border-b border-cream-dark bg-cream/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-screen-sm flex-col gap-2 px-5 py-3">
        <BrandMark />
        {crumbs && crumbs.length > 0 && <Breadcrumb items={crumbs} />}
      </div>
    </header>
  );
}
