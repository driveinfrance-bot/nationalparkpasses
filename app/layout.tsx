import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { ThemeProvider } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "National Park Passes | Book passes online",
  description:
    "Book Australian national park passes in minutes. Secure Stripe checkout and private booking assistance, processed within 12 hours.",
  metadataBase: new URL("https://nationalparkpasses.com.au"),
  openGraph: {
    title: "National Park Passes | Book passes online",
    description:
      "Find park passes by state, add multiple items to cart, and checkout securely with Stripe.",
    url: "https://nationalparkpasses.com.au",
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
        <ThemeProvider appearance="light" accentColor="gray">
          <SiteHeader />
          <main className="min-h-[70vh] pb-16">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
