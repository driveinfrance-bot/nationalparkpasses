"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cartCount, getCart } from "@/lib/passes/cart";

export default function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(cartCount(getCart()));
    update();
    window.addEventListener("cart-updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("cart-updated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <Link href="/checkout" className="text-sm font-medium text-slate-700 hover:text-[#1F3A2E]">
      Cart ({count})
    </Link>
  );
}
