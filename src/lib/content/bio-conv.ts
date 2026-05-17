/**
 * Module Vigne / Bio vs Conventionnel — swipe quiz vrai/faux.
 * Source : public_locales_fr_module_7.json (bornes du musée).
 * 8 questions, swipe gauche = Faux, swipe droite = Vrai.
 * Score final 0-3 / 4-6 / 7-8 → titre + texte de conclusion.
 */
import raw from "@/content/modules/bio-conv.json";

export type QuizItem = {
  id: string;
  question: string;
  answer: string;
  correct: boolean;
};

export type BioConvContent = {
  title: string;
  info: string;
  swipeLabel: string;
  rules: {
    left: { label: string; info: string };
    right: { label: string; info: string };
  };
  startBtn: string;
  buttonNext: string;
  buttonGoHome: string;
  finishTitles: { "0-3": string; "4-6": string; "7-8": string };
  scoreText: string;
  finishText: string;
  items: QuizItem[];
};

export function getBioConvContent(): BioConvContent {
  return raw as BioConvContent;
}

export function getFinishTitle(score: number, titles: BioConvContent["finishTitles"]): string {
  if (score >= 7) return titles["7-8"];
  if (score >= 4) return titles["4-6"];
  return titles["0-3"];
}
