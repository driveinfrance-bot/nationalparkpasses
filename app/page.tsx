export default function Home() {
  return (
    <div>
      <section className="section bg-white">
        <div className="container grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <p className="badge">National Park Passes Australia</p>
            <h1 className="text-4xl font-semibold md:text-5xl">Book national park passes in minutes.</h1>
            <p className="text-lg text-slate-700">
              Find the right pass, checkout securely, and we submit on your behalf. Most passes are processed within 12 hours.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/passes" className="button">Find my pass</a>
              <a href="/how-it-works" className="ghost-link">How it works</a>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              National Park Passes is a private booking and application assistance service and is not affiliated with Australian state or territory governments.
            </div>
          </div>
          <div className="card p-6">
            <p className="font-semibold text-slate-900">Why people use us</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Dynamic pass finder by state and activity</li>
              <li>• Multi-item cart for cross-state trips</li>
              <li>• Secure Stripe checkout</li>
              <li>• Email updates during processing</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
