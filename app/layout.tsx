import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

/**
 * Heading font: Plus Jakarta Sans
 * Used for titles, headings, and the brand logo.
 * Exposed as CSS variable --font-jakarta for Tailwind.
 */
const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/**
 * Body font: Inter
 * Used for body text, descriptions, and UI elements.
 * Exposed as CSS variable --font-inter for Tailwind.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Eatsuki — Solusi Cepat dan Tepat di Waktu Lapar",
  description:
    "Makan Enak Nggak Perlu Tunggu Nanti. Temukan Menu Favoritmu dan Nikmati Tiap Gigitannya Bersama Eatsuki! Makanan cepat saji dan aneka side dish terlezat.",
  keywords: ["eatsuki", "makanan cepat saji", "fast food", "side dish", "burger", "kebab", "rice bowl"],
  openGraph: {
    title: "Eatsuki — Solusi Cepat dan Tepat di Waktu Lapar",
    description:
      "Makan Enak Nggak Perlu Tunggu Nanti. Temukan Menu Favoritmu dan Nikmati Tiap Gigitannya Bersama Eatsuki!",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${jakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
