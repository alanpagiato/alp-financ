-- CreateTable
CREATE TABLE "AccountMovement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "documentNumber" TEXT,
    "value" REAL NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "observations" TEXT NOT NULL,
    "bankAccountId" INTEGER NOT NULL,
    "movementCodeId" INTEGER NOT NULL,
    "entityCode" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "AccountMovement_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AccountMovement_movementCodeId_fkey" FOREIGN KEY ("movementCodeId") REFERENCES "MovementCode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AccountMovement_entityCode_fkey" FOREIGN KEY ("entityCode") REFERENCES "Entity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "AccountMovement_date_idx" ON "AccountMovement"("date");
