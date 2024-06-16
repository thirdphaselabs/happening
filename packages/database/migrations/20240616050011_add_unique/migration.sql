/*
  Warnings:

  - A unique constraint covering the columns `[stripeAccountId]` on the table `PaymentAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PaymentAccount_stripeAccountId_key" ON "PaymentAccount"("stripeAccountId");
