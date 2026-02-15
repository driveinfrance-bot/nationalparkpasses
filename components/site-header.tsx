"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import CartBadge from "@/components/passes/cart-badge";

const navItems = [
  { href: "/passes", label: "Pass finder" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        aria-label="Toggle navigation"
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 shadow-sm"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open ? (
        <div className="mt-3 space-y-2 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-2 py-2 text-slate-700 hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/passes"
            className="button w-full justify-center"
            onClick={() => setOpen(false)}
          >
            Start booking
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="container flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/national-park-passes-logo.svg"
            alt="National Park Passes"
            width={280}
            height={72}
            className="h-12 w-auto sm:h-14"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[#1F3A2E]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <CartBadge />
          <Link href="/passes" className="button text-sm">
            Start booking
          </Link>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
