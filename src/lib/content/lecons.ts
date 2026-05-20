/**
 * Mini-leçons — questions courantes sur le vin.
 * Thématiques inspirées de la pédagogie grand public type Vinolovers
 * (sans copier de contenu). Format court, scrollable, mobile-first.
 *
 * Chaque leçon ≈ 90 secondes de lecture, structurée pour rester utile sans
 * effrayer.
 */

export type Lecon = {
  slug: string;
  emoji: string;
  /** Tag thématique pour filtrer */
  category: "decouverte" | "service" | "achat" | "deguster" | "cellier";
  title: string;
  /** Phrase d'accroche */
  hook: string;
  /** 3-5 sections courtes */
  sections: { title: string; body: string }[];
  /** Bullet "À retenir" final */
  takeaway: string;
};

export const CATEGORY_META: Record<
  Lecon["category"],
  { label: string; emoji: string; color: string }
> = {
  decouverte: { label: "Découverte", emoji: "🌱", color: "#C6A15B" }, /* champetre */
  service: { label: "Servir", emoji: "🍷", color: "#310E31" },       /* aubergine */
  achat: { label: "Acheter", emoji: "💸", color: "#CA9A2F" },        /* or */
  deguster: { label: "Déguster", emoji: "👃", color: "#6B4A6B" },    /* aubergine-soft */
  cellier: { label: "Conserver", emoji: "🍾", color: "#C6A15B" },    /* champetre */
};

export const LECONS: Lecon[] = [
  {
    slug: "erreurs-debutant",
    emoji: "🙈",
    category: "deguster",
    title: "5 erreurs classiques quand on débute",
    hook: "Personne ne naît avec un palais. Ces réflexes mettent souvent à côté.",
    sections: [
      {
        title: "1. Servir trop froid",
        body:
          "Un vin glacé endort ses arômes. Sors le rouge du frigo 15 min avant de servir si la pièce est chaude — il libère son fruit.",
      },
      {
        title: "2. Remplir le verre à ras-bord",
        body:
          "Le verre n'est pas un récipient à remplir, c'est un atelier à arômes. Verse au tiers maximum : tu as besoin de la place pour faire tourner.",
      },
      {
        title: "3. Juger un vin au premier nez",
        body:
          "Beaucoup de vins (surtout en bouteille fermée depuis longtemps) sont fermés à l'ouverture. Laisse 10 minutes et re-sens : tout peut changer.",
      },
      {
        title: "4. Croire qu'un vin cher est forcément meilleur",
        body:
          "Le prix paye le foncier, la rareté, la notoriété — pas seulement la qualité. Un Beaujolais à 12 € peut t'émouvoir plus qu'un grand cru à 80 €.",
      },
      {
        title: "5. Boire avant de manger",
        body:
          "Goûte le vin seul ET avec le plat. Il révèle des notes différentes. C'est presque deux dégustations.",
      },
    ],
    takeaway:
      "La dégustation, c'est moins une compétence qu'une attention. Ralentis, observe, n'aie pas peur de te tromper.",
  },
  {
    slug: "temperature-service",
    emoji: "🌡️",
    category: "service",
    title: "À quelle température servir chaque vin",
    hook: "La température change tout. Trop froid : ferme. Trop chaud : alcooleux.",
    sections: [
      {
        title: "Bulles & blancs vifs",
        body:
          "Champagne, Crémant, Muscadet, Sancerre, Riesling : 6 à 8 °C. C'est froid, mais pas glacé : sors la bouteille du seau 2 min avant de servir.",
      },
      {
        title: "Blancs gras & rosés",
        body:
          "Meursault, Chardonnay boisé, Condrieu, rosés de Provence : 10 à 12 °C. Trop froid, ils perdent leur rondeur.",
      },
      {
        title: "Rouges légers",
        body:
          "Beaujolais, Pinot Noir, Cinsault, rouges de Loire : 12 à 14 °C. La cave fraîche est idéale. Jamais à température ambiante l'été.",
      },
      {
        title: "Rouges structurés",
        body:
          "Bordeaux, Côtes-du-Rhône, Bourgogne village et + : 16 à 18 °C. C'est la « température de la pièce » d'une maison de pierres au XIXe — pas celle d'un appart' moderne chauffé à 22 °C.",
      },
      {
        title: "Liquoreux & vins doux naturels",
        body:
          "Sauternes, Maury, Banyuls : 10 à 12 °C. Le froid masque la sucrosité un peu écœurante et révèle l'acidité qui équilibre.",
      },
    ],
    takeaway:
      "Si en doute, servir trop frais : le vin se réchauffe en 5 min dans le verre, mais ne se refroidit pas tout seul.",
  },
  {
    slug: "carafer-decanter",
    emoji: "🍶",
    category: "service",
    title: "Carafer ou décanter — c'est pas pareil",
    hook: "Deux gestes, deux objectifs. Confondre les deux peut abîmer un grand vin.",
    sections: [
      {
        title: "Carafer = aérer",
        body:
          "On transvase un vin jeune et fermé dans une grande carafe ventrue pour l'oxygéner. But : ouvrir les arômes, assouplir les tanins. Surtout pour les rouges jeunes structurés (Bordeaux, Rhône, Bourgogne village récent).",
      },
      {
        title: "Décanter = séparer",
        body:
          "On transvase un vieux vin (10+ ans) dans une carafe étroite à long col pour le séparer de son dépôt. But : éviter d'avoir les sédiments dans le verre. Aération minimale — on protège le vin fragile.",
      },
      {
        title: "Quand ne PAS carafer",
        body:
          "Les vieux vins, les vins fins (Bourgogne pinot, Champagne, blancs), les vins légers. L'aération les détruirait en quelques minutes.",
      },
    ],
    takeaway:
      "Vin jeune et corsé = carafer 30 min avant. Vieux vin = décanter juste avant de servir, sans secousse.",
  },
  {
    slug: "verres-vin",
    emoji: "🥂",
    category: "service",
    title: "Quels verres pour quels vins",
    hook: "Le verre n'est pas un détail. Forme et taille changent vraiment ce que tu sens.",
    sections: [
      {
        title: "Un verre, trois fonctions",
        body:
          "Concentrer les arômes (forme tulipe), guider le vin sur la bonne zone de la langue (taille du buvant), permettre l'aération (volume du calice).",
      },
      {
        title: "Si tu n'achète qu'un seul verre",
        body:
          "Prends un verre tulipe universel de 35-40 cl (style INAO ou Riedel Vinum). Il convient à 90 % des vins, du Crémant au Bordeaux. Le verre à ballon géant est joli, mais inutile pour 99 % de tes occasions.",
      },
      {
        title: "Flûte ou tulipe pour le Champagne ?",
        body:
          "La flûte est élégante mais étouffe les arômes du bon Champagne. Pour un Champagne de qualité, choisis un verre à vin blanc de taille moyenne. La flûte reste OK pour les bulles d'apéro.",
      },
      {
        title: "Verres colorés / sculptés",
        body:
          "Très jolis, mais cachent la robe — l'œil ne peut plus juger. Réserve-les aux apéros, pas aux dégustations.",
      },
    ],
    takeaway:
      "Un seul verre tulipe en cristallin transparent, 35-40 cl. C'est l'investissement le plus rentable pour bien boire.",
  },
  {
    slug: "conserver-vin",
    emoji: "🍂",
    category: "cellier",
    title: "Combien de temps un vin se conserve-t-il ?",
    hook: "Toutes les bouteilles ne sont pas faites pour vieillir. La plupart se boivent jeunes.",
    sections: [
      {
        title: "Vins de soif (à boire dans l'année)",
        body:
          "Beaujolais nouveau, rosés, blancs vifs (Muscadet, Picpoul), vins légers fruités. Ils sont conçus pour être bus jeunes et frais.",
      },
      {
        title: "Vins de plaisir (2 à 5 ans)",
        body:
          "La majorité des AOP courantes : Côtes-du-Rhône village, Bordeaux génériques, Bourgogne village, Crémants, Vouvray. Ils gagnent en complexité 2-3 ans, puis stagnent ou déclinent.",
      },
      {
        title: "Vins de garde (5 à 20+ ans)",
        body:
          "Crus classés bordelais, Bourgogne 1er Cru et Grand Cru, Châteauneuf-du-Pape, Hermitage, Sauternes. Achetés jeunes, ils se transforment en cave pendant 10-20 ans, parfois plus.",
      },
      {
        title: "Comment savoir si une bouteille a passé son apogée",
        body:
          "Couleur : tuilée pour un rouge, ambrée trop foncée pour un blanc. Nez : oxydé, fruits secs dominants, vinaigré. Bouche : acidité dominante, fruits effacés. Si tu hésites — ouvre, sens, goûte une gorgée.",
      },
    ],
    takeaway:
      "Si ta bouteille n'est pas marquée « vin de garde » par le caviste, bois-la dans les 2-3 ans. Pas de stress.",
  },
  {
    slug: "stocker-cave",
    emoji: "🌡️",
    category: "cellier",
    title: "Stocker sans avoir une cave",
    hook: "Pas besoin d'un cellier ancestral. Quelques règles suffisent à protéger tes bouteilles.",
    sections: [
      {
        title: "Les 4 ennemis du vin",
        body:
          "Chaleur (au-dessus de 20 °C : vieillissement accéléré). Variations de température (le pire). Lumière directe (UV oxydent le vin). Vibrations (perturbent la sédimentation).",
      },
      {
        title: "Solution sans cave",
        body:
          "Un placard sombre, frais (15-18 °C constant idéal, jusqu'à 20 °C tolérable), au sol, loin des appareils chauffants ou du frigo. Évite les pièces sous toit.",
      },
      {
        title: "Bouteilles couchées ou debout ?",
        body:
          "Couchées si bouchon liège : ça maintient le bouchon humide et étanche. Debout si capsule à vis ou bouchon synthétique : peu importe.",
      },
      {
        title: "Quand investir dans une cave électrique",
        body:
          "Dès que tu commences à acheter pour garder 5 ans + et que ton placard dépasse 22 °C en été. Compte 250-400 € pour 40-50 bouteilles.",
      },
    ],
    takeaway:
      "Le placard du couloir, à l'écart du frigo et de la fenêtre, fait l'affaire pour 90 % des vins.",
  },
  {
    slug: "bouchon-vis-liege",
    emoji: "🔩",
    category: "achat",
    title: "Bouchon à vis vs liège — c'est moins cher ?",
    hook: "Préjugé tenace : la vis = bas de gamme. Faux.",
    sections: [
      {
        title: "Le liège naturel",
        body:
          "Permet une micro-oxygénation qui aide les vins de garde. Risque : le « goût de bouchon » (TCA) qui ruine 1 à 2 % des bouteilles (les progrès récents ont réduit ce taux).",
      },
      {
        title: "La capsule à vis",
        body:
          "Étanchéité parfaite, zéro défaut bouchon, fraîcheur garantie. Idéal pour les vins à boire jeunes (blancs vifs, rosés, rouges fruités). Très répandu en Nouvelle-Zélande, Australie, Autriche — pour des vins haut de gamme.",
      },
      {
        title: "Le bouchon synthétique",
        body:
          "Compromis. Imite le liège visuellement, élimine le risque TCA. Question : sa tenue sur 15+ ans est encore débattue.",
      },
    ],
    takeaway:
      "La vis n'est PAS un signe de bas de gamme. C'est même souvent un signe d'attention à la fraîcheur du vin.",
  },
  {
    slug: "vin-nature",
    emoji: "🌿",
    category: "decouverte",
    title: "Vin nature, bio, biodynamie : c'est quoi la différence ?",
    hook: "Trois étiquettes, trois philosophies différentes. Démêlons.",
    sections: [
      {
        title: "Vin bio",
        body:
          "Pas de produits chimiques de synthèse à la vigne. Cuivre, soufre et tisanes autorisés. Limite stricte de sulfites en cave. Label public (AB / Eurofeuille), contrôle annuel.",
      },
      {
        title: "Vin biodynamie",
        body:
          "Bio + cahier des charges philosophique (préparations à base de plantes, calendrier lunaire). Labels Demeter ou Biodyvin. Plus rigoureux et moins répandu.",
      },
      {
        title: "Vin nature",
        body:
          "Pas de définition légale, mais une charte (Vin Méthode Nature 2019). Raisins bio, vendanges manuelles, levures indigènes, intrants quasi nuls, sulfites maximum 30 mg/L pour les rouges, 20 mg/L pour les blancs et rosés. C'est le plus exigeant philosophiquement, le plus fragile à boire.",
      },
      {
        title: "Conventionnel raisonné / HVE",
        body:
          "Bonnes pratiques mais sans label bio. La HVE (Haute Valeur Environnementale) est un cadre intermédiaire reconnu par l'État.",
      },
    ],
    takeaway:
      "Bio = règle. Biodynamie = règle + philosophie. Nature = règle + philosophie + intervention minimale en cave. Conventionnel raisonné = bonnes intentions sans label.",
  },
  {
    slug: "choisir-resto",
    emoji: "🍽️",
    category: "achat",
    title: "Choisir un vin au restaurant sans paniquer",
    hook: "La carte des vins fait peur. Voici comment la dompter en 60 secondes.",
    sections: [
      {
        title: "1. Demande au sommelier",
        body:
          "Sans honte. Donne-lui ton budget (« autour de 35 € »), ton plat, ton goût (« plutôt frais et fruité »). Son job c'est de t'orienter, pas de te juger.",
      },
      {
        title: "2. Sans sommelier : règle du milieu",
        body:
          "Pas le moins cher (souvent surcoté, marges élevées), pas le plus cher (idem). Le rapport qualité-prix se trouve souvent dans le tiers central de chaque catégorie.",
      },
      {
        title: "3. Cherche les petites appellations",
        body:
          "Si tu vois Pomerol ou Chablis tu paieras le nom. Mais Lalande-de-Pomerol ou Saint-Bris (juste à côté), même styles, prix 30-50 % en dessous.",
      },
      {
        title: "4. Le vin au verre",
        body:
          "Bonne option si tu manges seul ou peu, mais souvent moins frais (bouteille ouverte). Demande quand a été ouvert le vin proposé.",
      },
    ],
    takeaway:
      "Un bon plat avec un vin moyen reste un bon repas. Un grand vin sur un mauvais plat est un gâchis. Choisis d'abord le plat.",
  },
  {
    slug: "vocabulaire-base",
    emoji: "📖",
    category: "deguster",
    title: "Le vocabulaire pour bluffer ton voisin",
    hook: "10 mots pour parler du vin sans avoir l'air de réciter une fiche.",
    sections: [
      {
        title: "Tendu",
        body:
          "Se dit d'un vin (souvent blanc) à l'acidité marquée, droit, qui salive immédiatement. Compliment.",
      },
      {
        title: "Gras / onctueux",
        body:
          "À l'opposé : un vin (souvent blanc) qui enrobe le palais, sensation tactile soyeuse. Souvent élevé en barrique.",
      },
      {
        title: "Charpenté",
        body:
          "Un rouge solide, avec des tanins présents et une structure verticale. Convient aux viandes.",
      },
      {
        title: "Soyeux",
        body:
          "Une texture lisse, sans aspérités. Souvent dit de tanins très fins (grand Pinot Noir, Merlot mûr).",
      },
      {
        title: "Minéral",
        body:
          "Note de pierre, craie, silex, parfois iode. Trait recherché des grands blancs (Chablis, Sancerre, Champagne).",
      },
      {
        title: "Long",
        body:
          "Désigne une finale qui persiste en bouche après avoir avalé. Mesurée en caudalies (secondes).",
      },
      {
        title: "Réduit",
        body:
          "Note d'œuf, allumette, soufre — défaut passager après ouverture. Solution : carafer 10 min.",
      },
      {
        title: "Bouchonné",
        body:
          "Goût de carton mouillé, moisi. Défaut irréversible : on rapporte au caviste / au restaurant.",
      },
      {
        title: "Volatil",
        body:
          "Notes de vernis, vinaigre. Léger : peut être charmant. Marqué : défaut.",
      },
      {
        title: "Équilibré",
        body:
          "Aucune dimension ne domine (alcool / acidité / sucre / tanin). Le meilleur compliment qu'on puisse faire à un vin.",
      },
    ],
    takeaway:
      "Mieux vaut une vraie sensation simple (« il salive, ça me plaît ») qu'un mot pro mal employé.",
  },
];

export function getLeconsContent() {
  return { lecons: LECONS, categories: CATEGORY_META };
}

export function getLeconBySlug(slug: string): Lecon | undefined {
  return LECONS.find((l) => l.slug === slug);
}
