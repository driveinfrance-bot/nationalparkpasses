import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateSchema = z.object({
  email: z.any().optional(),
  name: z.string().optional(),
  vehicleRegistration: z.string().optional(),
  country: z.string().optional(),
  vehicleType: z.string().optional(),
  fuelType: z.string().optional(),
  firstRegistrationDate: z.string().optional(),
  uploadedFileUrl: z.string().optional(),
  uploadedFileName: z.string().optional(),
  consent: z.boolean().optional(),
  status: z.enum(["draft", "paid", "processing", "done", "failed"]).optional(),
  stripePaymentIntentId: z.string().optional(),
  stripeCustomerId: z.string().optional(),
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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const resolvedParams = await Promise.resolve(params);
  const order = await prisma.order.findUnique({
    where: { id: resolvedParams.id },
    include: { uploads: true },
  });
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(order);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error("Failed to parse request body:", e);
      return NextResponse.json(
        { error: { message: "Invalid request body" } },
        { status: 400 }
      );
    }
    
    console.log("PATCH request - orderId:", resolvedParams.id, "body:", JSON.stringify(body));
    
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      const flattened = parsed.error.flatten();
      console.error("Validation error:", JSON.stringify(flattened, null, 2));
      return NextResponse.json(
        { 
          error: {
            message: "Validation failed",
            fieldErrors: flattened.fieldErrors,
            formErrors: flattened.formErrors,
          }
        },
        { status: 400 }
      );
    }
    const data = parsed.data;
    const updateData: any = { ...data };
    
    // Remove fields that don't exist in Prisma schema
    delete updateData.consent;
    
    if (data.firstRegistrationDate) {
      updateData.firstRegistrationDate = new Date(data.firstRegistrationDate);
    }
    if (typeof data.consent !== "undefined") {
      updateData.consentAt = data.consent ? new Date() : null;
    }
    
    console.log("Updating order with data:", JSON.stringify(updateData, null, 2));
    
    const order = await prisma.order.update({
      where: { id: resolvedParams.id },
      data: updateData,
    });
    
    console.log("Order updated successfully:", order.id);
    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: { message: error.message || "Failed to update order" } },
      { status: 500 }
    );
  }
}

