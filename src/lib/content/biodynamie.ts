/**
 * Module Vigne / Biodynamie — récit en 8 slides du contenu source.
 * Source : public_locales_fr_module_8.json
 *
 * On exporte une lecture fortement typée mais flexible :
 * chaque slide a une forme un peu différente côté JSON, on garde la donnée brute
 * et on traite la mise en forme dans la page.
 */
import raw from "@/content/modules/biodynamie.json";

export type ContentItem = { id: string | number; content?: string; text?: string };

export type BiodynamieContent = {
  start: { title: string; info: string; button: string };
  slide1: { title: string; didYouKnow: string; items: ContentItem[] };
  slide2: { title: string; didYouKnow: string; items: ContentItem[] };
  slide3: { title: string; didYouKnow: string; items: (ContentItem & { type?: boolean })[] };
  slide4: { title: string; didYouKnow: string; items: (ContentItem & { text: string })[] };
  slide5: {
    title: string;
    didYouKnow: string;
    items: { id: number; title: string; content: string }[];
  };
  slide6: { title: string; left: ContentItem[]; right: ContentItem[] };
  slide7: { title: string; items: ContentItem[] };
  slide8: { title: string; info: string; items: ContentItem[]; bottom: ContentItem[] };
};

export function getBiodynamieContent(): BiodynamieContent {
  const r = raw as Record<string, unknown>;
  return {
    start: r.start as BiodynamieContent["start"],
    slide1: r.slide_1 as BiodynamieContent["slide1"],
    slide2: r.slide_2 as BiodynamieContent["slide2"],
    slide3: r.slide_3 as BiodynamieContent["slide3"],
    slide4: r.slide_4 as BiodynamieContent["slide4"],
    slide5: r.slide_5 as BiodynamieContent["slide5"],
    slide6: r.slide_6 as BiodynamieContent["slide6"],
    slide7: r.slide_7 as BiodynamieContent["slide7"],
    slide8: r.slide_8 as BiodynamieContent["slide8"],
  };
}
