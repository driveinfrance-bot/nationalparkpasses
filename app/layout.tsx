import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drive in France | Crit’Air Sticker Help",
  description:
    "Apply for your French Crit’Air emissions sticker with fast, English-language help. Private processing service with secure checkout.",
  metadataBase: new URL("https://driveinfrance.co"),
  openGraph: {
    title: "Drive in France | Crit’Air Sticker Help",
    description:
      "Private assistance to get your French Crit’Air emissions sticker. Mobile-friendly, English-first, secure checkout.",
    url: "https://driveinfrance.co",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}
      >
        <SiteHeader />
        <main className="min-h-[70vh] pb-16">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
