/*
  Warnings:

  - Added the required column `movimento` to the `postos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "postos" ADD COLUMN     "dias_fechados" TEXT[],
ADD COLUMN     "movimento" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "datas_fechadas_posto" (
    "id" TEXT NOT NULL,
    "data" DATE NOT NULL,
    "motivo" TEXT,
    "posto_id" TEXT NOT NULL,

    CONSTRAINT "datas_fechadas_posto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "datas_fechadas_posto" ADD CONSTRAINT "datas_fechadas_posto_posto_id_fkey" FOREIGN KEY ("posto_id") REFERENCES "postos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
