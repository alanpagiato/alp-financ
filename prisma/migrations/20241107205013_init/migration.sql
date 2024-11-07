/*
  Warnings:

  - A unique constraint covering the columns `[accountMovementId,entityId,accountSubPlanId]` on the table `AccountMovementSplit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AccountMovementSplit_accountMovementId_entityId_accountSubP_key" ON "AccountMovementSplit"("accountMovementId", "entityId", "accountSubPlanId");
