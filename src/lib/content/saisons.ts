/**
 * Cycle de la vigne — contenu NEW rédigé depuis les connaissances viticoles standard
 * (taille hivernale, débourrement printanier, véraison estivale, vendange automnale).
 *
 * À FAIRE relire/valider par le user, qui a délégué la première écriture.
 * Cf. memory/project_lpmv_pwa.md (session autonome 2026-05-18).
 */

export type Saison = {
  slug: string;
  emoji: string;
  /** Numéro d'ordre (1 = Hiver pour démarrer le cycle de la sève) */
  order: number;
  name: string;
  /** Période en mois — phrase courte */
  period: string;
  /** Phrase poétique en italique (sous-titre) */
  tagline: string;
  /** Couleur d'accent par saison */
  accent: string;
  /** Ce que fait la vigne (botanique) */
  vine: { title: string; description: string };
  /** Ce que fait le vigneron (travaux/décisions clés) */
  vigneron: { title: string; tasks: { title: string; description: string }[] };
  /** Une technique ou un moment-clé à zoomer */
  focus: { title: string; description: string };
  /** Menaces de la saison */
  threats: { title: string; items: string[] };
  /** Anecdote / le saviez-vous */
  didYouKnow: string;
};

export const SAISONS: Saison[] = [
  // ---------- HIVER ----------
  {
    slug: "hiver",
    emoji: "❄️",
    order: 1,
    name: "Hiver",
    period: "décembre → février",
    tagline: "« La vigne dort, mais le vigneron décide. »",
    accent: "#310E31", /* aubergine — hiver : dormance, profondeur */
    vine: {
      title: "La vigne au repos",
      description:
        "La sève redescend dans les racines. La plante semble morte, mais elle reconstitue ses réserves et prépare en silence les bourgeons qui s'éveilleront au printemps. Le bois est dur, les sarments encore accrochés.",
    },
    vigneron: {
      title: "Le geste qui sculpte la récolte",
      tasks: [
        {
          title: "La taille",
          description:
            "Le travail le plus important de l'année. En coupant le bois de l'an passé, le vigneron décide combien de bourgeons (et donc combien de grappes) la vigne portera. Trop de bourgeons : la vigne s'épuise et dilue ses raisins. Trop peu : on rate la récolte.",
        },
        {
          title: "Brûlage ou broyage des sarments",
          description:
            "Les sarments coupés sont souvent broyés pour enrichir le sol en matière organique. Le brûlage, image emblématique de l'hiver viticole, est interdit dans de nombreuses régions pour des raisons environnementales.",
        },
        {
          title: "Plantation des jeunes ceps",
          description:
            "C'est aussi la saison pour planter de nouvelles vignes — la terre est meuble, la plante dormante supporte le voyage.",
        },
      ],
    },
    focus: {
      title: "Les écoles de taille",
      description:
        "Guyot (un long sarment fructifère + un courson de réserve), Cordon de Royat (un bras horizontal permanent avec coursons), Gobelet (cep en forme de coupe, sans palissage)… Chaque appellation a sa tradition, validée par le cahier des charges AOP.",
    },
    threats: {
      title: "Les risques",
      items: [
        "Gel hivernal sévère (< -15°C) qui peut endommager le tronc",
        "Maladies du bois latentes (esca, eutypiose) — fléaux qui montent",
        "Sangliers et chevreuils qui broutent les jeunes ceps",
      ],
    },
    didYouKnow:
      "Dans certains domaines, la taille commence dès novembre et s'étire jusqu'en mars. Un bon tailleur, à la main, traite environ 200 à 400 ceps par jour. Sur un hectare planté à 7 000 ceps, cela représente 15 à 25 jours de travail pour une seule personne.",
  },

  // ---------- PRINTEMPS ----------
  {
    slug: "printemps",
    emoji: "🌱",
    order: 2,
    name: "Printemps",
    period: "mars → mai",
    tagline: "« La vigne se réveille — tout peut encore basculer. »",
    accent: "#C6A15B", /* champetre — printemps : éveil terreux */
    vine: {
      title: "Le réveil de la sève",
      description:
        "Mi-mars : la sève remonte et perle au bout des sarments fraîchement taillés — on appelle ça « les pleurs de la vigne ». Puis vient le débourrement : les bourgeons éclatent en bourre cotonneuse. Premières feuilles, puis croissance rapide. Vers mi-mai-juin : la floraison, des minuscules fleurs blanches discrètes.",
    },
    vigneron: {
      title: "Sculpter la croissance",
      tasks: [
        {
          title: "Ébourgeonnage",
          description:
            "Suppression des jeunes pousses inutiles (gourmands) pour concentrer l'énergie de la vigne sur les sarments fructifères choisis à la taille.",
        },
        {
          title: "Palissage et relevage",
          description:
            "À mesure que les sarments grandissent, on les attache aux fils tendus entre les piquets pour les redresser. La vigne devient un mur de verdure organisé.",
        },
        {
          title: "Premiers traitements préventifs",
          description:
            "Bouillie bordelaise (cuivre) contre le mildiou, soufre contre l'oïdium. En bio comme en conventionnel, on agit dès les premières feuilles — c'est la course contre les maladies.",
        },
      ],
    },
    focus: {
      title: "La floraison décide tout",
      description:
        "10 à 15 jours en mai-juin. Si le temps est beau, la fleur « noue » bien : chaque fleur devient une baie. Mauvais temps = coulure (fleurs qui tombent) ou millerandage (baies de tailles inégales). Le rendement de l'année se joue ici.",
    },
    threats: {
      title: "Les risques",
      items: [
        "Gelée tardive (avril « mois cruel ») — peut détruire les jeunes bourgeons en une nuit",
        "Grêle — locale et imprévisible, peut anéantir une parcelle en 10 minutes",
        "Coulure si la météo est pourrie pendant la floraison",
      ],
    },
    didYouKnow:
      "Lors d'une nuit de gel, les vignerons allument des bougies entre les rangs, des chaufferettes à fioul, ou aspergent la vigne d'eau (la glace qui se forme protège paradoxalement le bourgeon). Certains domaines louent un hélicoptère pour brasser l'air et casser l'inversion thermique.",
  },

  // ---------- ÉTÉ ----------
  {
    slug: "ete",
    emoji: "☀️",
    order: 3,
    name: "Été",
    period: "juin → août",
    tagline: "« Le raisin change de couleur — le compte à rebours commence. »",
    accent: "#CA9A2F", /* or — été : chaleur, soleil */
    vine: {
      title: "De la fleur à la baie mûre",
      description:
        "Après la nouaison (fleurs devenues baies), les grappes grossissent. Vers mi-juillet à mi-août : la véraison — le raisin change de couleur, devient violet pour les rouges, doré pour les blancs. À partir de ce moment, la baie ne grandit plus : elle accumule sucres et arômes, et perd son acidité.",
    },
    vigneron: {
      title: "Affiner et contrôler",
      tasks: [
        {
          title: "Rognage et écimage",
          description:
            "Couper le bout des rameaux qui s'étendent trop pour éviter qu'ils ne fassent de l'ombre aux grappes et n'épuisent la vigne en croissance végétative.",
        },
        {
          title: "Effeuillage",
          description:
            "Enlever quelques feuilles autour des grappes pour mieux les exposer au soleil et au vent (meilleure maturité, moins de maladies).",
        },
        {
          title: "Vendanges en vert",
          description:
            "Couper et jeter au sol une partie des grappes pas encore mûres, pour concentrer l'énergie de la vigne sur les grappes restantes. Un geste cher : on jette parfois 30 % de la récolte pour gagner en qualité.",
        },
        {
          title: "Contrôles de maturité",
          description:
            "À partir d'août : prélèvements réguliers de baies pour mesurer sucre, acidité, polyphénols. C'est ce qui dira quand vendanger.",
        },
      ],
    },
    focus: {
      title: "La véraison",
      description:
        "Le moment magique où le raisin bascule. Avant : vert, dur, acide, sans sucre. Après : il s'illumine, se ramollit, gonfle en sucre. C'est aussi le point de départ des 35 à 45 jours qui mènent à la vendange.",
    },
    threats: {
      title: "Les risques",
      items: [
        "Canicule et stress hydrique — la vigne bloque sa maturation",
        "Mildiou, oïdium, black rot — toujours en surveillance",
        "Botrytis (pourriture grise) si pluies en fin d'été — perte rapide",
        "Insectes : cicadelles (vecteurs de flavescence dorée), eudémis (ver de la grappe)",
      ],
    },
    didYouKnow:
      "Une vigne adulte transpire jusqu'à 30 à 50 litres d'eau par jour en pleine chaleur. Quand le stress hydrique est trop fort, elle ferme ses stomates, arrête la photosynthèse et… bloque la maturation. Le raisin reste vert. Certains terroirs (sols filtrants comme les galets de Châteauneuf) gèrent mieux ce stress.",
  },

  // ---------- AUTOMNE ----------
  {
    slug: "automne",
    emoji: "🍇",
    order: 4,
    name: "Automne",
    period: "septembre → novembre",
    tagline: "« Le jour J — ni trop tôt, surtout pas trop tard. »",
    accent: "#CB9966", /* sable — automne : vendange ambrée */
    vine: {
      title: "L'apogée — puis le retour au repos",
      description:
        "Les raisins atteignent leur maturité optimale : équilibre sucre/acidité, polyphénols mûrs. Après la vendange, la vigne change de feuille (rouge, jaune, dorée) puis les perd. La sève redescend dans les racines. Le cycle est bouclé.",
    },
    vigneron: {
      title: "Le sprint final",
      tasks: [
        {
          title: "Le ban des vendanges",
          description:
            "Date officielle fixée par les syndicats locaux de chaque appellation, après mesures de maturité sur les parcelles. L'INAO valide le cadre des AOC. Avant cette date, interdit de vendanger (sauf cuvées spéciales).",
        },
        {
          title: "Choisir le moment exact",
          description:
            "Trop tôt : vin acide et léger. Trop tard : sucre trop fort, acidité écrasée, risque de pourriture. C'est la décision la plus délicate de l'année.",
        },
        {
          title: "Vendanger : main ou machine",
          description:
            "Manuel : tri parcelle par parcelle, sélection des grappes. Mécanique : rapide, possible de nuit (raisin frais), mais pas de tri à la grappe. Certains AOC imposent encore la main.",
        },
        {
          title: "Préparer le sol pour l'hiver",
          description:
            "Apport de compost, semis d'engrais verts entre les rangs, travail mécanique du sol selon le mode de viticulture.",
        },
      ],
    },
    focus: {
      title: "Quand faut-il vendanger ?",
      description:
        "Plus tôt : vin frais, vif, peu d'alcool — style \"vin de soif\". Plus tard : vin riche, ample, alcooleux, parfois confituré — style \"vin de garde\". Le vigneron arbitre selon son style, l'appellation, le millésime, parfois en plusieurs passages (vendanges tardives, sélections de grains nobles…).",
    },
    threats: {
      title: "Les risques",
      items: [
        "Pluies prolongées en septembre — dilution du jus, pourriture",
        "Coup de chaud tardif — sucres qui s'envolent, acidité qui plonge",
        "Vendanges trop précoces ou trop tardives — décision impossible à reprendre",
      ],
    },
    didYouKnow:
      "Le mot « vendange » vient du latin « vindemia » (vin + emporter). En Champagne, le « ban des vendanges » est encore aujourd'hui décidé par village, après tournée des parcelles par une commission. C'est l'un des derniers vestiges des traditions médiévales encore vivantes en viticulture.",
  },
];

export function getSaisonsContent() {
  return { saisons: SAISONS };
}

export function getSaisonBySlug(slug: string): Saison | undefined {
  return SAISONS.find((s) => s.slug === slug);
}
