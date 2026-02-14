import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

type TallyField = {
  label?: string;
  value?: unknown;
};

type TallyPayload = {
  event?: string;
  data?: {
    responseId?: string;
    submissionId?: string;
    fields?: TallyField[];
  };
  responseId?: string;
  submissionId?: string;
};

const normalizeLabel = (label: string) => label.trim().toLowerCase();

const getStringValue = (value: unknown) => {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return value.toString();
  return "";
};

const isConsentGranted = (value: unknown) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return ["yes", "true", "on", "checked", "agree"].includes(normalized);
  }
  return false;
};

const getFileInfo = (value: unknown) => {
  const files = Array.isArray(value) ? value : value ? [value] : [];
  const file = files[0] as
    | { url?: string; name?: string; originalName?: string; fileName?: string; fileUrl?: string }
    | undefined;

  return {
    uploadedFileUrl: file?.url ?? file?.fileUrl ?? null,
    uploadedFileName: file?.name ?? file?.originalName ?? file?.fileName ?? null,
  };
};

const verifySignature = (rawBody: string, signature: string, secret: string) => {
  const provided = signature.replace(/^sha256=/, "");
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");

  if (provided.length !== expected.length) return false;

  return timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
};

export async function POST(request: Request) {
  const secret = process.env.TALLY_WEBHOOK_SECRET;
  const signature =
    request.headers.get("tally-signature") || request.headers.get("Tally-Signature");

  const rawBody = await request.text();

  if (secret) {
    if (!signature || !verifySignature(rawBody, signature, secret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let payload: TallyPayload;
  try {
    payload = JSON.parse(rawBody) as TallyPayload;
  } catch (error) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (payload.event && payload.event !== "FORM_RESPONSE") {
    return NextResponse.json({ received: true });
  }

  const data = payload.data ?? {};
  const responseId =
    data.responseId ?? data.submissionId ?? payload.responseId ?? payload.submissionId;
  const fields = Array.isArray(data.fields) ? data.fields : [];
  const fieldMap = new Map(
    fields
      .filter((field) => typeof field.label === "string")
      .map((field) => [normalizeLabel(field.label as string), field])
  );

  const getFieldValue = (labels: string[]) => {
    for (const label of labels) {
      const field = fieldMap.get(normalizeLabel(label));
      if (field && field.value !== undefined) return field.value;
    }
    return undefined;
  };

  const email = getStringValue(getFieldValue(["Email"]));
  const name = getStringValue(getFieldValue(["Name", "Full name"]));
  const vehicleRegistration = getStringValue(
    getFieldValue(["Vehicle registration", "Registration number"])
  );
  const country = getStringValue(getFieldValue(["Country", "Country of registration"]));
  const vehicleType = getStringValue(getFieldValue(["Vehicle type"]));
  const fuelType = getStringValue(getFieldValue(["Fuel type", "Fuel Type"]));
  const firstRegistrationDateRaw = getStringValue(
    getFieldValue(["First registration date"])
  );
  const addressName = getStringValue(
    getFieldValue(["Address name", "Additional address information"])
  );
  const addressStreet = getStringValue(getFieldValue(["Street", "Street number and name"]));
  const addressHouseNumber = getStringValue(getFieldValue(["House number"]));
  const addressLocality = getStringValue(getFieldValue(["Locality"]));
  const addressPostTown = getStringValue(getFieldValue(["Post town"]));
  const addressCounty = getStringValue(getFieldValue(["County"]));
  const addressCity = getStringValue(getFieldValue(["City"]));
  const addressPostalCode = getStringValue(getFieldValue(["Postal code", "Post Code / Sort Code"]));
  const addressCountry = getStringValue(getFieldValue(["Address country", "Country"]));
  const consentValue = getFieldValue(["Consent"]);
  const fileValue = getFieldValue(["Registration document", "File upload", "Document"]);
  const { uploadedFileUrl, uploadedFileName } = getFileInfo(fileValue);

  if (!responseId) {
    return NextResponse.json({ error: "Missing responseId" }, { status: 400 });
  }

  const orderData = {
    tallyResponseId: responseId,
    email: email || "",
    name: name || undefined,
    vehicleRegistration: vehicleRegistration || "",
    country: country || "",
    vehicleType: vehicleType || "",
    fuelType: fuelType || "",
    firstRegistrationDate: firstRegistrationDateRaw ? new Date(firstRegistrationDateRaw) : null,
    priceCents: 2950,
    addressName: addressName || undefined,
    addressStreet: addressStreet || undefined,
    addressHouseNumber: addressHouseNumber || undefined,
    addressLocality: addressLocality || undefined,
    addressPostTown: addressPostTown || undefined,
    addressCounty: addressCounty || undefined,
    addressCity: addressCity || undefined,
    addressPostalCode: addressPostalCode || undefined,
    addressCountry: addressCountry || undefined,
    uploadedFileUrl: uploadedFileUrl ?? undefined,
    uploadedFileName: uploadedFileName ?? undefined,
    consentAt: isConsentGranted(consentValue) ? new Date() : null,
  };

  const order = await prisma.order.upsert({
    where: { tallyResponseId: responseId },
    create: orderData,
    update: orderData,
  });

  return NextResponse.json({ received: true, orderId: order.id });
}
