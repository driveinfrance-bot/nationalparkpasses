"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setMessage("Thanks! We’ll reply by email shortly.");
      event.currentTarget.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Something went wrong. Please email support@driveinfrance.co.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-slate-800">Email</label>
        <input
          required
          name="email"
          type="email"
          className="input mt-1"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-800">
          Subject (optional)
        </label>
        <input
          name="subject"
          type="text"
          className="input mt-1"
          placeholder="Question about my application"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-800">Message</label>
        <textarea
          required
          name="message"
          className="input mt-1 min-h-[140px]"
          placeholder="How can we help?"
        />
      </div>
      <button className="button w-full justify-center" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
      {message ? (
        <p
          className={`text-sm ${
            status === "error" ? "text-red-600" : "text-green-700"
          }`}
        >
          {message}
        </p>
      ) : null}
      <p className="text-xs text-slate-500">
        We use your email only to reply to this request.
      </p>
    </form>
  );
}

