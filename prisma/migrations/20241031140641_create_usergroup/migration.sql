/*
  Warnings:

  - Added the required column `isAdmin` to the `UserGroup` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_UserGroup" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "UserGroup";
DROP TABLE "UserGroup";
ALTER TABLE "new_UserGroup" RENAME TO "UserGroup";
CREATE UNIQUE INDEX "UserGroup_name_key" ON "UserGroup"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
