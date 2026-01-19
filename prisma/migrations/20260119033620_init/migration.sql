/*
  Warnings:

  - You are about to drop the column `balance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "BalanceRecord" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "endingBalance" DECIMAL NOT NULL,
    "userId" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "account" TEXT NOT NULL,
    "checkBalance" BOOLEAN NOT NULL DEFAULT true,
    "endingBalance" DECIMAL NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("account", "id", "name") SELECT "account", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_account_key" ON "User"("account");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "BalanceRecord_id_key" ON "BalanceRecord"("id");
