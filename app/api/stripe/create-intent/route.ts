import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 500 }
    );
  }
  const body = await request.json();
  const orderId = body.orderId as string | undefined;
  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const intent = await stripe.paymentIntents.create({
    amount: order.priceCents,
    currency: order.currency.toLowerCase(),
    receipt_email: order.email || undefined,
    metadata: { orderId: order.id },
    automatic_payment_methods: { enabled: true },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: {
      stripePaymentIntentId: intent.id,
    },
  });

  return NextResponse.json({
    clientSecret: intent.client_secret,
  });
}

