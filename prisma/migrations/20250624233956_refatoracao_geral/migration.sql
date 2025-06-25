/*
  Warnings:

  - The primary key for the `alocacao_diaria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `escala_mensal_id` on the `alocacao_diaria` table. All the data in the column will be lost.
  - You are about to drop the column `data_admissao` on the `guarda_vidas` table. All the data in the column will be lost.
  - You are about to drop the column `dias_restantes` on the `guarda_vidas` table. All the data in the column will be lost.
  - You are about to drop the column `dias_trabalhados` on the `guarda_vidas` table. All the data in the column will be lost.
  - You are about to drop the `escala_mensal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dataAdmissao` to the `guarda_vidas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alocacaoMaxima` to the `posto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `posto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DiaDaSemana" AS ENUM ('segunda', 'terca_feira', 'quarta_feira', 'quinta_feira', 'sexta_feira', 'sabado', 'domingo');

-- DropForeignKey
ALTER TABLE "alocacao_diaria" DROP CONSTRAINT "alocacao_diaria_escala_mensal_id_fkey";

-- AlterTable
ALTER TABLE "alocacao_diaria" DROP CONSTRAINT "alocacao_diaria_pkey",
DROP COLUMN "escala_mensal_id",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "alocacao_diaria_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "alocacao_diaria_id_seq";

-- AlterTable
ALTER TABLE "guarda_vidas" DROP COLUMN "data_admissao",
DROP COLUMN "dias_restantes",
DROP COLUMN "dias_trabalhados",
ADD COLUMN     "dataAdmissao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "diasDeFolga" TEXT[],
ADD COLUMN     "estatisticas" JSONB;

-- AlterTable
ALTER TABLE "posto" ADD COLUMN     "alocacaoMaxima" INTEGER NOT NULL,
ADD COLUMN     "numero" INTEGER NOT NULL;

-- DropTable
DROP TABLE "escala_mensal";
