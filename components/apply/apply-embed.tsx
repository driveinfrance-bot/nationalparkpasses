"use client";

const tallyFormId = process.env.NEXT_PUBLIC_TALLY_FORM_ID;

export default function ApplyEmbed() {
  if (!tallyFormId) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600">
        <p className="font-semibold text-slate-900">Tally form not configured</p>
        <p className="mt-2">
          Set <code className="rounded bg-slate-100 px-1">NEXT_PUBLIC_TALLY_FORM_ID</code>
          in your environment, and configure your Tally thank-you redirect to:
        </p>
        <div className="mt-2 space-y-2">
          <p className="rounded bg-slate-100 px-2 py-1 font-mono text-xs">
            {"https://www.driveinfrance.com/pay?response_id={{response_id}}"}
          </p>
          <p className="rounded bg-slate-100 px-2 py-1 font-mono text-xs">
            {"https://www.driveinfrance.com/pay?responseId={{responseId}}"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      title="Crit'Air application form"
      src={`https://tally.so/embed/${tallyFormId}`}
      className="h-[600px] w-full rounded-2xl border border-slate-100 bg-white"
      loading="lazy"
    />
  );
}
