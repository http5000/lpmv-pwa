import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.lepetitmuseeduvin.app",
  appName: "Le Petit Musée du Vin",
  /** Dossier des assets web — généré par `npm run cap:build` */
  webDir: "out",
  server: {
    /**
     * En développement : pointer vers le serveur Next local pour le live reload.
     * Commenter pour utiliser les assets statiques (production).
     *
     * androidScheme: "https" — évite les erreurs de mixed content sur Android
     */
    androidScheme: "https",
    // url: "http://192.168.x.x:3000", // ← Décommenter pour dev live reload
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1800,
      backgroundColor: "#310E31", // --color-aubergine
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      spinnerColor: "#CA9A2F", // --color-or
      launchAutoHide: true,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#310E31", // --color-aubergine
      overlaysWebView: false,
    },
    App: {
      // Deep link scheme — gère les redirections Supabase auth
      // ex : lpmv://auth/callback?code=...
    },
  },
};

export default config;
