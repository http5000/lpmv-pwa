-- ============================================================
-- Migration : table profiles (accès premium)
-- Appliquer via : node scripts/supabase-admin.mjs query scripts/supabase-migration-premium.sql
-- ============================================================

-- Table profiles — une ligne par utilisateur auth.users
CREATE TABLE IF NOT EXISTS profiles (
  id               UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  premium_access   BOOLEAN     NOT NULL DEFAULT FALSE,
  access_type      TEXT        CHECK (access_type IN ('free', 'stripe', 'museum_code', 'gift')),
  purchased_at     TIMESTAMPTZ,
  stripe_customer_id TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security : chaque utilisateur ne voit que sa propre ligne
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "own_profile_select" ON profiles;
CREATE POLICY "own_profile_select" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "own_profile_update" ON profiles;
CREATE POLICY "own_profile_update" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Le service_role (webhook Stripe) bypass RLS → pas besoin de policy INSERT/UPDATE supplémentaire

-- Trigger : créer automatiquement un profil vide à chaque inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
