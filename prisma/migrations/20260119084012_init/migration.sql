/*
  Warnings:

  - You are about to drop the `BalanceRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `checkBalance` on the `User` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BalanceRecord_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BalanceRecord";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Balance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "checkBalance" BOOLEAN NOT NULL DEFAULT true,
    "amount" DECIMAL NOT NULL,
    "endingBalance" DECIMAL NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Balance" ("checkBalance", "endingBalance", "id") SELECT "checkBalance", "endingBalance", "id" FROM "Balance";
DROP TABLE "Balance";
ALTER TABLE "new_Balance" RENAME TO "Balance";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "account" TEXT NOT NULL,
    "endingBalance" DECIMAL NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("account", "endingBalance", "id", "name") SELECT "account", "endingBalance", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_account_key" ON "User"("account");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
