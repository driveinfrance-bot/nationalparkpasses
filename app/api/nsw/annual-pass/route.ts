import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  product: z.literal("NSW_ANNUAL_PASS"),
  passType: z.string().min(1),
  passLabel: z.string().min(1),
  duration: z.enum(["1_YEAR", "2_YEARS"]),
  singlePark: z.string().nullable(),
  eligibility: z.object({
    isSeniorsCardHolder: z.boolean(),
  }),
  dates: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }),
  vehicle: z.object({
    numberPlate: z.string().min(2),
    registrationState: z.string().min(2),
    vehicleType: z.string().min(2),
  }),
  customer: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(6),
    postcode: z.string().nullable(),
  }),
  fees: z.object({
    officialFeeAud: z.number().nonnegative(),
    serviceFeeAud: z.number().nonnegative(),
    totalAud: z.number().positive(),
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid booking payload" }, { status: 400 });
    }

    const booking = parsed.data;
    const order = await prisma.order.create({
      data: {
        email: booking.customer.email,
        name: `${booking.customer.firstName} ${booking.customer.lastName}`,
        vehicleRegistration: booking.vehicle.numberPlate,
        country: "AU",
        vehicleType: booking.vehicle.vehicleType,
        fuelType: "N/A",
        firstRegistrationDate: new Date(booking.dates.startDate),
        priceCents: Math.round(booking.fees.totalAud * 100),
        currency: "AUD",
        addressName: `${booking.customer.firstName} ${booking.customer.lastName}`,
        addressStreet: booking.passLabel,
        addressHouseNumber: booking.duration,
        addressLocality: booking.singlePark ?? undefined,
        addressPostTown: booking.vehicle.registrationState,
        addressCounty: booking.eligibility.isSeniorsCardHolder ? "SENIORS" : "STANDARD",
        addressCity: booking.customer.phone,
        addressPostalCode: booking.customer.postcode ?? undefined,
        addressCountry: "Australia",
        uploadedFileName: "nsw-annual-pass-booking",
        uploadedFileUrl: JSON.stringify(booking),
      },
    });

    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error("Failed to create NSW annual pass booking", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
