import Link from "next/link";

export const metadata = {
  title: "Application received | Drive in France",
};

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const orderId = searchParams?.orderId;
  return (
    <div className="section">
      <div className="container max-w-2xl space-y-4 text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-2xl font-semibold">
          ✓
        </div>
        <h1 className="text-4xl font-semibold">We’ve received your order</h1>
        <p className="text-slate-600">
          A confirmation email is on the way with what happens next. We’ll
          review your documents and submit to the official Crit’Air service.
        </p>
        {orderId ? (
          <p className="text-sm text-slate-600">Order ID: {orderId}</p>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link className="button" href="/blog">
            Read driving guides
          </Link>
          <Link
            className="rounded-full border border-slate-300 px-4 py-3 font-semibold text-slate-800"
            href="/contact"
          >
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}

