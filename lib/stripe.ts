import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

// Initialize Stripe client
// According to Stripe docs: https://docs.stripe.com/api/versioning
// API version can be specified or will use your account's default
// Test keys start with sk_test_, live keys start with sk_live_
let stripeInstance: Stripe | null = null;

if (secretKey) {
  try {
    stripeInstance = new Stripe(secretKey, {
      apiVersion: "2024-12-18.acacia",
      typescript: true,
    });
  } catch (error) {
    console.error("Failed to initialize Stripe:", error);
  }
} else {
  console.warn("STRIPE_SECRET_KEY is not set in environment variables");
}

export const stripe = stripeInstance;

