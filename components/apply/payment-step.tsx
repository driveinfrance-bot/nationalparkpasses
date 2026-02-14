"use client";

import { useState } from "react";

export default function PaymentStep({
  orderId,
  onPaid,
}: {
  orderId: string;
  clientSecret?: string;
  onPaid: (pi: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
      <p className="font-semibold text-slate-900">Payment</p>
      <p>
        Pay €29.50 securely via Stripe. Cards, Apple Pay, and Google Pay are
        supported where available.
      </p>
      <button
        className="button w-full justify-center"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Loading..." : "Continue to payment"}
      </button>
      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
}

