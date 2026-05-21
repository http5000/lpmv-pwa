"use client";

import { useState } from "react";

export function CheckoutForm({ paymentLinkUrl }: { paymentLinkUrl: string }) {
  const [code, setCode] = useState("");
  const [codeStatus, setCodeStatus] = useState<"idle" | "applied">("idle");

  const paymentLinkBase = paymentLinkUrl;

  const handleBuy = () => {
    const url = code.trim()
      ? `${paymentLinkBase}?prefilled_promo_code=${encodeURIComponent(code.trim().toUpperCase())}`
      : paymentLinkBase;
    window.location.href = url;
  };

  return (
    <div className="space-y-4">
      {/* Champ code promo */}
      <div className="space-y-2">
        <label
          htmlFor="promo-code"
          className="block font-serif text-sm italic text-champetre"
        >
          Code musée (optionnel)
        </label>
        <div className="flex gap-2">
          <input
            id="promo-code"
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setCodeStatus("idle");
            }}
            placeholder="Ex : MUSEE-0042"
            className="flex-1 rounded-xl border border-cream-dark bg-cream-light px-4 py-3 font-serif text-sm tracking-wider text-aubergine placeholder:text-aubergine/30 focus:border-or focus:outline-none"
          />
          {code.trim() && codeStatus === "idle" && (
            <button
              type="button"
              onClick={() => setCodeStatus("applied")}
              className="rounded-xl border border-or px-4 py-3 font-serif text-sm text-or transition-all hover:bg-or/[0.08]"
            >
              Appliquer
            </button>
          )}
        </div>
        {codeStatus === "applied" && (
          <p className="font-serif text-xs italic text-or">
            ✓ Code appliqué — la réduction s&rsquo;affichera sur la page de paiement Stripe.
          </p>
        )}
        <p className="text-xs text-aubergine/40">
          Les codes musée sont distribués à l&rsquo;entrée du Petit Musée du Vin.
        </p>
      </div>

      {/* Bouton principal */}
      <button
        onClick={handleBuy}
        className="w-full rounded-2xl py-4 font-serif text-base shadow-lg transition-all active:scale-[0.98]"
        style={{
          background: "var(--color-or)",
          color: "var(--color-aubergine)",
        }}
      >
        {code.trim() ? "Payer avec mon code →" : "Accéder pour 19,90 € →"}
      </button>

      {/* Trust */}
      <p className="text-center text-xs text-aubergine/40">
        Paiement sécurisé Stripe · Accès à vie · Sans abonnement
      </p>
    </div>
  );
}
