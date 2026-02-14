import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!stripe) {
    const hasKey = !!process.env.STRIPE_SECRET_KEY;
    const keyPrefix = process.env.STRIPE_SECRET_KEY?.substring(0, 3);
    console.error("Stripe not configured:", {
      hasKey,
      keyPrefix,
      keyLength: process.env.STRIPE_SECRET_KEY?.length,
    });
    return NextResponse.json(
      {
        error: hasKey
          ? "Stripe secret key is invalid. Please check your STRIPE_SECRET_KEY environment variable."
          : "Stripe secret key is not set. Please configure STRIPE_SECRET_KEY in your environment variables.",
      },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const orderId = body.orderId as string | undefined;

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing orderId" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      return NextResponse.json(
        { error: "STRIPE_PRICE_ID not configured" },
        { status: 500 }
      );
    }

    const baseUrl = process.env.BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: order.email || undefined,
      metadata: {
        orderId: order.id,
        vehicleRegistration: order.vehicleRegistration,
        country: order.country,
      },
      success_url: `${baseUrl}/success?orderId=${order.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancelled?orderId=${order.id}`,
    });

    // Store the checkout session ID
    await prisma.order.update({
      where: { id: order.id },
      data: {
        stripeCheckoutSessionId: session.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
