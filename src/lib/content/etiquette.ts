/**
 * Lire une étiquette de vin.
 * Contenu rédigé from scratch (à valider avec un œil expert).
 *
 * Idée pédagogique : présenter une étiquette "type" avec hotspots tappables,
 * chacun expliquant la mention. Plus quelques zooms thématiques (AOP/IGP,
 * Champagne, labels, mentions vigneron/négoce).
 */

export type Hotspot = {
  key: string;
  /** Coordonnée X en % du conteneur (centre de la zone tappable) */
  x: number;
  /** Coordonnée Y en % */
  y: number;
  label: string;
  /** Bullet courte affichée en survol */
  tldr: string;
  /** Contenu détaillé (paragraphes) */
  detail: string[];
};

export const ETIQUETTE_HOTSPOTS: Hotspot[] = [
  {
    key: "appellation",
    x: 50,
    y: 22,
    label: "Appellation",
    tldr: "La carte d'identité géographique du vin.",
    detail: [
      "L'appellation indique D'OÙ vient le vin et selon QUELLE règle il a été fait.",
      "Plus elle est précise, plus le cahier des charges est strict : on contrôle les cépages, les rendements, le mode d'élevage, parfois même le moment des vendanges.",
    ],
  },
  {
    key: "millesime",
    x: 50,
    y: 36,
    label: "Millésime",
    tldr: "L'année de récolte des raisins.",
    detail: [
      "Le millésime est l'année où les raisins ont été vendangés — pas celle de la mise en bouteille.",
      "Une bonne année dans une région ne l'est pas forcément ailleurs : le millésime se lit avec une carte des millésimes en main pour les vins de garde.",
      "Pour les Champagnes, l'absence de millésime (Brut Sans Année) est la norme — c'est un assemblage pluri-millésime pour garantir le style maison.",
    ],
  },
  {
    key: "nom-cuvee",
    x: 50,
    y: 50,
    label: "Nom de la cuvée",
    tldr: "Le titre, libre, choisi par le vigneron.",
    detail: [
      "Contrairement à l'appellation et au millésime, le nom de cuvée est libre. C'est souvent un clin d'œil : nom de parcelle, hommage familial, jeu de mots.",
      "Une « Cuvée Prestige » ou « Réserve » n'a aucune définition légale — c'est un argument marketing.",
    ],
  },
  {
    key: "producteur",
    x: 50,
    y: 64,
    label: "Producteur",
    tldr: "Qui a fait le vin — et comment c'est dit change tout.",
    detail: [
      "« Mis en bouteille au château / au domaine / à la propriété » = le vin a été produit ET embouteillé chez celui qui possède les vignes. C'est le marqueur d'un vin de domaine.",
      "« Mis en bouteille par X » sans mention de domaine = le vin a probablement été acheté en vrac et embouteillé par un négociant. Pas mauvais en soi, mais plus distant du vignoble.",
      "Le code « FR-XX » indique le pays + numéro d'identification de l'embouteilleur.",
    ],
  },
  {
    key: "degre",
    x: 17,
    y: 80,
    label: "Degré d'alcool",
    tldr: "Le volume d'alcool en % du volume total.",
    detail: [
      "« 13 % vol. » = le vin contient 13 ml d'alcool pur pour 100 ml. Tolérance légale ± 0,5 %.",
      "Sous 10° on est sur des blancs très frais ou doux. Au-dessus de 14,5° on entre dans les vins solaires concentrés ou liquoreux.",
    ],
  },
  {
    key: "contenance",
    x: 83,
    y: 80,
    label: "Contenance",
    tldr: "Le volume liquide en cl ou ml.",
    detail: [
      "75 cl est la bouteille standard. Magnum = 150 cl, Jéroboam = 300 cl, Mathusalem = 600 cl.",
      "Les demi-bouteilles (37,5 cl) vieillissent plus vite, les grands formats plus lentement — moins d'oxygène par volume.",
    ],
  },
  {
    key: "sulfites",
    x: 50,
    y: 92,
    label: "« Contient des sulfites »",
    tldr: "Mention obligatoire dès 10 mg/L de SO₂.",
    detail: [
      "Quasi tous les vins en contiennent : les levures en produisent naturellement durant la fermentation, et la plupart des vignerons en ajoutent un peu pour stabiliser.",
      "Un « vin sans sulfites ajoutés » est rare et fragile — il voyage moins bien, se conserve moins longtemps.",
    ],
  },
];

// ============================================================
// Zooms thématiques
// ============================================================

export type Zoom = {
  key: string;
  title: string;
  intro: string;
  items: { label: string; description: string }[];
};

export const ZOOMS: Zoom[] = [
  {
    key: "aoc-igp-vdf",
    title: "AOP, IGP, Vin de France — la pyramide qualitative",
    intro:
      "Le système européen classe les vins selon la précision de leur origine et la rigueur de leur cahier des charges. Plus on monte, plus on est encadré.",
    items: [
      {
        label: "AOP / AOC (Appellation d'Origine Protégée / Contrôlée)",
        description:
          "Le niveau le plus exigeant. Cépages imposés, rendements plafonnés, vinification encadrée, dégustation d'agrément obligatoire. Ex : Pomerol, Sancerre, Châteauneuf-du-Pape.",
      },
      {
        label: "IGP (Indication Géographique Protégée)",
        description:
          "Cadre plus souple : une zone géographique large, des cépages autorisés plus permissifs, parfois des cépages étrangers acceptés. Ex : IGP Pays d'Oc, IGP Méditerranée.",
      },
      {
        label: "Vin de France",
        description:
          "Aucune contrainte d'origine précise : on peut assembler des raisins de toute la France, indiquer le cépage, le millésime, mais pas la région. Liberté totale du vigneron, souvent utilisé pour des cuvées atypiques.",
      },
    ],
  },
  {
    key: "champagne-mentions",
    title: "Champagne — les mentions à connaître",
    intro:
      "Les Champagnes ont leur propre vocabulaire imposé par le syndicat. Voici les codes à décoder.",
    items: [
      {
        label: "Brut Sans Année (BSA) — env. 90 % de la production",
        description:
          "Assemblage de l'année en cours + vins de réserve d'années précédentes. Garantit le style constant de la maison.",
      },
      {
        label: "Millésimé",
        description:
          "100 % d'une seule année exceptionnelle. Vieilli minimum 3 ans sur lattes. Caractère unique de l'année.",
      },
      {
        label: "Blanc de Blancs",
        description: "100 % raisins blancs (Chardonnay). Fin, vif, élégant.",
      },
      {
        label: "Blanc de Noirs",
        description: "100 % raisins noirs (Pinot Noir / Meunier). Structuré, vineux.",
      },
      {
        label: "Rosé",
        description:
          "Soit macération courte, soit assemblage avec du vin rouge de Champagne (exception française autorisée).",
      },
      {
        label: "Échelle du dosage",
        description:
          "Brut Nature (0-3 g/L) → Extra Brut (0-6) → Brut (0-12) → Extra Dry (12-17) → Sec (17-32) → Demi-sec (32-50). Le sucre ajouté à la dernière minute.",
      },
      {
        label: "RM, NM, CM, RC…",
        description:
          "Code en bas d'étiquette qui révèle le producteur : RM = Récoltant-Manipulant (le vigneron), NM = Négociant-Manipulant (grande maison), CM = Coopérative, RC = Récoltant-Coopérateur, MA = Marque d'Acheteur.",
      },
    ],
  },
  {
    key: "labels",
    title: "Les labels environnementaux",
    intro:
      "Plusieurs labels coexistent — ils ne disent pas la même chose, et tous n'ont pas la même rigueur de contrôle.",
    items: [
      {
        label: "AB / Eurofeuille (Bio)",
        description:
          "Pas de produits chimiques de synthèse à la vigne (cuivre, soufre, tisanes autorisés). Limite de sulfites en cave. Contrôle annuel par un organisme indépendant.",
      },
      {
        label: "Demeter / Biodyvin (Biodynamie)",
        description:
          "Bio + cahier des charges biodynamique : préparations à base de plantes, calendrier lunaire, respect de l'organisme-domaine. Demeter est l'historique mondial, Biodyvin est français.",
      },
      {
        label: "HVE (Haute Valeur Environnementale)",
        description:
          "Label public français récent. Engagement sur la biodiversité, la stratégie phyto, la gestion des fertilisants et de l'eau. Moins strict que le bio mais plus accessible.",
      },
      {
        label: "Terra Vitis",
        description:
          "Label de viticulture raisonnée, créé par les vignerons. Audit annuel sur l'ensemble du domaine.",
      },
      {
        label: "Vegan",
        description:
          "Garantit l'absence de produit d'origine animale en cave (pas de blanc d'œuf pour le collage, pas de colle de poisson). Compatible avec bio, biodynamie ou conventionnel.",
      },
      {
        label: "Vin Méthode Nature",
        description:
          "Charte créée en 2019, encore peu de domaines certifiés. Raisins bio, vendanges manuelles, levures indigènes, intrants quasi nuls. Le plus exigeant côté philosophie.",
      },
    ],
  },
  {
    key: "vigneron-vs-negociant",
    title: "Vigneron, négociant, ou les deux ?",
    intro:
      "Tous les vins ne sont pas faits par celui qui possède les vignes. Lire l'étiquette permet de savoir.",
    items: [
      {
        label: "Vigneron / Récoltant",
        description:
          "Il possède et cultive les vignes, vinifie son raisin, embouteille chez lui. Mention « Mis en bouteille à la propriété / au domaine / au château ».",
      },
      {
        label: "Négociant",
        description:
          "Achète des raisins, du moût ou du vin déjà fait à plusieurs producteurs, puis assemble et commercialise. Ne possède pas forcément de vignes. Mention « Mis en bouteille par… ».",
      },
      {
        label: "Coopérative",
        description:
          "Vinifie les raisins de plusieurs vignerons-adhérents en commun. Important en volume — souvent un excellent rapport qualité-prix.",
      },
      {
        label: "Négociant-vinificateur (« Maison »)",
        description:
          "Achète raisins ou moûts mais vinifie chez lui. Modèle bordelais classique, modèle bourguignon récent.",
      },
    ],
  },
];
