/**
 * Accords mets & vin.
 * Contenu rédigé from scratch (à valider/affiner avec un œil expert).
 *
 * Approche : 8 grandes familles de plats, chacune avec 3 à 5 vins suggérés
 * + justification (la règle d'accord en jeu). On ajoute aussi 4 principes
 * généraux d'accord en intro.
 */

export type Principle = {
  key: string;
  title: string;
  description: string;
};

export const PRINCIPES: Principle[] = [
  {
    key: "regional",
    title: "L'accord régional",
    description:
      "Le plus simple : un plat se marie naturellement avec un vin du même terroir. Choucroute → Alsace. Cassoulet → Sud-Ouest. Bouillabaisse → Provence. Souvent évident, rarement décevant.",
  },
  {
    key: "couleur",
    title: "L'accord par couleur du plat",
    description:
      "Plat clair / léger → vin blanc ou rouge fin. Plat sombre / corsé → rouge structuré. C'est la base, mais ça peut surprendre : un magret de canard se sublime aussi sur un blanc gras.",
  },
  {
    key: "complementarite",
    title: "L'accord par complémentarité",
    description:
      "On apporte ce qui manque au plat : un gras (fromage) appelle de l'acidité (blanc tendu) ou des tanins (rouge structuré). Un plat épicé appelle un blanc demi-sec ou un rouge fruité peu tannique.",
  },
  {
    key: "miroir",
    title: "L'accord miroir",
    description:
      "On joue les mêmes notes : un plat sucré-salé avec un vin moelleux, un plat aux fruits rouges avec un Pinot Noir bourguignon, un plat boisé/fumé avec un vin élevé en fût.",
  },
];

// ============================================================
// Catégories de plats + accords
// ============================================================

export type Wine = {
  name: string;
  /** Description courte (3-5 mots) */
  style: string;
};

export type Pairing = {
  /** Plat-exemple précis */
  dish: string;
  /** Vins recommandés (ordre de préférence) */
  wines: Wine[];
  /** Pourquoi ça marche */
  reason: string;
};

export type DishCategory = {
  key: string;
  label: string;
  emoji: string;
  /** Couleur d'accent par catégorie */
  accent: string;
  pairings: Pairing[];
};

export const DISH_CATEGORIES: DishCategory[] = [
  {
    key: "apero",
    label: "Apéritif & amuse-bouches",
    emoji: "🥂",
    accent: "#E8C860",
    pairings: [
      {
        dish: "Olives, charcuterie fine, tapenade",
        wines: [
          { name: "Champagne Brut", style: "Bulles tranchantes" },
          { name: "Crémant de Loire", style: "Frais et abordable" },
          { name: "Rosé de Provence", style: "Léger et minéral" },
        ],
        reason:
          "On veut des bulles ou un vin frais qui réveille le palais sans le saturer. L'acidité coupe le gras du saucisson et nettoie la bouche entre deux bouchées.",
      },
      {
        dish: "Plateau de fromages frais (chèvre, brebis)",
        wines: [
          { name: "Sancerre", style: "Sauvignon vif" },
          { name: "Quincy ou Reuilly", style: "Sauvignon Loire moins connu" },
          { name: "Pouilly-Fumé", style: "Minéralité fumée" },
        ],
        reason:
          "Le Sauvignon Blanc et le fromage de chèvre = mariage iconique. La vivacité du vin équilibre la rondeur lactée du fromage.",
      },
    ],
  },
  {
    key: "fruits-mer",
    label: "Fruits de mer & poisson cru",
    emoji: "🦪",
    accent: "#A0B4A8",
    pairings: [
      {
        dish: "Plateau d'huîtres",
        wines: [
          { name: "Muscadet sur lie", style: "Sel et iode" },
          { name: "Chablis", style: "Minéralité fine" },
          { name: "Champagne Blanc de Blancs", style: "Bulles minérales" },
        ],
        reason:
          "L'huître est minérale et iodée — il faut un vin blanc sec et tendu qui résonne avec ces notes. Surtout pas de vin boisé qui écraserait la subtilité.",
      },
      {
        dish: "Sushis, sashimis, ceviche",
        wines: [
          { name: "Riesling sec d'Alsace", style: "Vif et droit" },
          { name: "Sancerre", style: "Sauvignon zesté" },
          { name: "Saké junmai", style: "Hors vin, classique" },
        ],
        reason:
          "Le poisson cru demande un vin sec, légèrement aromatique mais discret. Pas de tanin (incompatible avec la chair crue), pas de bois.",
      },
    ],
  },
  {
    key: "poisson",
    label: "Poisson cuit & crustacés",
    emoji: "🐟",
    accent: "#94B0C2",
    pairings: [
      {
        dish: "Poisson grillé simple (bar, dorade)",
        wines: [
          { name: "Bourgogne Aligoté", style: "Frais et citronné" },
          { name: "Picpoul de Pinet", style: "Languedoc tendu" },
          { name: "Sancerre", style: "Référence sûre" },
        ],
        reason:
          "Un blanc sec à l'acidité franche, sans bois. Il doit accompagner sans cacher la chair délicate du poisson.",
      },
      {
        dish: "Homard, langouste, saint-jacques",
        wines: [
          { name: "Meursault", style: "Bourgogne riche et beurré" },
          { name: "Condrieu", style: "Viognier opulent et floral" },
          { name: "Champagne Blanc de Noirs", style: "Vineux et structuré" },
        ],
        reason:
          "Les crustacés nobles appellent un blanc plus ample et gras pour matcher la richesse de la chair. Un Meursault élevé en fût enrobe parfaitement la chair iodée.",
      },
    ],
  },
  {
    key: "volaille",
    label: "Volaille & viandes blanches",
    emoji: "🍗",
    accent: "#D8B47C",
    pairings: [
      {
        dish: "Poulet rôti, dinde",
        wines: [
          { name: "Bourgogne rouge village", style: "Pinot Noir souple" },
          { name: "Beaujolais (Morgon, Fleurie)", style: "Gamay gourmand" },
          { name: "Chardonnay boisé léger", style: "Si plutôt blanc" },
        ],
        reason:
          "La viande blanche tolère blanc OU rouge léger. Un Pinot Noir bourguignon est l'accord intemporel — fruit, finesse, structure modérée.",
      },
      {
        dish: "Veau à la crème, blanquette",
        wines: [
          { name: "Vouvray demi-sec", style: "Chenin tendre" },
          { name: "Meursault", style: "Bourgogne crémeux" },
          { name: "Pinot Gris d'Alsace", style: "Aromatique" },
        ],
        reason:
          "La sauce crème appelle un blanc avec un peu de rondeur, mais qui garde de l'acidité pour ne pas tomber dans le sucré-écœurant.",
      },
    ],
  },
  {
    key: "viande-rouge",
    label: "Viandes rouges & gibier",
    emoji: "🥩",
    accent: "#7A1F2B",
    pairings: [
      {
        dish: "Entrecôte grillée",
        wines: [
          { name: "Saint-Estèphe ou Pauillac", style: "Bordeaux puissant" },
          { name: "Côte-Rôtie", style: "Syrah septentrionale" },
          { name: "Cahors", style: "Malbec dense" },
        ],
        reason:
          "La viande rouge saignante appelle des tanins fermes qui se lient aux protéines de la viande. Plus la viande est saisie/grillée, plus le vin peut être tannique.",
      },
      {
        dish: "Gibier (chevreuil, sanglier, perdrix)",
        wines: [
          { name: "Châteauneuf-du-Pape", style: "Sud profond et épicé" },
          { name: "Hermitage", style: "Syrah complexe" },
          { name: "Vieux Bordeaux (10-15 ans)", style: "Patiné et complexe" },
        ],
        reason:
          "Le gibier a un goût marqué, parfois sauvage. Il faut un vin de garde évolué dont les notes tertiaires (sous-bois, cuir, truffe) résonnent avec la viande.",
      },
    ],
  },
  {
    key: "fromage",
    label: "Plateau de fromages",
    emoji: "🧀",
    accent: "#E8D8A8",
    pairings: [
      {
        dish: "Fromages à pâte molle (camembert, brie, munster)",
        wines: [
          { name: "Pinot Gris d'Alsace vendanges tardives", style: "Onctueux" },
          { name: "Vouvray demi-sec", style: "Chenin et fraîcheur" },
          { name: "Cidre brut artisanal", style: "Hors vin, classique" },
        ],
        reason:
          "Le rouge tannique sur le fromage est un piège — les tanins clashent avec le lactique. Préfère un blanc avec un peu de sucre résiduel ou un cidre.",
      },
      {
        dish: "Fromages à pâte dure (comté, beaufort, parmesan)",
        wines: [
          { name: "Vin jaune du Jura", style: "Iconique et oxydatif" },
          { name: "Bourgogne blanc évolué", style: "Chardonnay patiné" },
          { name: "Vieux Champagne", style: "Bulles patinées" },
        ],
        reason:
          "Les pâtes dures supportent bien les vins blancs complexes. Le Vin jaune sur un Comté de 24 mois est un accord régional légendaire.",
      },
      {
        dish: "Fromages bleus (roquefort, fourme, stilton)",
        wines: [
          { name: "Sauternes ou Monbazillac", style: "Liquoreux" },
          { name: "Porto Tawny 10 ans", style: "Notes de noix et caramel" },
          { name: "Maury ou Rasteau", style: "VDN du Sud" },
        ],
        reason:
          "Le sucré des liquoreux/VDN équilibre le piquant salé du bleu. C'est l'un des plus beaux accords de contrepoint qui existent.",
      },
    ],
  },
  {
    key: "asiatique",
    label: "Cuisines épicées & asiatiques",
    emoji: "🌶️",
    accent: "#D8843B",
    pairings: [
      {
        dish: "Curry indien, thaï épicé",
        wines: [
          { name: "Gewurztraminer d'Alsace", style: "Aromatique et tendre" },
          { name: "Riesling demi-sec", style: "Équilibre acide-sucre" },
          { name: "Pinot Noir frais", style: "Si rouge" },
        ],
        reason:
          "Un plat épicé brûle la langue — un vin avec un soupçon de sucre résiduel anesthésie le piquant. Surtout pas d'alcool élevé qui amplifierait la chaleur.",
      },
      {
        dish: "Cuisine chinoise (sweet & sour, canard laqué)",
        wines: [
          { name: "Riesling Spätlese", style: "Tendre et juteux" },
          { name: "Champagne Rosé", style: "Bulles vineuses" },
          { name: "Pinot Noir léger", style: "Fruit pur" },
        ],
        reason:
          "Les saveurs sucrées-salées et la sauce laquée appellent un vin gourmand et juteux. Le Riesling tendre épouse parfaitement le canard laqué.",
      },
    ],
  },
  {
    key: "dessert",
    label: "Desserts",
    emoji: "🍰",
    accent: "#D8A8C8",
    pairings: [
      {
        dish: "Tarte aux fruits rouges",
        wines: [
          { name: "Champagne Rosé Brut", style: "Bulles et fruit" },
          { name: "Maury Grenat", style: "VDN rouge sucré" },
          { name: "Cerdon du Bugey", style: "Pétillant sucré" },
        ],
        reason:
          "On joue l'accord miroir : fruits rouges du dessert = fruits rouges du vin. Le sucre du vin doit être au moins équivalent à celui du dessert.",
      },
      {
        dish: "Tarte au chocolat, fondant",
        wines: [
          { name: "Banyuls Grand Cru", style: "VDN cacao" },
          { name: "Maury", style: "Sud sucré" },
          { name: "Porto Tawny", style: "Notes torréfiées" },
        ],
        reason:
          "Le chocolat est riche, sucré, amer — il lui faut un vin muté aux notes cacao et fruits compotés. Un vin sec serait laminé.",
      },
      {
        dish: "Tarte tatin, crème brûlée",
        wines: [
          { name: "Coteaux du Layon", style: "Chenin moelleux" },
          { name: "Sauternes", style: "Botrytis classique" },
          { name: "Jurançon moelleux", style: "Sud-Ouest doré" },
        ],
        reason:
          "Caramel et pommes confites = liquoreux à base de Chenin ou Sémillon. La note de botrytis du Sauternes fait écho au caramel.",
      },
    ],
  },
];

// ============================================================
// Pièges classiques
// ============================================================

export type Trap = { title: string; explanation: string };

export const TRAPS: Trap[] = [
  {
    title: "Rouge sur fromage = pas si évident",
    explanation:
      "Les tanins du rouge réagissent avec le lactique du fromage — souvent un goût métallique en bouche. Préfère un blanc ou un vin doux sur les pâtes molles et les bleus.",
  },
  {
    title: "Vin sec sur dessert = duel perdu d'avance",
    explanation:
      "Un vin sec sur un dessert sucré paraîtra immédiatement dur, acide, agressif. Règle d'or : le vin doit être au moins aussi sucré que le dessert.",
  },
  {
    title: "Vinaigrette = ennemi du vin",
    explanation:
      "Le vinaigre tue littéralement le goût du vin. Sur une salade vinaigrée, soit on accepte de servir sans vin, soit on remplace par du jus de citron + huile d'olive.",
  },
  {
    title: "Chocolat sur vin sec = catastrophe",
    explanation:
      "Le chocolat sature les papilles et écrase tout vin non sucré. Réserve les rouges sec pour avant le dessert, et passe à un VDN ou un Porto sur le chocolat.",
  },
  {
    title: "Trop d'épices brûlantes = appelle du sucre",
    explanation:
      "Un curry très pimenté avec un rouge tannique = sensation de brûlure décuplée. Un Riesling demi-sec ou un Gewurztraminer apaisera le palais.",
  },
];
