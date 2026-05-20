# Product

## Register

brand

## Users

Un visiteur du **Petit Musée du Vin** à Beaune, juste sorti ou rentré chez lui, qui veut prolonger ce qu'il vient d'apprendre. Pas un sommelier, pas un débutant complet : un curieux qui a vu un déclic dans la bouteille. Il consulte l'app sur son smartphone, debout dans le musée ou affalé sur son canapé, entre deux gorgées. Il a 5 à 15 minutes, pas une heure. Il ne révise pas pour un examen, il flâne.

Contexte d'usage : mobile vertical, lumière chaude (cave, fin d'après-midi, table), une main libre. La PWA peut être installée sur l'écran d'accueil pour redevenir un rituel.

## Product Purpose

Prolonger la visite du musée physique avec 16 modules pédagogiques répartis en 5 chapitres (Terroir, Vigne, Cycle, Vinification, Dégustation). L'app n'enseigne pas frontalement : elle propose un parcours d'apprenti, où chaque module est une petite expérience interactive (carte, slot-machine, swipe quiz, parcours, roue aromatique). Le carnet de dégustation cloud-synced devient le journal personnel de l'utilisateur, mémoire des bouteilles essayées.

Succès = le visiteur revient régulièrement (PWA installée), construit un carnet de dégustations qui ressemble à lui, parle de l'app à ses amis amateurs de vin.

## Brand Personality

Trois mots : **chaleureux, érudit, contemplatif**. La voix est celle d'un vieux vigneron-mentor — il sait beaucoup, il prend son temps, il ne te juge jamais. Il préfère une métaphore juste à une définition précise. Le ton emprunte au manuel de terrain artisanal plus qu'au cours magistral, à la conversation au coin du feu plus qu'au tutoriel YouTube.

L'app respecte le musée physique — elle est son prolongement, jamais son substitut. Voir CLAUDE.md §1 (interdiction de dénigrer la borne).

## Anti-references

- ❌ **Landing page SaaS éditoriale-magazine 2025** : display serif italique + uppercase tracked labels + 3 colonnes séparées par rules + monochrome cream. C'est la pente naturelle de notre stack typo actuelle (Cormorant + Josefin sur cream), et c'est exactement le second-order AI reflex qu'on doit éviter.
- ❌ **Tutorial app gamifiée** style Duolingo / Brilliant : streaks, badges, XP, points, progress bars criardes. L'apprenti vin n'a pas besoin de récompenses extrinsèques.
- ❌ **Cellier de luxe parisien chic** : tout en noir et or, fonts vénitiens, atmosphère de palace. On parle à des curieux de Bourgogne, pas à des collectionneurs.
- ❌ **App neutre tech-first** : Inter + cards + dashboard pattern. Ça gâche la chaleur du musée.
- ❌ **Sketch enfantin / illustration plate à la Notion** : la matière du vin demande de la densité visuelle (terroir, vigne, geste), pas des stickers vectoriels.

## Design Principles

1. **Le carnet est sacré.** Aucune suppression sans confirmation explicite à deux clics. Le contenu user ne disparaît jamais sans action volontaire. Cette règle prime sur tout le reste.
2. **L'app prolonge, ne remplace jamais le musée.** Aucun texte UI ne suggère que l'app rend la borne obsolète. Reformuler en invitation, pas en substitution.
3. **Manuel de terrain, pas magazine.** Quand on doit choisir entre élégance distante et chaleur tactile, la chaleur gagne. Une page LPMV doit donner envie de la garder en main, pas de la photographier pour Instagram.
4. **Le geste plutôt que la définition.** Préférer montrer (carte interactive, roue qui tourne, swipe) à dire. Chaque module est une expérience, pas un article.
5. **Lent vaut mieux que dense.** Mieux vaut 5 minutes mémorables que 30 minutes oubliées. Spacing généreux, transitions posées, pas de scroll vertical infini.

## Accessibility & Inclusion

- **WCAG AA** minimum pour le contraste texte (l'aubergine #310E31 sur cream #FAF6EC dépasse AA, vérifier toutes les variantes soft).
- Cibles tactiles ≥44px (mobile-first).
- Respecter `prefers-reduced-motion` : disable parallax, raccourcir transitions.
- Lecture monoculaire et daltonisme : ne jamais coder une info uniquement par la couleur (les chapitres ont déjà un emoji + un texte + un accent — OK).
- Lisible sous soleil direct (cave de domaine ouverte à l'extérieur) : éviter les gris trop clairs, augmenter le poids du texte secondaire si nécessaire.
- La PWA doit rester utilisable hors-ligne pour les modules consultés (cache Next, données carnet via localStorage).
