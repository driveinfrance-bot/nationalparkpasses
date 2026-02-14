export const metadata = {
  title: "Terms of service | Drive in France",
};

export default function TermsPage() {
  return (
    <div className="section">
      <div className="container space-y-4">
        <h1 className="text-4xl font-semibold">Terms of service</h1>
        <div className="space-y-3 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Service</p>
          <p>
            We provide private assistance to submit Crit’Air applications. We
            are not affiliated with the French government.
          </p>
          <p className="font-semibold text-slate-900">Pricing</p>
          <p>
            The displayed all-in price includes the official fee and our
            service fee. Payment is processed by Stripe. Taxes, if applicable,
            are included.
          </p>
          <p className="font-semibold text-slate-900">Refunds</p>
          <p>
            If we cannot process your application due to our error, we will
            refund the service fee portion. Official fees may be non-refundable
            once submitted.
          </p>
          <p className="font-semibold text-slate-900">User obligations</p>
          <p>
            You agree to provide accurate information and documents. Providing
            false data may result in rejection; we are not liable for incorrect
            inputs.
          </p>
          <p className="font-semibold text-slate-900">Data handling</p>
          <p>
            We collect only necessary data to process your application. Uploads
            are deleted after fulfilment plus 30 days. See our Privacy Policy
            for details.
          </p>
          <p className="font-semibold text-slate-900">Contact</p>
          <p>Email: support@driveinfrance.co</p>
        </div>
      </div>
    </div>
  );
}

