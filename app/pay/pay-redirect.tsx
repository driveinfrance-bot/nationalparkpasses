"use client";

import { useEffect } from "react";
import Link from "next/link";

type PayRedirectProps = {
  destination: string;
};

export default function PayRedirect({ destination }: PayRedirectProps) {
  useEffect(() => {
    try {
      if (window.top && window.top !== window.self) {
        window.top.location.href = destination;
        return;
      }
    } catch {
      // Ignore cross-origin frame access checks and use current window redirect below.
    }

    window.location.href = destination;
  }, [destination]);

  return (
    <div className="section">
      <div className="container space-y-4">
        <h1 className="text-3xl font-semibold">Redirecting to payment…</h1>
        <p className="text-slate-600">
          If nothing happens, continue using the link below.
        </p>
        <Link className="button w-fit" href={destination}>
          Continue to payment
        </Link>
      </div>
    </div>
  );
}
