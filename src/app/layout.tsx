import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Josefin_Sans } from "next/font/google";
import "./globals.css";

/**
 * Typographies — charte LPMV
 * - Corps : Josefin Sans (officiel, Google Fonts)
 * - Titres : Cormorant Garamond en SUBSTITUT temporaire de Ambroise Light
 *   (Ambroise est une typo licenciée Typofonderie, non disponible sur Google Fonts).
 *   À swap dès qu'on a la licence : remplacer ce font par un @font-face Ambroise local.
 */
const sans = Josefin_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500"],
  display: "swap",
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Le Petit Musée du Vin — Compagnon",
  description:
    "Prolonge ta visite du Petit Musée du Vin. Deviens l'apprenti d'un vigneron imaginaire.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LPMV",
  },
};

export const viewport: Viewport = {
  themeColor: "#310E31", // aubergine — couleur signature
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-aubergine font-sans">
        {children}
      </body>
    </html>
  );
}
