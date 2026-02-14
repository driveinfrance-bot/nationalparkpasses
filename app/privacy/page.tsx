export const metadata = {
  title: "Privacy policy | Drive in France",
};

export default function PrivacyPage() {
  return (
    <div className="section">
      <div className="container space-y-4">
        <h1 className="text-4xl font-semibold">Privacy policy</h1>
        <p className="text-slate-600">
          We collect only the data required to process your Crit’Air
          application: vehicle details, your email, and your registration
          document. Name is optional. Payments are processed by Stripe; we do
          not store card details.
        </p>
        <div className="space-y-3 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Data we collect</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Vehicle info: registration number, country, vehicle type, fuel, first registration date.</li>
            <li>Upload: registration document (PDF/JPG/PNG).</li>
            <li>Contact: email (required), name (optional).</li>
          </ul>
          <p className="font-semibold text-slate-900">How we use it</p>
          <p>
            To prepare and submit your Crit’Air application and send status
            updates. We do not sell or share your data with advertisers.
          </p>
          <p className="font-semibold text-slate-900">Retention</p>
          <p>
            Uploads are deleted after fulfilment plus 30 days. Orders may be
            retained for recordkeeping. You can request deletion at any time by
            emailing support@driveinfrance.co.
          </p>
          <p className="font-semibold text-slate-900">Legal basis</p>
          <p>
            Your consent and performance of the service you request. You may
            withdraw consent before submission by contacting us.
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Contact</p>
          <p>Email: support@driveinfrance.co</p>
        </div>
      </div>
    </div>
  );
}

