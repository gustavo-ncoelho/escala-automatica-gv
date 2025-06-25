/*
  Warnings:

  - The primary key for the `dia_indisponivel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `guarda_vidas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `posto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `preferencia_posto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `solicitacao` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "alocacao_diaria" DROP CONSTRAINT "alocacao_diaria_guarda_vidas_id_fkey";

-- DropForeignKey
ALTER TABLE "alocacao_diaria" DROP CONSTRAINT "alocacao_diaria_posto_id_fkey";

-- DropForeignKey
ALTER TABLE "dia_indisponivel" DROP CONSTRAINT "dia_indisponivel_guarda_vidas_id_fkey";

-- DropForeignKey
ALTER TABLE "preferencia_posto" DROP CONSTRAINT "preferencia_posto_guarda_vidas_id_fkey";

-- DropForeignKey
ALTER TABLE "preferencia_posto" DROP CONSTRAINT "preferencia_posto_posto_id_fkey";

-- DropForeignKey
ALTER TABLE "solicitacao" DROP CONSTRAINT "solicitacao_guarda_vidas_id_fkey";

-- AlterTable
ALTER TABLE "alocacao_diaria" ALTER COLUMN "guarda_vidas_id" SET DATA TYPE TEXT,
ALTER COLUMN "posto_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "dia_indisponivel" DROP CONSTRAINT "dia_indisponivel_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "guarda_vidas_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "dia_indisponivel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "dia_indisponivel_id_seq";

-- AlterTable
ALTER TABLE "guarda_vidas" DROP CONSTRAINT "guarda_vidas_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "guarda_vidas_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "guarda_vidas_id_seq";

-- AlterTable
ALTER TABLE "posto" DROP CONSTRAINT "posto_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "posto_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "posto_id_seq";

-- AlterTable
ALTER TABLE "preferencia_posto" DROP CONSTRAINT "preferencia_posto_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "guarda_vidas_id" SET DATA TYPE TEXT,
ALTER COLUMN "posto_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "preferencia_posto_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "preferencia_posto_id_seq";

-- AlterTable
ALTER TABLE "solicitacao" DROP CONSTRAINT "solicitacao_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "guarda_vidas_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "solicitacao_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "solicitacao_id_seq";

-- AddForeignKey
ALTER TABLE "alocacao_diaria" ADD CONSTRAINT "alocacao_diaria_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alocacao_diaria" ADD CONSTRAINT "alocacao_diaria_posto_id_fkey" FOREIGN KEY ("posto_id") REFERENCES "posto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferencia_posto" ADD CONSTRAINT "preferencia_posto_posto_id_fkey" FOREIGN KEY ("posto_id") REFERENCES "posto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferencia_posto" ADD CONSTRAINT "preferencia_posto_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dia_indisponivel" ADD CONSTRAINT "dia_indisponivel_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao" ADD CONSTRAINT "solicitacao_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
