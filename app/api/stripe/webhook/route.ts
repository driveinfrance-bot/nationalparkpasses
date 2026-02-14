import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getSupportEmail, resendClient } from "@/lib/email";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return NextResponse.json({ error: "Missing webhook secret" }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown signature error";
    console.error("Webhook signature error", errorMessage);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle Payment Intent (legacy flow)
  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;
    const orderId = intent.metadata?.orderId;
    if (orderId) {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: "paid" },
      });
      if (resendClient) {
        const support = getSupportEmail();
        await resendClient.emails.send({
          from: `Drive in France <${support}>`,
          to: order.email || support,
          subject: "Crit'Air application received",
          text: `We've received your order ${order.id}. We'll submit your Crit'Air application and follow up by email.`,
        });
        await resendClient.emails.send({
          from: `Drive in France <${support}>`,
          to: support,
          subject: `New Crit'Air order ${order.id}`,
          text: `Order ${order.id} paid.\nVehicle: ${order.vehicleRegistration} (${order.vehicleType}/${order.fuelType})\nEmail: ${order.email}`,
        });
      }
    }
  }

  // Handle Checkout Session (new redirect flow)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const paidEmail = session.customer_details?.email || session.customer_email;

    if (orderId) {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "paid",
          stripeCheckoutSessionId: session.id,
        },
      });
      if (resendClient) {
        const support = getSupportEmail();
        await resendClient.emails.send({
          from: `Drive in France <${support}>`,
          to: order.email || support,
          subject: "Crit'Air application received",
          text: `We've received your order ${order.id}. We'll submit your Crit'Air application and follow up by email.`,
        });
        await resendClient.emails.send({
          from: `Drive in France <${support}>`,
          to: support,
          subject: `New Crit'Air order ${order.id}`,
          text: `Order ${order.id} paid.\nVehicle: ${order.vehicleRegistration} (${order.vehicleType}/${order.fuelType})\nEmail: ${order.email}`,
        });
      }
    } else if (paidEmail) {
      const order = await prisma.order.findFirst({
        where: {
          email: paidEmail,
          status: {
            not: "paid",
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (order) {
        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: "paid",
            stripeCheckoutSessionId: session.id,
          },
        });
      } else {
        console.warn("No unpaid order found for completed checkout session", {
          email: paidEmail,
          checkoutSessionId: session.id,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
