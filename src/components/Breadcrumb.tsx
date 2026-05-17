import Link from "next/link";

type Crumb = { label: string; href?: string };

/**
 * Fil d'ariane minimal pour situer l'apprenti dans le parcours.
 * Les éléments sans href sont la position actuelle (non cliquable).
 */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-xs text-aubergine-soft">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-or hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-aubergine">
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden="true">→</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
