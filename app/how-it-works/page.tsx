export const metadata = {
  title: "How it works | Drive in France",
};

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Enter vehicle details",
      desc: "Registration number, country, vehicle type, fuel type, and first registration date.",
    },
    {
      title: "Upload registration document",
      desc: "Drag-and-drop PDF, JPG, or PNG of your vehicle registration. We validate readability.",
    },
    {
      title: "Confirm contact",
      desc: "Email is required for confirmation; name is optional.",
    },
    {
      title: "Review and consent",
      desc: "Check your details and acknowledge that this is a private processing service.",
    },
    {
      title: "Secure payment",
      desc: "Pay via Stripe (cards, Apple Pay, Google Pay). We include the official fee.",
    },
    {
      title: "Processing",
      desc: "We submit to the official Crit’Air service and email you next steps.",
    },
  ];

  return (
    <div className="section">
      <div className="container space-y-8">
        <div className="space-y-3">
          <p className="badge">How it works</p>
          <h1 className="text-4xl font-semibold">From start to sticker</h1>
          <p className="text-slate-600">
            A guided, mobile-friendly flow that keeps you informed at every
            step. We collect only what’s required.
          </p>
        </div>
        <div className="grid grid-2 gap-4">
          {steps.map((step, idx) => (
            <div key={step.title} className="card p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/10 font-semibold text-blue-700">
                  {idx + 1}
                </span>
                <p className="text-lg font-semibold text-slate-900">
                  {step.title}
                </p>
              </div>
              <p className="mt-2 text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="card p-6">
          <p className="text-lg font-semibold text-slate-900">
            Disclosure and data use
          </p>
          <p className="mt-2 text-slate-600">
            We are a private application assistance service and not affiliated
            with the French government. We collect vehicle details, email, and
            your uploaded registration to submit your Crit’Air application.
            Uploads are deleted after fulfilment plus 30 days. Request deletion
            anytime via contact.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a className="button" href="/apply">
            Start application
          </a>
          <a
            className="rounded-full border border-slate-300 px-4 py-3 font-semibold text-slate-800"
            href="/pricing"
          >
            View pricing
          </a>
        </div>
      </div>
    </div>
  );
}

