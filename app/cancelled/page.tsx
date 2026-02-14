import Link from "next/link";

export const metadata = {
  title: "Payment cancelled | Drive in France",
};

export default function CancelledPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const orderId = searchParams?.orderId;
  return (
    <div className="section">
      <div className="container max-w-2xl space-y-4 text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-2xl font-semibold">
          ✕
        </div>
        <h1 className="text-4xl font-semibold">Payment cancelled</h1>
        <p className="text-slate-600">
          Your payment was cancelled. No charges have been made. You can try
          again or contact us if you need assistance.
        </p>
        {orderId ? (
          <p className="text-sm text-slate-600">Order ID: {orderId}</p>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link className="button" href="/apply">
            Try again
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
