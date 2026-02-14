import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file") as File | null;
  const orderId = String(form.get("orderId") || "");

  if (!file || !orderId) {
    return NextResponse.json({ error: "Missing file or orderId" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/\s+/g, "-");
  const filename = `${orderId}-${Date.now()}-${safeName}`;

  let publicUrl: string;
  let storagePath: string;

  // Use Vercel Blob in production, local storage in development
  const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

  if (useBlob) {
    // Production: Use Vercel Blob
    const blob = await put(filename, buffer, {
      access: "public",
      contentType: file.type,
    });
    publicUrl = blob.url;
    storagePath = blob.url;
  } else {
    // Development: Use local file system
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });
    const filepath = path.join(uploadsDir, filename);
    await fs.writeFile(filepath, buffer);
    publicUrl = `/uploads/${filename}`;
    storagePath = publicUrl;
  }

  await prisma.upload.create({
    data: {
      orderId,
      storagePath,
      mimeType: file.type,
      sizeBytes: buffer.length,
    },
  });

  await prisma.order.update({
    where: { id: orderId },
    data: {
      uploadedFileUrl: publicUrl,
      uploadedFileName: file.name,
    },
  });

  return NextResponse.json({
    url: publicUrl,
    name: file.name,
    size: buffer.length,
  });
}

