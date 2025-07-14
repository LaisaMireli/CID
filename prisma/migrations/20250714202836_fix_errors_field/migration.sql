-- CreateTable
CREATE TABLE "Measurement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "temperature" REAL,
    "humidity" REAL,
    "soilMoisture" INTEGER,
    "luminosity" INTEGER,
    "errors" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SystemStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "batteryLevel" INTEGER NOT NULL,
    "connectionLevel" INTEGER NOT NULL,
    "currentActivity" INTEGER NOT NULL,
    "currentSector" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
