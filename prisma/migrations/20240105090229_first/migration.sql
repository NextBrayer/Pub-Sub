-- CreateTable
CREATE TABLE "Configuration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "SourceType" TEXT NOT NULL,
    "SourceData" TEXT NOT NULL,
    "DestinationType" TEXT NOT NULL,
    "DestinationData" TEXT NOT NULL
);
