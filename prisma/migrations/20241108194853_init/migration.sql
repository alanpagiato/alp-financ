-- DropForeignKey
ALTER TABLE "AccountMovementSplit" DROP CONSTRAINT "AccountMovementSplit_accountMovementId_fkey";

-- AddForeignKey
ALTER TABLE "AccountMovementSplit" ADD CONSTRAINT "AccountMovementSplit_accountMovementId_fkey" FOREIGN KEY ("accountMovementId") REFERENCES "AccountMovement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
