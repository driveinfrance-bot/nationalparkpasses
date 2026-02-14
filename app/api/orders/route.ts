import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const createSchema = z.object({
  email: z.string().min(1).optional(),
  name: z.string().optional(),
  vehicleRegistration: z.string().min(2),
  country: z.string().min(2),
  vehicleType: z.string().min(2),
  fuelType: z.string().min(2),
  firstRegistrationDate: z.string().optional(),
  priceCents: z.number().int().positive().optional().default(2950),
  currency: z.string().optional().default("EUR"),
  addressName: z.string().optional(),
  addressStreet: z.string().optional(),
  addressHouseNumber: z.string().optional(),
  addressLocality: z.string().optional(),
  addressPostTown: z.string().optional(),
  addressCounty: z.string().optional(),
  addressCity: z.string().optional(),
  addressPostalCode: z.string().optional(),
  addressCountry: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      const flattened = parsed.error.flatten();
      const firstFieldError = Object.values(flattened.fieldErrors).flat()[0];
      const firstFormError = flattened.formErrors[0];
      const firstError = firstFieldError || firstFormError || "Invalid request";

      return NextResponse.json(
        { error: firstError, errorDetails: flattened },
        { status: 400 }
      );
    }
    const data = parsed.data;
    const order = await prisma.order.create({
      data: {
        email: data.email ?? "",
        name: data.name,
        vehicleRegistration: data.vehicleRegistration,
        country: data.country,
        vehicleType: data.vehicleType,
        fuelType: data.fuelType,
        firstRegistrationDate: data.firstRegistrationDate
          ? new Date(data.firstRegistrationDate)
          : null,
        priceCents: data.priceCents ?? 2950,
        currency: data.currency,
        addressName: data.addressName,
        addressStreet: data.addressStreet,
        addressHouseNumber: data.addressHouseNumber,
        addressLocality: data.addressLocality,
        addressPostTown: data.addressPostTown,
        addressCounty: data.addressCounty,
        addressCity: data.addressCity,
        addressPostalCode: data.addressPostalCode,
        addressCountry: data.addressCountry,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const token = request.headers.get("x-admin-token");
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { uploads: true },
  });
  return NextResponse.json(orders);
}
