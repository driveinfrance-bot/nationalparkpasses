import Link from "next/link";

const states = ["NSW", "QLD", "VIC", "WA", "SA", "TAS", "NT", "ACT"];

export default function Home() {
  return (
    <div className="section bg-slate-50">
      <div className="container space-y-10">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_640px]">
          <section className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Book national park passes in minutes.
            </h1>
            <p className="max-w-2xl text-lg text-slate-700">
              Find the right pass, checkout securely, and we submit on your behalf. Most passes
              are processed within 12 hours.
            </p>
            <p className="max-w-2xl rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
              Private service, not government.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {states.map((state) => (
                <Link
                  key={state}
                  href={state === "NSW" ? "/nsw/annual-pass" : "/passes"}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-800 hover:border-[#1F3A2E] hover:text-[#1F3A2E]"
                >
                  {state}
                </Link>
              ))}
            </div>
          </section>

          <div className="w-full max-w-[640px] justify-self-end rounded-lg border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-slate-900">NSW annual pass quick start</p>
            <p className="mt-1 text-sm text-slate-600">
              Start with NSW annual passes and complete your details in one flow.
            </p>
            <Link href="/nsw/annual-pass" className="button mt-4 w-full justify-center">
              Find my pass
            </Link>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Choose your pass",
              desc: "Select the right annual pass type and duration for your travel plans.",
            },
            {
              title: "Enter details once",
              desc: "Provide vehicle and personal details in one simple, mobile-first form.",
            },
            {
              title: "We submit for you",
              desc: "Private booking assistance with secure checkout and processing updates.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-lg font-semibold text-slate-900">{item.title}</p>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
