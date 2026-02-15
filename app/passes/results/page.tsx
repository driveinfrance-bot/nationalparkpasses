"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Jurisdiction } from "@/config/passes/jurisdictions";
import type { ActivityType } from "@/config/passes/rules";
import { getRecommendedProducts } from "@/config/passes/rules";
import { addToCart } from "@/lib/passes/cart";

export default function PassResultsPage() {
  const searchParams = useSearchParams();
  const jurisdiction = (searchParams.get("jurisdiction") || "NSW") as Jurisdiction;
  const activityType = (searchParams.get("activityType") || "VISIT") as ActivityType;
  const parkId = searchParams.get("parkId") || undefined;

  const products = getRecommendedProducts({ jurisdiction, activityType });

  return (
    <div className="section">
      <div className="container space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="badge">Recommended products</p>
            <h1 className="mt-3 text-3xl font-semibold">Passes for {jurisdiction}</h1>
            <p className="text-slate-600">Processed within 12 hours. Secure Stripe checkout.</p>
          </div>
          <Link className="button" href="/checkout">
            Go to checkout
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="card p-6 text-slate-600">
            No direct product match found yet. Please choose &quot;Not sure&quot; or contact support.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {products.map((product) => (
              <div key={product.id} className="card p-5">
                <p className="text-lg font-semibold">{product.title}</p>
                <p className="mt-2 text-sm text-slate-600">{product.shortDescription}</p>
                <p className="mt-3 text-sm text-slate-700">
                  From ${product.officialFeeAud + product.serviceFeeAud} AUD
                </p>
                <button
                  className="button mt-4"
                  onClick={() => {
                    addToCart({
                      productId: product.id,
                      title: product.title,
                      jurisdiction: product.jurisdiction,
                      parkId,
                      activityType,
                      quantity: 1,
                      officialFeeAud: product.officialFeeAud,
                      serviceFeeAud: product.serviceFeeAud,
                    });
                  }}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
