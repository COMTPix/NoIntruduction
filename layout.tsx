import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Карусель: напитки на пляже",
  description: "Карусель — круглый автомат с безалкогольными напитками на пляжах России. Выберите напиток, оплатите по СБП любым банком и заберите у крана.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFC800",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-[#FFFBF2] text-slate-900 antialiased">{children}</body>
    </html>
  );
}
