import { Suspense } from "react";
import PassResultsClient from "./results-client";

export default function PassResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="section">
          <div className="container">
            <div className="card p-6 text-slate-600">Loading pass recommendations…</div>
          </div>
        </div>
      }
    >
      <PassResultsClient />
    </Suspense>
  );
}
