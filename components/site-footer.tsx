import Link from "next/link";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container grid grid-2 items-start gap-8 py-10">
        <div className="space-y-3">
          <p className="text-lg font-semibold">National Park Passes</p>
          <p className="text-sm text-slate-600 max-w-lg">
            Private booking and application assistance for Australian national park passes and permits.
          </p>
        </div>
        <div className="grid grid-2 gap-4 sm:grid-3">
          <div>
            <p className="text-sm font-semibold text-slate-700">Company</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              {footerLinks.map((link) => (
                <div key={link.href}>
                  <Link className="hover:text-blue-700" href={link.href}>
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">Support</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <Link className="hover:text-blue-700" href="/faq">
                FAQ
              </Link>
              <p>support@nationalparkpasses.com.au</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">Legal</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <Link className="hover:text-blue-700" href="/privacy">
                Privacy
              </Link>
              <Link className="hover:text-blue-700" href="/terms">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-center text-xs text-slate-600">
        This is a private application assistance service and not affiliated with
        Australian state or territory governments.
      </div>
      <div className="border-t border-slate-200 bg-slate-50 py-4">
        <div className="container flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} National Park Passes. All rights reserved.</span>
          <span>Payments processed by Stripe. Cards, Apple Pay, Google Pay supported.</span>
        </div>
      </div>
    </footer>
  );
}

