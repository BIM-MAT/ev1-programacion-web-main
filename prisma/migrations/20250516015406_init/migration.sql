-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recordatorio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "important" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT NOT NULL,
    CONSTRAINT "Recordatorio_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recordatorio" ("content", "createdAt", "id", "important", "usuarioId") SELECT "content", "createdAt", "id", "important", "usuarioId" FROM "Recordatorio";
DROP TABLE "Recordatorio";
ALTER TABLE "new_Recordatorio" RENAME TO "Recordatorio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
