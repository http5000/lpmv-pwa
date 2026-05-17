/**
 * Module Vigne / Phylloxéra — récit historique en 6 actes.
 * Source : public_locales_fr_module_6.json (bornes du musée).
 */
import raw from "@/content/modules/phylloxera.json";

export type Slide = {
  num: number;
  title: string;
  /** Texte intro (HTML possible) ou null */
  info?: string;
  didYouKnow?: string;
};

export type PhylloxeraContent = {
  start: { title: string; info: string };
  slide1: {
    title: string;
    what: { title: string; content: string };
    consequence: { title: string; content: string };
    didYouKnow: string;
    info: string;
  };
  slide2: {
    title: string;
    items: { id: string; title: string; content: string }[];
  };
  slide3: {
    title: string;
    touchRule?: string;
    items: { title: string; imgId: number; content: string }[];
  };
  slide4: {
    title: string;
    info: string;
    bottomInfo: string;
    didYouKnow: string;
    items: { id: string; title: string; content: string; imgId: string }[];
  };
  slide5: {
    title: string;
    info: string;
    then: string;
    today: string;
    bottomInfo: string;
    didYouKnow: string;
    items: { number: string; content: string }[];
  };
  slide6: {
    title: string;
    didYouKnow: string;
    topInfo: string;
    centerInfo: string;
    bottomInfo: string;
  };
};

export function getPhylloxeraContent(): PhylloxeraContent {
  // The JSON has keys slide_1..6 etc.; just remap to camelCase for ergonomics.
  const r = raw as Record<string, unknown>;
  const slide4Items = (r.slide_4 as Record<string, unknown>).items as Record<
    string,
    { imgId: string; title: string; content: string }
  >;
  return {
    start: r.start as PhylloxeraContent["start"],
    slide1: r.slide_1 as PhylloxeraContent["slide1"],
    slide2: r.slide_2 as PhylloxeraContent["slide2"],
    slide3: r.slide_3 as PhylloxeraContent["slide3"],
    slide4: {
      ...(r.slide_4 as object),
      items: Object.entries(slide4Items).map(([id, v]) => ({ id, ...v })),
    } as PhylloxeraContent["slide4"],
    slide5: r.slide_5 as PhylloxeraContent["slide5"],
    slide6: r.slide_6 as PhylloxeraContent["slide6"],
  };
}
