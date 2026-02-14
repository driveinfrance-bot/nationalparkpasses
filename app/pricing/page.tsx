import Link from "next/link";

export const metadata = {
  title: "Pricing | Drive in France",
};

export default function PricingPage() {
  return (
    <div className="section">
      <div className="container grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <p className="badge">Transparent pricing</p>
          <h1 className="text-4xl font-semibold">Simple, all-in price</h1>
          <p className="text-slate-600">
            One clear fee that includes the official Crit’Air charge and our
            English-language processing support. No hidden extras.
          </p>
          <div className="card p-6">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-semibold">€29.50</span>
              <span className="text-sm text-slate-500">all-in</span>
            </div>
            <p className="mt-2 text-slate-600">
              Includes official Crit’Air fee, application handling, and English
              support.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>✓ Step-by-step English form</li>
              <li>✓ Document checks before submission</li>
              <li>✓ Stripe-secured payment (cards, Apple Pay, Google Pay)</li>
              <li>✓ Email updates</li>
              <li>✓ Upload deletion after fulfilment + 30 days</li>
            </ul>
            <Link className="button mt-5 w-full justify-center" href="/apply">
              Start application
            </Link>
          </div>
        </div>
        <div className="card space-y-4 p-6">
          <p className="text-lg font-semibold text-slate-900">
            Why we charge a service fee
          </p>
          <p className="text-slate-600">
            We translate the process, validate your inputs, and submit on your
            behalf so you don’t have to navigate the French-language forms.
          </p>
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">What’s included</p>
            <p className="mt-1">
              Clear step-by-step guidance, document checks before submission,
              secure checkout, and status updates by email throughout your
              application.
            </p>
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Refunds</p>
            <p>
              If payment succeeds but submission fails due to our error, we will
              refund the service fee portion. Official fees may not be
              refundable once submitted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
