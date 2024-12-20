import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_HOST ? new URL(process.env.NEXT_PUBLIC_HOST) : undefined,
  // title: "Pastelería El Postre | Postres de alta calidad",
  title: {
    default: "Pastelería El Postre | Postres de alta calidad",
    template: "%s | Pastelería El Postre",
  },
  description: "Más de 20 años ofreciendo postres de calidad que nos destacan como una marca líder en la región.",
  openGraph: {
    title: "Pastelería El Postre | Postres de alta calidad",
    description: "Más de 20 años ofreciendo postres de calidad que nos destacan como una marca líder en la región.",
    type: "website",
    locale: "es_ES",
    url: process.env.NEXT_PUBLIC_HOST,
    siteName: "Pastelería El Postre",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CartProvider>
        <body className={inter.className}>{children}</body>
      </CartProvider>
    </html>
  );
}