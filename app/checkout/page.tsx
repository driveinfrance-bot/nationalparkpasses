"use client";

import Link from "next/link";
import { useState } from "react";
import { cartTotal, getCart, type CartItem } from "@/lib/passes/cart";

export default function CheckoutPage() {
  const [items] = useState<CartItem[]>(() => getCart());

  return (
    <div className="section">
      <div className="container max-w-3xl space-y-6">
        <div>
          <p className="badge">Checkout</p>
          <h1 className="mt-3 text-4xl font-semibold">Review your booking cart</h1>
          <p className="mt-2 text-slate-600">National Park Passes is a private booking and application assistance service and is not affiliated with Australian state or territory governments.</p>
        </div>

        <div className="card p-6">
          {items.length === 0 ? (
            <p className="text-slate-600">Your cart is empty. Add passes from the pass finder.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={`${item.productId}-${index}`} className="border-b border-slate-100 pb-3 text-sm">
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="text-slate-600">{item.jurisdiction} • Qty {item.quantity}</p>
                  <p className="text-slate-600">Service ${item.serviceFeeAud} + Official ${item.officialFeeAud}</p>
                </div>
              ))}
              <p className="text-lg font-semibold">Total: ${cartTotal(items)} AUD</p>
              <p className="text-sm text-slate-600">Most passes processed within 12 hours.</p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Link href="/passes" className="ghost-link">Find more passes</Link>
          <Link href="/apply" className="button">Continue to secure checkout</Link>
        </div>
      </div>
    </div>
  );
}
