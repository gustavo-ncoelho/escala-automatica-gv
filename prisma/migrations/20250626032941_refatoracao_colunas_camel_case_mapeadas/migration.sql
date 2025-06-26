/*
  Warnings:

  - You are about to drop the column `dataAdmissao` on the `guarda_vidas` table. All the data in the column will be lost.
  - You are about to drop the column `diasDeFolga` on the `guarda_vidas` table. All the data in the column will be lost.
  - You are about to drop the `alocacao_diaria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dia_indisponivel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `preferencia_posto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `solicitacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data_admissao` to the `guarda_vidas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "alocacao_diaria" DROP CONSTRAINT "alocacao_diaria_guarda_vidas_id_fkey";

-- DropForeignKey
ALTER TABLE "alocacao_diaria" DROP CONSTRAINT "alocacao_diaria_posto_id_fkey";

-- DropForeignKey
ALTER TABLE "dia_indisponivel" DROP CONSTRAINT "dia_indisponivel_guarda_vidas_id_fkey";

-- DropForeignKey
ALTER TABLE "guarda_vidas" DROP CONSTRAINT "guarda_vidas_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "preferencia_posto" DROP CONSTRAINT "preferencia_posto_guarda_vidas_id_fkey";

-- DropForeignKey
ALTER TABLE "preferencia_posto" DROP CONSTRAINT "preferencia_posto_posto_id_fkey";

-- DropForeignKey
ALTER TABLE "solicitacao" DROP CONSTRAINT "solicitacao_guarda_vidas_id_fkey";

-- AlterTable
ALTER TABLE "guarda_vidas" DROP COLUMN "dataAdmissao",
DROP COLUMN "diasDeFolga",
ADD COLUMN     "data_admissao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dias_de_folga" TEXT[];

-- DropTable
DROP TABLE "alocacao_diaria";

-- DropTable
DROP TABLE "dia_indisponivel";

-- DropTable
DROP TABLE "posto";

-- DropTable
DROP TABLE "preferencia_posto";

-- DropTable
DROP TABLE "solicitacao";

-- DropTable
DROP TABLE "usuario";

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "senha_hash" TEXT NOT NULL,
    "cargo" "Cargo" NOT NULL DEFAULT 'GUARDA_VIDAS',
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "alocacao_maxima" INTEGER NOT NULL,
    "localizacao" TEXT,

    CONSTRAINT "postos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alocacoes_diarias" (
    "id" TEXT NOT NULL,
    "data" DATE NOT NULL,
    "guarda_vidas_id" TEXT NOT NULL,
    "posto_id" TEXT NOT NULL,

    CONSTRAINT "alocacoes_diarias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preferencias_posto" (
    "id" TEXT NOT NULL,
    "prioridade" INTEGER NOT NULL,
    "justificativa" TEXT,
    "posto_id" TEXT NOT NULL,
    "guarda_vidas_id" TEXT NOT NULL,

    CONSTRAINT "preferencias_posto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dias_indisponiveis" (
    "id" TEXT NOT NULL,
    "data" DATE NOT NULL,
    "motivo" TEXT,
    "guarda_vidas_id" TEXT NOT NULL,

    CONSTRAINT "dias_indisponiveis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitacoes" (
    "id" TEXT NOT NULL,
    "tipo" "tipo_solicitacao" NOT NULL,
    "data_original" DATE,
    "posto_original" TEXT,
    "data_solicitada" DATE,
    "posto_solicitado" TEXT,
    "colega_nao_preferido" TEXT,
    "motivo" TEXT,
    "status" "status_solicitacao" NOT NULL DEFAULT 'PENDENTE',
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "guarda_vidas_id" TEXT NOT NULL,

    CONSTRAINT "solicitacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "postos_nome_key" ON "postos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "alocacao_diaria_data_guarda_vidas_id_key" ON "alocacoes_diarias"("data", "guarda_vidas_id");

-- AddForeignKey
ALTER TABLE "guarda_vidas" ADD CONSTRAINT "guarda_vidas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alocacoes_diarias" ADD CONSTRAINT "alocacoes_diarias_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alocacoes_diarias" ADD CONSTRAINT "alocacoes_diarias_posto_id_fkey" FOREIGN KEY ("posto_id") REFERENCES "postos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferencias_posto" ADD CONSTRAINT "preferencias_posto_posto_id_fkey" FOREIGN KEY ("posto_id") REFERENCES "postos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferencias_posto" ADD CONSTRAINT "preferencias_posto_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dias_indisponiveis" ADD CONSTRAINT "dias_indisponiveis_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacoes" ADD CONSTRAINT "solicitacoes_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
