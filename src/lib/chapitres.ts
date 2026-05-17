/**
 * Structure narrative en 5 chapitres validée avec le user (2026-05-18).
 * Le parcours suggéré est chronologique mais l'apprenti peut zigzaguer.
 *
 * Chaque module pointe vers un slug. status = 'available' si codé, sinon 'coming-soon'.
 */

export type ModuleStatus = "available" | "coming-soon";

export type ChapitreModule = {
  slug: string;
  title: string;
  /** Source JSON musée correspondante (pour traçabilité). null si contenu créé from scratch. */
  sourceModule: number | null;
  status: ModuleStatus;
  /** Phrase courte qui donne envie d'y aller. */
  teaser: string;
};

export type Chapitre = {
  slug: string;
  emoji: string;
  title: string;
  subtitle: string;
  /** Phrase narrative que dit le Mentor en arrivant sur le chapitre. */
  mentorIntro: string;
  /** Couleur d'accent secondaire du chapitre (en plus du bordeaux primaire). */
  accent: string;
  modules: ChapitreModule[];
};

export const CHAPITRES: Chapitre[] = [
  {
    slug: "terroir",
    emoji: "🌍",
    title: "Terroir",
    subtitle: "Sol, climat, savoir-faire — l'équation du goût",
    mentorIntro:
      "Avant la vigne, avant le vin, il y a le sol qu'on foule. Touche-le, écoute-le. C'est lui qui décide.",
    accent: "#7A5230",
    modules: [
      {
        slug: "sols",
        title: "Voyage au cœur des sols",
        sourceModule: 1,
        status: "available",
        teaser: "Volcanique, craie, schiste… 8 sols, 8 personnalités de vin.",
      },
      {
        slug: "climat",
        title: "Le climat façonne le vin",
        sourceModule: 2,
        status: "available",
        teaser: "13 climats, 13 personnalités de vin.",
      },
      {
        slug: "roue-terroir",
        title: "Fais tourner le terroir",
        sourceModule: 3,
        status: "available",
        teaser: "Sol × climat × vigneron : 280 vins possibles, tire au sort !",
      },
    ],
  },
  {
    slug: "vigne",
    emoji: "🌿",
    title: "Vigne & Viticulture",
    subtitle: "La plante, sa santé, comment on s'en occupe",
    mentorIntro:
      "Maintenant que tu connais la terre, regarde la plante. Elle est plus maligne qu'elle n'en a l'air.",
    accent: "#4A5D3A",
    modules: [
      {
        slug: "anatomie",
        title: "Anatomie d'un pied de vigne",
        sourceModule: 4,
        status: "available",
        teaser: "Du sol au fruit, suis la sève en 6 stations.",
      },
      {
        slug: "phylloxera",
        title: "Le cousin d'Amérique",
        sourceModule: 6,
        status: "available",
        teaser: "Un puceron, 70 % du vignoble mort, un sauvetage venu d'Amérique.",
      },
      {
        slug: "bio-conventionnel",
        title: "Bio vs Conventionnel",
        sourceModule: 7,
        status: "available",
        teaser: "Swipe ← Faux / Vrai → : 8 affirmations, démêle les idées reçues.",
      },
      {
        slug: "biodynamie",
        title: "La biodynamie",
        sourceModule: 8,
        status: "available",
        teaser: "Entre ciel et terre, science ou poésie ? 8 stations pour comprendre.",
      },
    ],
  },
  {
    slug: "cycle",
    emoji: "🍂",
    title: "Cycle de la vigne",
    subtitle: "Une année dans les rangs, saison par saison",
    mentorIntro:
      "Le vigneron ne dort jamais vraiment. Suis-le sur douze mois, du sécateur à la cuve.",
    accent: "#8B6914",
    modules: [
      {
        slug: "hiver",
        title: "Hiver — la taille",
        sourceModule: null,
        status: "coming-soon",
        teaser: "Le geste qui décide de la récolte avant même qu'elle ne soit née.",
      },
      {
        slug: "printemps",
        title: "Printemps — le débourrement",
        sourceModule: null,
        status: "coming-soon",
        teaser: "La vigne se réveille. Tout peut encore basculer.",
      },
      {
        slug: "ete",
        title: "Été — la véraison",
        sourceModule: null,
        status: "coming-soon",
        teaser: "Le raisin change de couleur. Le compte à rebours commence.",
      },
      {
        slug: "automne",
        title: "Automne — la vendange",
        sourceModule: null,
        status: "coming-soon",
        teaser: "Le jour J. Quand cueille-t-on ? Pas trop tôt, surtout pas trop tard.",
      },
    ],
  },
  {
    slug: "vinification",
    emoji: "🍷",
    title: "Vinification",
    subtitle: "Du raisin au vin, les choix qui font la différence",
    mentorIntro:
      "Le raisin est arrivé. Maintenant, mille décisions. Chacune sculpte le vin que tu boiras.",
    accent: "#7A1F2B",
    modules: [
      {
        slug: "du-raisin-au-vin",
        title: "Du raisin au vin",
        sourceModule: 9,
        status: "available",
        teaser: "Rouge, blanc, rosé, orange : 4 chemins depuis la même grappe.",
      },
      {
        slug: "choix-du-vigneron",
        title: "Les choix du vigneron",
        sourceModule: 10,
        status: "available",
        teaser: "7 décisions de cave qui sculptent ton vin.",
      },
      {
        slug: "champagne",
        title: "Assemble ton Champagne",
        sourceModule: 13,
        status: "available",
        teaser: "Pinot, Meunier, Chardonnay : entre dans la cave du chef de cave.",
      },
    ],
  },
  {
    slug: "degustation",
    emoji: "👃",
    title: "Dégustation",
    subtitle: "Apprendre à goûter — et garder trace",
    mentorIntro:
      "Tout ce que tu as appris se retrouve dans le verre. Sens, observe, dis-le avec tes mots.",
    accent: "#6B2A4C",
    modules: [
      {
        slug: "catalogue",
        title: "Le catalogue des vins du musée",
        sourceModule: 13,
        status: "coming-soon",
        teaser: "13 vins, 8 styles. Trouve celui qui te parle.",
      },
      {
        slug: "carnet",
        title: "Ton carnet de cave",
        sourceModule: null,
        status: "coming-soon",
        teaser: "Note ce que tu goûtes. L'app apprend ton palais.",
      },
    ],
  },
];

export function getChapitreBySlug(slug: string): Chapitre | undefined {
  return CHAPITRES.find((c) => c.slug === slug);
}
