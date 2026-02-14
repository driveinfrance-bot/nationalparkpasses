-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "vehicleRegistration" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "firstRegistrationDate" DATETIME,
    "priceCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "consentAt" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "stripePaymentIntentId" TEXT,
    "stripeCheckoutSessionId" TEXT,
    "stripeCustomerId" TEXT,
    "uploadedFileUrl" TEXT,
    "uploadedFileName" TEXT,
    "addressName" TEXT,
    "addressStreet" TEXT,
    "addressHouseNumber" TEXT,
    "addressLocality" TEXT,
    "addressPostTown" TEXT,
    "addressCounty" TEXT,
    "addressCity" TEXT,
    "addressPostalCode" TEXT,
    "addressCountry" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Upload" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "mimeType" TEXT,
    "sizeBytes" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Upload_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "contentMd" TEXT NOT NULL,
    "tags" TEXT,
    "ogImage" TEXT,
    "publishedAt" DATETIME,
    "updatedAt" DATETIME,
    "isPublished" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
