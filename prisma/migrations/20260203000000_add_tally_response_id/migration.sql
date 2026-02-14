-- AlterTable
ALTER TABLE "Order" ADD COLUMN "tallyResponseId" TEXT;

-- CreateUniqueIndex
CREATE UNIQUE INDEX "Order_tallyResponseId_key" ON "Order"("tallyResponseId");
