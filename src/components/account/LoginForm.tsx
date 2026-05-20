"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; email: string }
  | { kind: "error"; message: string };

/**
 * Formulaire magic link en style field-guide :
 * input sous-ligné (pas de bubble), bouton aubergine arrondi.
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
      <div>
        <CheckCircle2 size={32} className="text-or" strokeWidth={1.5} />
        <h3
          className="mt-6 display text-aubergine"
          style={{ fontSize: "var(--text-2xl)" }}
        >
          Vérifie ta boîte mail.
        </h3>
        <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-aubergine-soft">
          On t&rsquo;a envoyé un lien à <span className="text-aubergine">{status.email}</span>.
          Clique dessus depuis ce téléphone pour ouvrir ton carnet de cave.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-8 text-sm text-aubergine-soft underline-offset-4 transition-colors hover:text-or hover:underline"
        >
          Utiliser une autre adresse
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label
          htmlFor="email"
          className="block font-serif text-sm text-aubergine-soft"
        >
          Ton email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="toi@exemple.fr"
          className="mt-3 w-full border-b border-cream-dark bg-transparent py-3 text-lg text-aubergine outline-none placeholder:text-aubergine-soft/40 focus:border-or"
          style={{
            transition: "border-color 260ms var(--ease-out-quart)",
            fontFamily: "var(--font-sans)",
          }}
          disabled={status.kind === "sending"}
        />
        <p className="mt-3 text-xs leading-relaxed text-aubergine-soft">
          Pas de mot de passe à retenir. Un lien magique arrive dans la minute.
        </p>
      </div>

      <button
        type="submit"
        disabled={status.kind === "sending" || !email.trim()}
        className="inline-flex items-center gap-3 rounded-full bg-aubergine px-7 py-3.5 font-serif text-base text-cream-light transition-all duration-200 hover:-translate-y-0.5 hover:bg-aubergine-deep active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-aubergine"
        style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
      >
        {status.kind === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Envoi…
          </>
        ) : (
          <>
            Recevoir le lien <span aria-hidden="true">→</span>
          </>
        )}
      </button>

      {status.kind === "error" && (
        <p className="text-sm text-red-800" role="alert">
          {status.message}
        </p>
      )}
    </form>
  );
}
