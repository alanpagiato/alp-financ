-- CreateTable
CREATE TABLE "AccountPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AccountSubPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "accountPlanId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AccountSubPlan_accountPlanId_fkey" FOREIGN KEY ("accountPlanId") REFERENCES "AccountPlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountPlan_description_key" ON "AccountPlan"("description");

-- CreateIndex
CREATE UNIQUE INDEX "AccountSubPlan_accountPlanId_description_key" ON "AccountSubPlan"("accountPlanId", "description");
