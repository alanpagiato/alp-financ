/*
  Warnings:

  - You are about to drop the column `accountId` on the `AccountMovement` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `AccountMovement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccountMovement" DROP CONSTRAINT "AccountMovement_entityId_fkey";

-- AlterTable
ALTER TABLE "AccountMovement" DROP COLUMN "accountId",
DROP COLUMN "entityId";

-- CreateTable
CREATE TABLE "AccountMovementSplit" (
    "id" SERIAL NOT NULL,
    "accountMovementId" INTEGER NOT NULL,
    "entityId" INTEGER NOT NULL,
    "accountSubPlanId" INTEGER NOT NULL,
    "valueSplit" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "AccountMovementSplit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccountMovementSplit" ADD CONSTRAINT "AccountMovementSplit_accountMovementId_fkey" FOREIGN KEY ("accountMovementId") REFERENCES "AccountMovement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountMovementSplit" ADD CONSTRAINT "AccountMovementSplit_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountMovementSplit" ADD CONSTRAINT "AccountMovementSplit_accountSubPlanId_fkey" FOREIGN KEY ("accountSubPlanId") REFERENCES "AccountSubPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
