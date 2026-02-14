import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;

export const resendClient = resendKey ? new Resend(resendKey) : null;

export function getSupportEmail() {
  return process.env.SUPPORT_EMAIL || "support@driveinfrance.co";
}

