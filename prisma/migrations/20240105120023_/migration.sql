/*
  Warnings:

  - You are about to drop the column `DestinationData` on the `configuration` table. All the data in the column will be lost.
  - You are about to drop the column `SourceData` on the `configuration` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "SourceData" (
    "url" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "SourceDataId" INTEGER NOT NULL,
    CONSTRAINT "SourceData_SourceDataId_fkey" FOREIGN KEY ("SourceDataId") REFERENCES "configuration" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DestinationData" (
    "url" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "DestinationDataId" INTEGER NOT NULL,
    CONSTRAINT "DestinationData_DestinationDataId_fkey" FOREIGN KEY ("DestinationDataId") REFERENCES "configuration" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_configuration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SourceType" TEXT NOT NULL,
    "DestinationType" TEXT NOT NULL
);
INSERT INTO "new_configuration" ("DestinationType", "SourceType", "id") SELECT "DestinationType", "SourceType", "id" FROM "configuration";
DROP TABLE "configuration";
ALTER TABLE "new_configuration" RENAME TO "configuration";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "SourceData_SourceDataId_key" ON "SourceData"("SourceDataId");

-- CreateIndex
CREATE UNIQUE INDEX "DestinationData_DestinationDataId_key" ON "DestinationData"("DestinationDataId");
