import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import PayRedirect from "./pay-redirect";

type PayPageProps = {
  searchParams?: Promise<{
    response_id?: string | string[];
    responseId?: string | string[];
    respondent_id?: string | string[];
    respondentId?: string | string[];
    submission_id?: string | string[];
    submissionId?: string | string[];
  }>;
};

export default async function PayPage({ searchParams }: PayPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const responseParam =
    resolvedSearchParams?.response_id ??
    resolvedSearchParams?.responseId ??
    resolvedSearchParams?.respondent_id ??
    resolvedSearchParams?.respondentId ??
    resolvedSearchParams?.submission_id ??
    resolvedSearchParams?.submissionId;
  const rawResponseId = Array.isArray(responseParam) ? responseParam[0] : responseParam;
  const looksLikeTemplatePlaceholder =
    !rawResponseId ||
    rawResponseId.includes("{{") ||
    rawResponseId.includes("}}") ||
    rawResponseId.startsWith("@") ||
    rawResponseId.toLowerCase().includes("respondent id");
  const responseId = looksLikeTemplatePlaceholder ? undefined : rawResponseId;

  const paymentLinkUrl = process.env.STRIPE_PAYMENT_LINK_URL;

  let order = null;
  if (responseId) {
    try {
      order = await prisma.order.findUnique({
        where: { tallyResponseId: responseId },
      });
    } catch (error) {
      console.error("Failed to fetch order for payment page", {
        responseId,
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  if (order?.status === "paid") {
    return <PayRedirect destination={`/success?orderId=${order.id}`} />;
  }

  if (paymentLinkUrl) {
    try {
      const url = new URL(paymentLinkUrl);
      if (order?.email) {
        url.searchParams.set("prefilled_email", order.email);
      }
      return <PayRedirect destination={url.toString()} />;
    } catch (error) {
      console.error("Invalid STRIPE_PAYMENT_LINK_URL", error);
    }
  }

  if (!stripe) {
    return (
      <div className="section">
        <div className="container space-y-4">
          <h1 className="text-3xl font-semibold">Payment unavailable</h1>
          <p className="text-slate-600">
            We&apos;re having trouble connecting to our payment processor. Please try again
            shortly or contact support.
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

  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) {
    return (
      <div className="section">
        <div className="container space-y-4">
          <h1 className="text-3xl font-semibold">Payment unavailable</h1>
          <p className="text-slate-600">
            Stripe is not configured. Please contact support so we can help you complete
            payment.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className="button w-fit" href="/contact">
              Contact support
            </Link>
          </div>
        </div>
      </div>
    );
  }

  try {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: order?.email || undefined,
      metadata: {
        responseId: responseId ?? "",
        orderId: order?.id ?? "",
      },
      success_url: order
        ? `${baseUrl}/success?orderId=${order.id}&session_id={CHECKOUT_SESSION_ID}`
        : `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: order ? `${baseUrl}/cancelled?orderId=${order.id}` : `${baseUrl}/cancelled`,
    });

    if (session.url) {
      if (order) {
        await prisma.order.update({
          where: { id: order.id },
          data: { stripeCheckoutSessionId: session.id },
        });
      }
      return <PayRedirect destination={session.url} />;
    }
  } catch (error) {
    console.error("Failed to create Stripe checkout session", error);
  }

  return (
    <div className="section">
      <div className="container space-y-4">
        <h1 className="text-3xl font-semibold">Payment unavailable</h1>
        <p className="text-slate-600">
          We couldn&apos;t start the payment session. Please try again or contact support.
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
