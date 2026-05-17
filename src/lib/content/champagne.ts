/**
 * Module Vinification / Assemble ton Champagne — partie éducative (5 slides).
 * Source : public_locales_fr_module_13.json (renumérotation borne :
 * dans la borne c'est "module_13" mais dans notre parcours c'est "Module 12 Champagne").
 *
 * NOTE : la mécanique de jeu "Chef de Cave" est reportée en v2 (interface
 * d'assemblage 6 doses + simulation fermentation + dosage). Pour l'instant,
 * on présente le contenu éducatif et on annonce le jeu à venir.
 */
import raw from "@/content/modules/champagne.json";

type Any = Record<string, unknown>;

export type Cepage = {
  id: string;
  label: string;
  details: string;
  bullets: string[];
};

export type AssemblageInputs = {
  topItems: string[];
  villages: { name: string; type: string }[];
  reserveItems: { label: string; text: string }[];
};

export type ChampagneFamily = { label: string; info: string };

export type DosageStep = { label: string; sugar: string; taste: string };

export type MethodeStep = { id: string; label: string; content: string };

export type ChampagneContent = {
  title: string;
  intro: string;
  cepagesIntro: { title: string; subtitle: string };
  cepages: Cepage[];
  cepagesRares: { intro: string; items: string[]; outro: string };
  assemblage: { title: string; subtitle: string; inputs: AssemblageInputs };
  familles: {
    title: string;
    millesimeIntro: string;
    millesimeExamples: { label: string; text: string }[];
    families: ChampagneFamily[];
  };
  chefDeCave: {
    title: string;
    mission: string;
    dosage: string;
    dosageScale: DosageStep[];
  };
  methode: { title: string; steps: MethodeStep[] };
};

function buildContent(): ChampagneContent {
  const r = raw as Any;
  const start = r.start as Any;
  const s1 = r.slide_1 as Any;
  const s2 = r.slide_2 as Any;
  const s3 = r.slide_3 as Any;
  const s4 = r.slide_4 as Any;
  const s5 = r.slide_5 as Any;

  // Slide 1 — cépages
  const cepages: Cepage[] = Object.entries(s1.mainItems as Any).map(([id, v]) => {
    const va = v as Any;
    const subs = (va.subitems ?? []) as { text: string }[];
    return {
      id,
      label: va.label as string,
      details: va.details as string,
      bullets: subs.map((s) => s.text),
    };
  });
  const cepagesRaresItems = Object.values(s1.bottomItems as Any) as string[];

  // Slide 2 — assemblage
  const topItems = Object.values((s2.top as Any).items as Any) as string[];
  const villages = Object.values((s2.center as Any).items as Any).map(
    (v) => ({ name: (v as Any).name as string, type: (v as Any).type as string }),
  );
  const reserveItems = Object.values((s2.bottom as Any).items as Any).map((v) => {
    const va = v as Any;
    return { label: va.label as string, text: va.text as string };
  });

  // Slide 3 — familles
  const millesimeExamples = Object.values((s3.top as Any).items as Any).map((v) => {
    const va = v as Any;
    return { label: va.label as string, text: va.text as string };
  });
  const families = Object.values((s3.bottom as Any).items as Any).map((v) => {
    const va = v as Any;
    return { label: va.label as string, info: va.info as string };
  });

  // Slide 4 — chef de cave
  const dosageScale = ((s4.bottom as Any).items as DosageStep[]).map((it) => ({
    label: it.label,
    sugar: it.sugar,
    taste: it.taste,
  }));

  // Slide 5 — méthode
  const methodeSteps: MethodeStep[] = Object.entries(s5.items as Any).map(
    ([id, v]) => {
      const va = v as Any;
      return { id, label: va.label as string, content: va.content as string };
    },
  );

  return {
    title: start.title as string,
    intro:
      "Comprendre la magie des bulles : 3 cépages rois, un art de l'assemblage,\nun chef de cave gardien du temple, et la méthode champenoise.",
    cepagesIntro: { title: s1.title as string, subtitle: s1.subtitle as string },
    cepages,
    cepagesRares: {
      intro: s1.bottomSubtitle as string,
      items: cepagesRaresItems,
      outro: s1.bottomInfo as string,
    },
    assemblage: {
      title: s2.title as string,
      subtitle: s2.subtitle as string,
      inputs: { topItems, villages, reserveItems },
    },
    familles: {
      title: s3.title as string,
      millesimeIntro: (s3.top as Any).info as string,
      millesimeExamples,
      families,
    },
    chefDeCave: {
      title: s4.title as string,
      mission: (s4.top as Any).content as string,
      dosage: (s4.center as Any).info as string,
      dosageScale,
    },
    methode: { title: s5.title as string, steps: methodeSteps },
  };
}

const content = buildContent();
export function getChampagneContent(): ChampagneContent {
  return content;
}
