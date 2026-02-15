"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JURISDICTIONS, type Jurisdiction } from "@/config/passes/jurisdictions";
import type { ActivityType } from "@/config/passes/rules";

const activityOptions: { label: string; value: ActivityType }[] = [
  { label: "Just visiting (entry pass)", value: "VISIT" },
  { label: "Camping overnight", value: "CAMP" },
  { label: "Driving in a restricted area / beach / island", value: "DRIVE" },
  { label: "Not sure (help me choose)", value: "UNSURE" },
];

export default function PassFinderPage() {
  const router = useRouter();
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("NSW");
  const [activityType, setActivityType] = useState<ActivityType>("VISIT");
  const [parkId, setParkId] = useState("");

  return (
    <div className="section">
      <div className="container max-w-3xl space-y-6">
        <div>
          <p className="badge">Pass finder</p>
          <h1 className="mt-3 text-4xl font-semibold">Find the right park pass</h1>
          <p className="mt-2 text-slate-600">
            Select your state and activity. We&apos;ll recommend pass and permit options you can add to cart.
          </p>
        </div>

        <div className="card space-y-4 p-6">
          <label className="block space-y-1">
            <span className="text-sm font-semibold">State or territory</span>
            <select
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value as Jurisdiction)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              {JURISDICTIONS.map((entry) => (
                <option key={entry.code} value={entry.code}>
                  {entry.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-semibold">What are you doing?</span>
            <select
              value={activityType}
              onChange={(e) => setActivityType(e.target.value as ActivityType)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              {activityOptions.map((activity) => (
                <option key={activity.value} value={activity.value}>
                  {activity.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-semibold">Park or recreation area (optional)</span>
            <input
              value={parkId}
              onChange={(e) => setParkId(e.target.value)}
              placeholder="e.g., K'gari, Kosciuszko, Wilsons Prom"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>

          <button
            className="button"
            onClick={() =>
              router.push(
                `/passes/results?jurisdiction=${jurisdiction}&activityType=${activityType}&parkId=${encodeURIComponent(
                  parkId
                )}`
              )
            }
          >
            See recommended passes
          </button>
        </div>
      </div>
    </div>
  );
}
