/**
 * Route Handler — Stripe Webhook
 *
 * Écoute l'événement `checkout.session.completed` et met à jour
 * `profiles.premium_access = true` dans Supabase pour l'utilisateur concerné.
 *
 * Pour enregistrer le webhook dans Stripe :
 *   stripe listen --forward-to localhost:3000/api/stripe/webhook   (dev)
 *   Stripe Dashboard > Webhooks > Add endpoint (prod)
 *
 * Événements à activer : checkout.session.completed
 */

import { NextRequest, NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import Stripe from "stripe";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // ── 1. Vérifier la signature Stripe ──────────────────────────────────────
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Signature invalide";
    console.error("[Stripe webhook] Signature invalide :", msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  // ── 2. Traiter checkout.session.completed ────────────────────────────────
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;
    const stripeCustomerId =
      typeof session.customer === "string" ? session.customer : null;

    if (!email) {
      console.warn("[Stripe webhook] Pas d'email dans la session :", session.id);
      return NextResponse.json({ received: true });
    }

    const supabase = createSupabaseServiceClient();

    // Retrouver l'utilisateur Supabase par email via admin API
    const {
      data: { users },
      error: listError,
    } = await supabase.auth.admin.listUsers();

    if (listError) {
      console.error("[Stripe webhook] Erreur listUsers :", listError.message);
      return NextResponse.json({ error: "Supabase error" }, { status: 500 });
    }

    const user = users.find(
      (u: User) => u.email?.toLowerCase() === email.toLowerCase(),
    );

    if (!user) {
      // Utilisateur pas encore inscrit — on log, on ne bloque pas le webhook
      console.warn(
        `[Stripe webhook] Utilisateur non trouvé pour l'email ${email}. Achat enregistré dans Stripe (session ${session.id}) mais pas de profil Supabase.`,
      );
      return NextResponse.json({ received: true });
    }

    // Mettre à jour le profil
    const { error: updateError } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          premium_access: true,
          access_type: "stripe",
          purchased_at: new Date().toISOString(),
          stripe_customer_id: stripeCustomerId,
        },
        { onConflict: "id" },
      );

    if (updateError) {
      console.error(
        "[Stripe webhook] Erreur update profiles :",
        updateError.message,
      );
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }

    console.log(
      `[Stripe webhook] Premium activé pour ${email} (user ${user.id})`,
    );
  }

  return NextResponse.json({ received: true });
}
