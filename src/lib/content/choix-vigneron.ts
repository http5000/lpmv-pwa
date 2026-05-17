/**
 * Module Vinification / Les choix du vigneron.
 * Source : public_locales_fr_module_10.json
 *
 * 7 grandes décisions du vigneron en cave, chacune avec ses variantes/résultats.
 * On expose ici un accès strictement typé aux blocs principaux ; la mise en forme
 * fine se fait dans la page (chaque section a sa logique d'affichage spécifique).
 */
import raw from "@/content/modules/choix-vigneron.json";

type Any = Record<string, unknown>;

export type ChoixVigneronContent = {
  title: string;
  intro: { lead: string; main: string };
  destemming: {
    title: string;
    subtitle: { text: string; bold: string };
    tabs: {
      first: TabContent;
      second: TabContent;
    };
    sections: { howItWorks: string; typicalResult: string };
  };
  extraction: {
    title: string;
    intro: string;
    levers: { key: string; title: string; description: string }[];
    panel: {
      maceration: VariantPair;
      fermentation: VariantPair;
      technique: { title: string; variants: VariantItem[] };
    };
  };
  yeasts: {
    title: string;
    intro: string;
    tabs: { indigenous: YeastSide; selected: YeastSide };
    sections: { aroma: string; complexity: string; consistency: string; expression: string };
    didYouKnow: string;
  };
  adjustments: {
    title: string;
    intro: string;
    items: {
      key: string;
      title: string;
      description: string;
      detail: string;
    }[];
  };
  aging: {
    title: string;
    intro: string;
    vessels: { key: string; title: string; description: string; icon: string }[];
    durations: { key: "short" | "long"; title: string; description: string }[];
    samples: { vessel: string; duration: string; verdict: string; example: string }[];
  };
  blending: {
    title: string;
    intro: string;
    approaches: { key: string; title: string; description: string }[];
  };
  bottling: {
    title: string;
    intro: string;
    decisions: { key: string; title: string; description: string; detail: string }[];
    philosophies: { key: string; title: string; subtitle: string; values: string[] }[];
  };
  finish: { title: string; lead: string; outro: string };
};

type TabContent = {
  tabName: string;
  imageTitle: string;
  howItWorks: string[];
  typicalResults: string[];
};

type VariantItem = { key: string; label: string; description: string };
type VariantPair = { title: string; variants: VariantItem[] };
type YeastSide = { label: string; aroma: string; complexity: string; consistency: string; expression: string };

function toArrayOfStrings(obj: Any | undefined): string[] {
  if (!obj) return [];
  return Object.values(obj).filter((v): v is string => typeof v === "string");
}

function buildContent(): ChoixVigneronContent {
  const r = raw as Any;
  const s1 = r.step_1 as Any;
  const s2 = r.step_2 as Any;
  const s3 = r.step_3 as Any;
  const s4 = r.step_4 as Any;
  const s5 = r.step_5 as Any;
  const s6 = r.step_6 as Any;
  const s7 = r.step_7 as Any;
  const s8 = r.step_8 as Any;
  const finish = r.finish as Any;

  // -- Step 1 intro
  const sub = s1.subtitle as Any;
  const intro = {
    lead: `${sub.first} ${sub.firstBold} ${sub.second} ${sub.secondBold}. ${sub.third}`,
    main: s1.title as string,
  };

  // -- Step 2 destemming
  const tabs2 = s2.tabs as Any;
  const t2first = tabs2.first as Any;
  const t2second = tabs2.second as Any;
  const destemming = {
    title: s2.title as string,
    subtitle: s2.subtitle as { text: string; bold: string },
    sections: s2.sections as { howItWorks: string; typicalResult: string },
    tabs: {
      first: {
        tabName: t2first.tabName as string,
        imageTitle: t2first.imageTitle as string,
        howItWorks: toArrayOfStrings(t2first.howItWorks as Any),
        typicalResults: toArrayOfStrings(t2first.typicalResults as Any),
      },
      second: {
        tabName: t2second.tabName as string,
        imageTitle: t2second.imageTitle as string,
        howItWorks: toArrayOfStrings(t2second.howItWorks as Any),
        typicalResults: toArrayOfStrings(t2second.typicalResults as Any),
      },
    },
  };

  // -- Step 3 extraction
  const desc3 = s3.description as Any;
  const levels = s3.levels as Any;
  const panel = s3.panel as Any;
  const extraction = {
    title: s3.title as string,
    intro:
      `${desc3.first} ${desc3.firstBold} ${desc3.second} ${desc3.third} ${desc3.thirdBold}. ${desc3.fourth}`,
    levers: ["maceration", "fermentation", "techniques"].map((k) => ({
      key: k,
      title: (levels[k] as Any).title as string,
      description: (levels[k] as Any).description as string,
    })),
    panel: {
      maceration: {
        title: (panel.maceration as Any).title as string,
        variants: Object.entries(((panel.maceration as Any).variants as Any) ?? {}).map(
          ([key, v]) => {
            const va = v as Any;
            const desc = va.description as Any;
            return {
              key,
              label: va.label as string,
              description: [desc.first, desc.firstBold, desc.second, desc.secondBold]
                .filter(Boolean)
                .join(" "),
            };
          },
        ),
      },
      fermentation: {
        title: (panel.fermentation as Any).title as string,
        variants: Object.entries(((panel.fermentation as Any).variants as Any) ?? {}).map(
          ([key, v]) => {
            const va = v as Any;
            const desc = va.description as Any;
            return {
              key,
              label: va.label as string,
              description: [desc.first, desc.firstBold, desc.second]
                .filter(Boolean)
                .join(" "),
            };
          },
        ),
      },
      technique: {
        title: (panel.technique as Any).title as string,
        variants: Object.entries(((panel.technique as Any).variants as Any) ?? {}).map(
          ([key, v]) => {
            const va = v as Any;
            return { key, label: va.label as string, description: va.description as string };
          },
        ),
      },
    },
  };

  // -- Step 4 yeasts
  const desc4 = s4.description as Any;
  const sub4 = s4.subtitle as Any;
  const yeasts = {
    title: s4.title as string,
    intro: [sub4.bold, sub4.first, sub4.firstBold, sub4.second, sub4.secondBold, sub4.third].join(" "),
    tabs: {
      indigenous: {
        label: (s4.tabs as Any).first as string,
        ...((desc4.indigenous as Any) as Omit<YeastSide, "label">),
      } as YeastSide,
      selected: {
        label: (s4.tabs as Any).second as string,
        ...((desc4.selected as Any) as Omit<YeastSide, "label">),
      } as YeastSide,
    },
    sections: {
      aroma: desc4.aroma as string,
      complexity: desc4.complexity as string,
      consistency: desc4.consistency as string,
      expression: desc4.expression as string,
    },
    didYouKnow: (() => {
      const dyk = ((s4.didYouKnow as Any).description as Any);
      return [dyk.first, dyk.firstBold, dyk.second, dyk.secondBold].join(" ");
    })(),
  };

  // -- Step 5 adjustments
  const main5 = s5.main as Any;
  const sub5 = s5.subtitle as Any;
  const adjustments = {
    title: s5.title as string,
    intro: [sub5.first, sub5.firstBold, sub5.second, sub5.third, sub5.thirdBold].join(" "),
    items: ["acidification", "chaptalization", "sulfite"].map((k) => {
      const item = main5[k] as Any;
      const popup = item.popup as Any;
      const detailParts: string[] = [];
      for (const v of Object.values(popup)) {
        if (typeof v === "string") detailParts.push(v);
        else if (v && typeof v === "object") {
          for (const v2 of Object.values(v as Any)) {
            if (typeof v2 === "string") detailParts.push(v2);
          }
        }
      }
      return {
        key: k,
        title: item.title as string,
        description: item.description as string,
        detail: detailParts.join(" "),
      };
    }),
  };

  // -- Step 6 aging
  const vessels = s6.vessels as Any;
  const agingTime = s6.aging as Any;
  const result = s6.result as Any;
  const vesselKeys = ["stainless", "concrete", "oak", "amphora"] as const;
  const sampleKeys = ["short", "long"] as const; // skip "no" (very rare / theoretical)
  const sub6 = s6.subtitle as Any;
  const aging = {
    title: s6.title as string,
    intro: [sub6.first, sub6.second].join(" "),
    vessels: vesselKeys.map((k) => {
      const v = vessels[k] as Any;
      const title = typeof v.title === "string" ? v.title : `${(v.title as Any).first} ${(v.title as Any).second}`;
      return {
        key: k,
        title,
        description: v.description as string,
        icon: `/choix-vigneron/${k}.png`,
      };
    }),
    durations: sampleKeys.map((k) => ({
      key: k,
      title: (agingTime[k] as Any).title as string,
      description: (agingTime[k] as Any).description as string,
    })),
    samples: [] as { vessel: string; duration: string; verdict: string; example: string }[],
  };
  for (const v of vesselKeys) {
    for (const d of sampleKeys) {
      const key = `${v}_${d}`;
      const res = result[key] as Any | undefined;
      if (res) {
        aging.samples.push({
          vessel: v,
          duration: d,
          verdict: res.title as string,
          example: res.example as string,
        });
      }
    }
  }

  // -- Step 7 blending
  const blendMain = s7.main as Any;
  const sub7 = s7.subtitle as Any;
  const blending = {
    title: s7.title as string,
    intro: [sub7.first, sub7.second].join(" "),
    approaches: Object.entries(blendMain).map(([key, v]) => ({
      key,
      title: (v as Any).title as string,
      description: (v as Any).description as string,
    })),
  };

  // -- Step 8 bottling
  const main8 = s8.main as Any;
  const decisionKeys = ["fining", "filtration", "sulfites", "closure", "label"];
  const tabs8 = s8.tabs as Any;
  const bottling = {
    title: s8.title as string,
    intro: s8.subtitle as string,
    decisions: decisionKeys.map((k) => {
      const item = main8[k] as Any;
      const popup = item.popup as Any;
      const parts: string[] = [];
      for (const v of Object.values(popup ?? {})) {
        if (typeof v === "string") parts.push(v);
        else if (v && typeof v === "object") {
          for (const v2 of Object.values(v as Any)) {
            if (typeof v2 === "string") parts.push(v2);
            else if (v2 && typeof v2 === "object") {
              for (const v3 of Object.values(v2 as Any)) {
                if (typeof v3 === "string") parts.push(v3);
              }
            }
          }
        }
      }
      return {
        key: k,
        title: item.title as string,
        description: item.description as string,
        detail: parts.join(" "),
      };
    }),
    philosophies: Object.entries(tabs8)
      .filter(([key]) => key !== "title")
      .map(([key, v]) => ({
        key,
        title: (v as Any).title as string,
        subtitle: (v as Any).subtitle as string,
        values: toArrayOfStrings((v as Any).values as Any),
      })),
  };

  const subFinish = finish.subtitle as Any;
  const subFinishFirst = subFinish.first as Any;
  const finishOut = {
    title: finish.title as string,
    lead: [subFinishFirst.first, subFinishFirst.second].join(" "),
    outro: subFinish.second as string,
  };

  return {
    title: s1.title as string,
    intro,
    destemming,
    extraction,
    yeasts,
    adjustments,
    aging,
    blending,
    bottling,
    finish: finishOut,
  };
}

const content = buildContent();
export function getChoixVigneronContent(): ChoixVigneronContent {
  return content;
}
