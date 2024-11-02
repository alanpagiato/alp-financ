/*
  Warnings:

  - You are about to drop the column `description` on the `Entity` table. All the data in the column will be lost.
  - Added the required column `name` to the `Entity` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Entity" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Entity";
DROP TABLE "Entity";
ALTER TABLE "new_Entity" RENAME TO "Entity";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
