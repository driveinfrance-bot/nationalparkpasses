import CountUp from "@/components/CountUp";
import ShinyText from "@/components/ShinyText";
import "@/components/CountUp.css";

export default function Home() {
  return (
    <div>
      <section className="section bg-white">
        <div className="container space-y-8">
          <div className="hero-grid">
            <div className="space-y-6">
              <div className="badge">English-first Crit’Air assistance</div>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Get your French{" "}
                <ShinyText
                  text="Crit'Air sticker"
                  speed={3.9}
                  className="text-4xl md:text-5xl font-semibold leading-tight"
                />{" "}
                without the hassle.
              </h1>
              <p className="text-lg text-slate-700 max-w-2xl">
                English support, official fee included, secure Stripe checkout.
                Typical submission in minutes with minimal info.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a className="button" href="/apply">
                  Start application
                </a>
                <a className="ghost-link" href="#how-it-works">
                  How it works
                </a>
              </div>
              <p className="text-sm font-semibold text-slate-900">
                All-in €29.50 • Official fee included
              </p>
              <div className="chip-row text-sm text-slate-600">
                <span className="chip">Secure Stripe checkout</span>
                <span className="chip">English support &lt;24h</span>
                <span className="chip">Private service (not government)</span>
              </div>
            </div>
            <div className="card w-full p-6">
              <p className="text-sm font-semibold text-slate-800">
                What you’ll need
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>• Registration number and country</li>
                <li>• Vehicle type, fuel type, first registration date</li>
                <li>• Registration document (PDF/JPG/PNG)</li>
                <li>• Email for confirmation and updates</li>
              </ul>
              <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Customer feedback</p>
                <p>
                  “Super smooth from start to payment — clear in English and no
                  stress at all.” — Joan, Essex
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section bg-slate-50">
        <div className="container space-y-6">
          <div className="card flex flex-col gap-2 p-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-700">
                Applications processed
              </p>
              <div className="flex items-center gap-1">
                <CountUp
                  from={0}
                  to={5000}
                  separator=","
                  direction="up"
                  duration={1.2}
                  className="count-up-text"
                />
                <span className="text-xl font-semibold text-slate-800">+</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 max-w-xl">
              Over 5,000 Crit’Air applications submitted with English support.
              After submission, you receive a government-issued PDF confirmation
              (usually same day) as temporary proof while your sticker is
              mailed.
            </p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="badge">How it works</p>
              <h2 className="mt-3 text-3xl font-semibold">
                3 steps to submit your Crit’Air application
              </h2>
              <p className="mt-2 text-slate-600">
                English guidance, inline validation, and quick document upload.
              </p>
            </div>
            <a className="button hidden md:inline-flex" href="/apply">
              Start application
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                title: "Vehicle + upload",
                desc: "Enter vehicle details and upload your registration document.",
              },
              {
                title: "Contact & consent",
                desc: "Add your email, review your info, and acknowledge the private-service disclosure.",
              },
              {
                title: "Payment & confirmation",
                desc: "Secure Stripe checkout (cards, Apple Pay, Google Pay), then a government-issued PDF confirmation (usually same day) as temporary proof while your sticker is mailed. Local acceptance can vary.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <p className="text-lg font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="mt-2 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container space-y-6">
          <div className="space-y-2">
            <p className="badge">Pricing</p>
            <h2 className="text-3xl font-semibold">Simple, all-in pricing</h2>
            <p className="text-slate-600">
              One clear fee that includes the official Crit’Air charge and our
              processing support.
            </p>
            <p className="text-sm text-slate-600">
              After submission, you will receive a government-issued PDF
              confirmation (usually the same day) that serves as temporary proof
              while your official Crit’Air sticker is mailed. Use it as proof of
              application where accepted; requirements can vary by locality.
            </p>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
            <div className="card h-full p-6 flex flex-col justify-between">
              <div className="flex items-baseline gap-4">
                <div className="hidden md:flex items-baseline justify-center rounded-full border border-slate-200 bg-white/80 p-2 shadow-sm">
                  <span className="text-4xl leading-none">🏷️</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">€29.50</span>
                  <span className="text-sm text-slate-500">all-in</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    <li>✓ Document review & submission</li>
                    <li>✓ Official Crit’Air fee included</li>
                    <li>✓ Email support in English</li>
                    <li>✓ Secure Stripe checkout</li>
                  </ul>
                </div>
              </div>
              <a className="button mt-5 w-full justify-center" href="/pricing">
                See pricing details
              </a>
            </div>
            <div className="card h-full p-6 border-blue-100 shadow-md shadow-blue-50/40">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Why drivers choose us
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>• English-first flow, no translation needed</li>
                <li>• Mobile-friendly for travelers</li>
                <li>• Minimal data collection and clear consent</li>
                <li>• Transparency: private service, not government</li>
                <li>• Stripe-native payments incl. wallets</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container grid items-center gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <p className="badge">FAQ highlights</p>
            <h2 className="text-3xl font-semibold">Common questions</h2>
            <p className="text-slate-600">
              Full FAQ available for detailed eligibility and timing questions.
            </p>
            <a className="button" href="/faq">
              Read FAQ
            </a>
          </div>
          <div className="card space-y-4 p-6 text-sm text-slate-700">
            <div>
              <p className="font-semibold text-slate-900">
                How long does it take?
              </p>
              <p className="mt-1">
                Submissions are sent same-day; official issuance typically
                follows within a few days depending on volume.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">
                What documents are required?
              </p>
              <p className="mt-1">
                Your vehicle registration document in PDF, JPG, or PNG. We’ll
                prompt for re-upload if the file is unreadable.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">
                What cities require the sticker?
              </p>
              <p className="mt-1">
                Crit’Air is required in low-emission zones (ZFEs), especially in
                major metros such as Paris, Lyon, Grenoble, Strasbourg,
                Toulouse, Montpellier, Nice, and Reims. Rules can expand or
                tighten during pollution episodes, so always check your exact
                route before travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container grid items-center gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="card p-6">
            <p className="badge">Blog</p>
            <h2 className="mt-3 text-3xl font-semibold">
              Guides for driving in France
            </h2>
            <p className="mt-2 text-slate-600">
              Learn about low-emission zones, how Crit’Air works, and tips for
              visitors.
            </p>
            <a className="button mt-4 w-fit" href="/blog">
              Browse blog
            </a>
          </div>
          <div className="grid grid-2 gap-4">
            {[
              "Where Crit’Air is required in 2026",
              "What to know before driving into Paris",
              "How to pick your Crit’Air category",
              "What happens after you pay for Crit’Air",
            ].map((title) => (
              <div key={title} className="card p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">{title}</p>
                <p className="mt-1 text-slate-600">
                  Read the guide and apply in minutes from the same page.
                </p>
                <a className="mt-2 inline-flex text-blue-700" href="/blog">
                  Read more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-900 text-white">
        <div className="container grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="badge bg-white/10 text-white ring-1 ring-white/40">
              Ready to apply?
            </p>
            <h2 className="text-3xl font-semibold">
              Start now with secure checkout and English support.
            </h2>
            <p className="text-slate-200">
              We collect only what’s required to process your Crit’Air sticker
              and keep your documents for the minimum time needed.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a className="button" href="/apply">
                Start application
              </a>
              <a className="underline-offset-4 hover:underline" href="/pricing">
                View pricing
              </a>
            </div>
          </div>
          <div className="card border-white/10 bg-white/5 p-6">
            <p className="text-lg font-semibold text-slate-900">
              What happens after payment?
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-900">
              <li>• You get an email confirmation and receipt.</li>
              <li>• We submit your application with the official service.</li>
              <li>• We delete uploads after fulfilment + 30 days.</li>
              <li>• You can request deletion anytime via contact.</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-lg md:hidden">
        <div className="flex flex-col gap-2">
          <a className="button w-full justify-center" href="/apply">
            Start your Crit’Air application
          </a>
          <p className="text-xs text-slate-600">
            Private service, not government. All-in €29.50 incl. official fee.
          </p>
        </div>
      </div>
    </div>
  );
}
