import { resendClient, getSupportEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") || "").trim();
  const subject =
    String(form.get("subject") || "Drive in France inquiry").trim() ||
    "Drive in France inquiry";
  const message = String(form.get("message") || "").trim();

  if (!email || !message) {
    return NextResponse.json({ error: "Missing email or message" }, { status: 400 });
  }

  const support = getSupportEmail();

  if (!resendClient) {
    console.warn("Resend not configured; skipping email send.");
    return NextResponse.json({ ok: true });
  }

  try {
    await resendClient.emails.send({
      from: `Drive in France <${support}>`,
      to: support,
      subject: `[Contact] ${subject}`,
      replyTo: email,
      text: `From: ${email}\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact send failed", err);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}

