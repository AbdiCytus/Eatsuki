import type { Metadata, Viewport } from "next";
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
  title: "Eatsuki | Landing Page",
  description:
    "Makan Enak Nggak Perlu Tunggu Nanti. Temukan Menu Favoritmu dan Nikmati Tiap Gigitannya Bersama Eatsuki! Makanan cepat saji dan aneka side dish terlezat.",
  keywords: ["eatsuki", "makanan cepat saji", "fast food", "side dish", "burger", "kebab", "rice bowl"],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Eatsuki | Landing Page",
    description:
      "Makan Enak Nggak Perlu Tunggu Nanti. Temukan Menu Favoritmu dan Nikmati Tiap Gigitannya Bersama Eatsuki!",
    type: "website",
    locale: "id_ID",
    siteName: "Eatsuki",
  },
};

/** Responsive viewport — prevents mobile zoom on input focus */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F97316",
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
