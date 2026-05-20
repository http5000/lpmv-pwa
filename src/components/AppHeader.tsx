import { BrandMark } from "./BrandMark";
import { Breadcrumb } from "./Breadcrumb";

type Crumb = { label: string; href?: string };

/**
 * Header commun aux pages intérieures.
 * - Logo officiel centré (aubergine sur cream)
 * - Breadcrumb centré dessous pour situer
 */
export function AppHeader({ crumbs }: { crumbs?: Crumb[] }) {
  return (
    <header className="sticky top-0 z-20 border-b border-cream-dark bg-cream/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-screen-md flex-col items-center gap-2 px-6 py-4">
        <BrandMark size="sm" />
        {crumbs && crumbs.length > 0 && <Breadcrumb items={crumbs} />}
      </div>
    </header>
  );
}
