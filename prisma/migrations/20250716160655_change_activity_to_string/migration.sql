-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SystemStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "batteryLevel" INTEGER NOT NULL,
    "connectionLevel" INTEGER NOT NULL,
    "currentActivity" TEXT NOT NULL,
    "currentSector" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_SystemStatus" ("batteryLevel", "connectionLevel", "createdAt", "currentActivity", "currentSector", "id") SELECT "batteryLevel", "connectionLevel", "createdAt", "currentActivity", "currentSector", "id" FROM "SystemStatus";
DROP TABLE "SystemStatus";
ALTER TABLE "new_SystemStatus" RENAME TO "SystemStatus";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
