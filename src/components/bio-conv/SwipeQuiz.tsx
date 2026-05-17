"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { Check, RotateCcw, X } from "lucide-react";
import type { BioConvContent, QuizItem } from "@/lib/content/bio-conv";
import { getFinishTitle } from "@/lib/content/bio-conv";

type Props = {
  content: BioConvContent;
};

type AnswerLog = {
  id: string;
  given: boolean;
  correct: boolean;
  wasRight: boolean;
};

const SWIPE_THRESHOLD = 100; // px

export function SwipeQuiz({ content }: Props) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [log, setLog] = useState<AnswerLog[]>([]);
  const [reveal, setReveal] = useState<{
    item: QuizItem;
    given: boolean;
    wasRight: boolean;
  } | null>(null);

  const items = content.items;
  const current = items[index];
  const total = items.length;
  const score = log.filter((l) => l.wasRight).length;

  const handleAnswer = useCallback(
    (given: boolean) => {
      if (!current || reveal) return;
      const wasRight = given === current.correct;
      setReveal({ item: current, given, wasRight });
      setLog((l) => [...l, { id: current.id, given, correct: current.correct, wasRight }]);
    },
    [current, reveal],
  );

  const next = useCallback(() => {
    setReveal(null);
    setIndex((i) => i + 1);
  }, []);

  const restart = useCallback(() => {
    setLog([]);
    setIndex(0);
    setReveal(null);
    setStarted(true);
  }, []);

  // Écran de départ
  if (!started) {
    return (
      <div className="rounded-3xl bg-aubergine/[0.06] p-6 text-center">
        <div
          className="prose prose-sm mx-auto max-w-none text-sm leading-relaxed text-aubergine [&_p]:my-2"
          dangerouslySetInnerHTML={{ __html: content.info }}
        />
        <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border border-cream-dark bg-cream-light p-3">
            <p className="font-serif text-base text-aubergine">← {content.rules.left.label}</p>
            <p className="mt-1 text-[11px] text-aubergine-soft">{content.rules.left.info}</p>
          </div>
          <div className="rounded-xl border border-cream-dark bg-cream-light p-3">
            <p className="font-serif text-base text-aubergine">{content.rules.right.label} →</p>
            <p className="mt-1 text-[11px] text-aubergine-soft">{content.rules.right.info}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-aubergine px-7 py-3 font-serif text-base text-cream-light shadow-md transition-transform active:scale-[0.97]"
        >
          {content.startBtn}
        </button>
      </div>
    );
  }

  // Écran final
  if (index >= total) {
    return (
      <div className="rounded-3xl bg-aubergine/[0.06] p-6 text-center">
        <p className="font-serif text-[10px] uppercase tracking-[0.4em] text-or">
          ✦ {content.scoreText.replace("{{score}}", `${score}/${total}`)}
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-aubergine">
          {getFinishTitle(score, content.finishTitles)}
        </h2>
        <div
          className="prose prose-sm mx-auto mt-5 max-w-none text-sm leading-relaxed text-aubergine [&_p]:my-2 [&_strong]:text-or"
          dangerouslySetInnerHTML={{ __html: content.finishText }}
        />

        {/* Récap réponses */}
        <ul className="mt-6 space-y-2 text-left">
          {log.map((l, i) => (
            <li
              key={l.id}
              className="flex items-start gap-2 rounded-xl border border-cream-dark bg-cream-light p-3 text-xs"
            >
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  l.wasRight ? "bg-or/20 text-or" : "bg-aubergine/20 text-aubergine"
                }`}
              >
                {l.wasRight ? <Check size={12} /> : <X size={12} />}
              </span>
              <p className="leading-snug text-aubergine">
                <span className="font-serif text-champetre">Q{i + 1}</span>{" "}
                — {items[i].question}
                <br />
                <span className="text-aubergine-soft">
                  Tu as répondu <strong>{l.given ? "Vrai" : "Faux"}</strong>,
                  réponse&nbsp;: <strong>{l.correct ? "Vrai" : "Faux"}</strong>
                </span>
              </p>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={restart}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-aubergine px-6 py-3 font-serif text-base text-cream-light shadow-md transition-transform active:scale-[0.97]"
        >
          <RotateCcw size={16} />
          Refaire le quiz
        </button>
      </div>
    );
  }

  // Jeu — carte en cours
  return (
    <div className="flex flex-col items-center">
      {/* Progress */}
      <div className="mb-3 flex w-full max-w-md items-center gap-2">
        <span className="font-serif text-xs text-champetre">
          {index + 1} / {total}
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream-dark">
          <motion.div
            className="h-full bg-or"
            initial={{ width: 0 }}
            animate={{ width: `${((index + 1) / total) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="font-serif text-xs text-or">{score}★</span>
      </div>

      {/* Card stack */}
      <div className="relative h-[400px] w-full max-w-md">
        <AnimatePresence mode="wait">
          {!reveal ? (
            <QuestionCard
              key={current.id}
              item={current}
              onAnswer={handleAnswer}
              labelLeft={content.rules.left.label}
              labelRight={content.rules.right.label}
            />
          ) : (
            <AnswerCard
              key={`answer-${reveal.item.id}`}
              item={reveal.item}
              given={reveal.given}
              wasRight={reveal.wasRight}
              onNext={next}
              isLast={index + 1 >= total}
              nextLabel={content.buttonNext}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Tap buttons (accessibility / non-swipe) */}
      {!reveal && (
        <div className="mt-4 flex w-full max-w-md gap-3">
          <button
            type="button"
            onClick={() => handleAnswer(false)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-aubergine/50 bg-cream-light px-4 py-3 font-serif text-base text-aubergine transition-colors hover:bg-aubergine hover:text-cream-light active:scale-[0.97]"
          >
            <X size={18} />
            {content.rules.left.label}
          </button>
          <button
            type="button"
            onClick={() => handleAnswer(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-or/50 bg-cream-light px-4 py-3 font-serif text-base text-or transition-colors hover:bg-or hover:text-cream-light active:scale-[0.97]"
          >
            <Check size={18} />
            {content.rules.right.label}
          </button>
        </div>
      )}

      <p className="mt-3 text-center text-xs text-aubergine-soft">
        Tu peux aussi glisser la carte ← → ou utiliser les boutons.
      </p>
    </div>
  );
}

function QuestionCard({
  item,
  onAnswer,
  labelLeft,
  labelRight,
}: {
  item: QuizItem;
  onAnswer: (given: boolean) => void;
  labelLeft: string;
  labelRight: string;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-18, 0, 18]);
  const opacityLeft = useTransform(x, [-150, -30, 0], [1, 0.4, 0]);
  const opacityRight = useTransform(x, [0, 30, 150], [0, 0.4, 1]);

  const imgSrc = useMemo(() => `/bio-conv/${item.id}_question.png`, [item.id]);

  return (
    <motion.div
      key={`q-${item.id}`}
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={(_, info) => {
        if (info.offset.x > SWIPE_THRESHOLD) onAnswer(true);
        else if (info.offset.x < -SWIPE_THRESHOLD) onAnswer(false);
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className="absolute inset-0 flex cursor-grab flex-col overflow-hidden rounded-3xl border border-cream-dark bg-cream-light shadow-lg active:cursor-grabbing"
    >
      {/* Stickers Vrai/Faux qui s'illuminent au drag */}
      <motion.span
        style={{ opacity: opacityLeft }}
        className="absolute left-4 top-4 z-10 rounded-full border-2 border-aubergine bg-cream-light px-3 py-1 font-serif text-sm text-aubergine"
      >
        {labelLeft}
      </motion.span>
      <motion.span
        style={{ opacity: opacityRight }}
        className="absolute right-4 top-4 z-10 rounded-full border-2 border-or bg-cream-light px-3 py-1 font-serif text-sm text-or"
      >
        {labelRight}
      </motion.span>

      <div className="relative h-44 w-full bg-cream">
        <Image src={imgSrc} alt="" fill className="object-contain p-3" />
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-5 text-center">
        <p className="font-serif text-lg leading-snug text-aubergine">
          {item.question}
        </p>
      </div>
    </motion.div>
  );
}

function AnswerCard({
  item,
  given,
  wasRight,
  onNext,
  isLast,
  nextLabel,
}: {
  item: QuizItem;
  given: boolean;
  wasRight: boolean;
  onNext: () => void;
  isLast: boolean;
  nextLabel: string;
}) {
  return (
    <motion.div
      key={`a-${item.id}`}
      initial={{ scale: 0.92, opacity: 0, y: 16 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.92, opacity: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className={`absolute inset-0 flex flex-col overflow-hidden rounded-3xl border-2 bg-cream-light p-5 shadow-lg ${
        wasRight ? "border-or" : "border-aubergine"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full ${
            wasRight ? "bg-or text-cream-light" : "bg-aubergine text-cream-light"
          }`}
        >
          {wasRight ? <Check size={18} /> : <X size={18} />}
        </span>
        <p className={`font-serif text-base ${wasRight ? "text-or" : "text-aubergine"}`}>
          {wasRight ? "Bien joué !" : "Pas tout à fait"}
        </p>
      </div>

      <p className="mt-2 text-xs text-aubergine-soft">
        Tu as répondu <strong className="text-aubergine">{given ? "Vrai" : "Faux"}</strong>{" "}
        — la bonne réponse est <strong className="text-aubergine">{item.correct ? "Vrai" : "Faux"}</strong>.
      </p>

      <div className="relative my-3 h-32 w-full overflow-hidden rounded-2xl bg-cream">
        <Image
          src={`/bio-conv/${item.id}_answer.png`}
          alt=""
          fill
          className="object-contain p-2"
        />
      </div>

      <p className="text-sm leading-relaxed text-aubergine">{item.answer}</p>

      <button
        type="button"
        onClick={onNext}
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-aubergine px-5 py-3 font-serif text-base text-cream-light shadow transition-transform active:scale-[0.97]"
      >
        {isLast ? "Voir mon score" : nextLabel} →
      </button>
    </motion.div>
  );
}
