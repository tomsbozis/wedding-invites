import "./globals.css";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
});

export const metadata = {
  title: "Kāzu ielūgums",
  description: "Digitāls kāzu ielūgums",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lv" className={`${playfair.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}