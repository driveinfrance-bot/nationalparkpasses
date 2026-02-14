import ApplyEmbed from "@/components/apply/apply-embed";

export const metadata = {
  title: "Apply for Crit’Air | Drive in France",
  description:
    "English-first, mobile-friendly flow to submit your Crit’Air application with secure Stripe checkout.",
};

export default function ApplyPage() {
  return (
    <div className="section">
      <div className="container grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          <p className="badge">Application</p>
          <h1 className="text-4xl font-semibold">Apply in minutes</h1>
          <p className="text-slate-600">
            We collect only what’s required: vehicle details, your email, and your
            registration document. After submitting, you'll be redirected to complete
            payment securely with Stripe.
          </p>
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Disclosure</p>
            <p>
              This is a private application assistance service and not
              affiliated with the French government. Price shown includes the
              official fee.
            </p>
          </div>
        </div>
        <ApplyEmbed />
      </div>
    </div>
  );
}
