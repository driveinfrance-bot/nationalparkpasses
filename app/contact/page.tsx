import ContactForm from "@/components/contact-form";

export const metadata = {
  title: "Contact | Drive in France",
};

export default function ContactPage() {
  return (
    <div className="section">
      <div className="container grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          <p className="badge">Contact</p>
          <h1 className="text-4xl font-semibold">We’re here to help</h1>
          <p className="text-slate-600">
            Send us a note about your application, documents, or anything else.
            We reply quickly in English.
          </p>
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Email</p>
            <p>support@driveinfrance.co</p>
          </div>
        </div>
        <div className="card p-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

