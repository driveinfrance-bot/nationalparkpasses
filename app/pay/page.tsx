import { prisma } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import PayButton from "./pay-button";

type PayPageProps = {
  searchParams?: {
    response_id?: string | string[];
    responseId?: string | string[];
    submission_id?: string | string[];
    submissionId?: string | string[];
  };
};

export default async function PayPage({ searchParams }: PayPageProps) {
  const responseParam =
    searchParams?.response_id ??
    searchParams?.responseId ??
    searchParams?.submission_id ??
    searchParams?.submissionId;
  const responseId = Array.isArray(responseParam) ? responseParam[0] : responseParam;

  if (!responseId) {
    return (
      <div className="section">
        <div className="container space-y-4">
          <h1 className="text-3xl font-semibold">Submission not found</h1>
          <p className="text-slate-600">
            We couldn't find your submission. Please start a new application.
          </p>
          <Link className="button w-fit" href="/apply">
            Go to application
          </Link>
        </div>
      </div>
    );
  }

  const order = await prisma.order.findUnique({
    where: { tallyResponseId: responseId },
  });

  if (!order) {
    return (
      <div className="section">
        <div className="container space-y-4">
          <h1 className="text-3xl font-semibold">Submission not found</h1>
          <p className="text-slate-600">
            Your submission may still be processing. Please wait a moment and try again.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className="button w-fit" href="/apply">
              Submit again
            </Link>
            <Link className="button w-fit" href="/contact">
              Contact support
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (order.status === "paid") {
    redirect(`/success?orderId=${order.id}`);
  }

  return (
    <div className="section">
      <div className="container space-y-4">
        <h1 className="text-3xl font-semibold">Complete your payment</h1>
        <p className="text-slate-600">
          You're almost done. Continue to Stripe to finish your application.
        </p>
        <PayButton orderId={order.id} />
      </div>
    </div>
  );
}
