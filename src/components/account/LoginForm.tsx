"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; email: string } | { kind: "error"; message: string };

/**
 * Formulaire magic link. Demande l'email, envoie un OTP/magic link Supabase,
 * affiche l'état "lien envoyé, va voir ta boîte". L'arrivée sur /auth/callback
 * est gérée par le route handler.
 *
 * Le `next` permet de revenir là où on était (typiquement le carnet) après login.
 */
export function LoginForm({ next = "/chapitres/degustation/carnet" }: { next?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus({ kind: "sending" });

    const supabase = createSupabaseBrowserClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo, shouldCreateUser: true },
    });

    if (error) {
      setStatus({ kind: "error", message: error.message });
      return;
    }
    setStatus({ kind: "sent", email: email.trim() });
  }

  if (status.kind === "sent") {
    return (
      <div className="rounded-3xl bg-or/10 p-6 text-center">
        <CheckCircle2 size={32} className="mx-auto text-or" />
        <h3 className="mt-3 font-serif text-lg text-aubergine">Vérifie ta boîte mail</h3>
        <p className="mt-2 text-sm text-aubergine-soft">
          On t&rsquo;a envoyé un lien à <strong className="text-aubergine">{status.email}</strong>.
          Clique dessus depuis ce téléphone pour ouvrir ton carnet de cave.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-4 text-xs text-aubergine-soft underline"
        >
          Utiliser une autre adresse
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-xs uppercase tracking-[0.18em] text-aubergine-soft">
          Ton email
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-2xl border border-cream-dark bg-cream-light px-4 py-3">
          <Mail size={16} className="shrink-0 text-aubergine-soft" />
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="toi@exemple.fr"
            className="w-full bg-transparent text-sm text-aubergine outline-none placeholder:text-aubergine-soft/60"
            disabled={status.kind === "sending"}
          />
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-aubergine-soft">
          On t&rsquo;envoie un lien magique. Pas de mot de passe à retenir.
        </p>
      </div>

      <button
        type="submit"
        disabled={status.kind === "sending" || !email.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-aubergine px-5 py-3 font-serif text-sm text-cream-light transition-opacity disabled:opacity-50"
      >
        {status.kind === "sending" ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Envoi…
          </>
        ) : (
          "Recevoir le lien"
        )}
      </button>

      {status.kind === "error" && (
        <p className="text-xs text-red-700" role="alert">
          {status.message}
        </p>
      )}
    </form>
  );
}
