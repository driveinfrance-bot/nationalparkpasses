export const metadata = {
  title: "FAQ | Drive in France",
};

const faqs = [
  {
    q: "Is this an official government site?",
    a: "No. We are a private application assistance service and not affiliated with the French government. We include the official Crit’Air fee in our price.",
  },
  {
    q: "What documents do I need?",
    a: "Your vehicle registration document in PDF, JPG, or PNG. We only collect what’s required to submit your application.",
  },
  {
    q: "How long does it take?",
    a: "We submit your application the same day in most cases. Official processing times vary; many are issued within a few business days.",
  },
  {
    q: "How will I receive confirmation?",
    a: "We send an email receipt immediately after payment. After submission, you will receive a government-issued PDF confirmation, usually the same day, which serves as temporary proof while your official Crit’Air sticker is mailed. Acceptance can vary by locality and official processing times.",
  },
  {
    q: "What if my upload is unreadable?",
    a: "We’ll email you to re-upload. If we cannot proceed, we’ll refund the service fee portion.",
  },
  {
    q: "When do you delete my documents?",
    a: "Uploads are deleted after fulfilment plus 30 days. You can also request deletion sooner by contacting us.",
  },
];

export default function FaqPage() {
  return (
    <div className="section">
      <div className="container space-y-6">
        <div>
          <p className="badge">FAQ</p>
          <h1 className="mt-3 text-4xl font-semibold">Common questions</h1>
          <p className="mt-2 text-slate-600">
            If you don’t see your question, reach out via the contact page—we’ll
            reply quickly.
          </p>
        </div>
        <div className="grid grid-2 gap-4">
          {faqs.map((item) => (
            <div key={item.q} className="card p-5">
              <p className="text-lg font-semibold text-slate-900">{item.q}</p>
              <p className="mt-2 text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="card p-6">
          <p className="text-sm font-semibold text-slate-900">
            Need more help?
          </p>
          <p className="text-slate-600">
            Email support@driveinfrance.co or message us through the contact
            form. We respond in English.
          </p>
          <div className="mt-4 flex gap-3">
            <a className="button" href="/apply">
              Start application
            </a>
            <a
              className="rounded-full border border-slate-300 px-4 py-3 font-semibold text-slate-800"
              href="/contact"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

