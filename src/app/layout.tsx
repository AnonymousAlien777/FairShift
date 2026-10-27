import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FairShift | Decent Work & Safety Platform (UN SDG 8)",
  description:
    "A dual-interface workforce management and safety platform for Construction Sites and College Campus Support teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
