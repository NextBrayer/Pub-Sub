/*
  Warnings:

  - You are about to drop the `Configuration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Configuration";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "configuration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SourceType" TEXT NOT NULL,
    "SourceData" TEXT NOT NULL,
    "DestinationType" TEXT NOT NULL,
    "DestinationData" TEXT NOT NULL
);
