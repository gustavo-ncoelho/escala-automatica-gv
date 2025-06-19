-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('GUARDA_VIDAS', 'COMANDANTE');

-- CreateEnum
CREATE TYPE "tipo_solicitacao" AS ENUM ('PREFERENCIA_POSTO', 'DIA_INDISPONIVEL', 'TROCA_ESCALA');

-- CreateEnum
CREATE TYPE "status_solicitacao" AS ENUM ('PENDENTE', 'APROVADA', 'REJEITADA');

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "senha_hash" TEXT NOT NULL,
    "cargo" "Cargo" NOT NULL DEFAULT 'GUARDA_VIDAS',
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guarda_vidas" (
    "id" SERIAL NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "data_admissao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dias_trabalhados" INTEGER NOT NULL DEFAULT 0,
    "dias_restantes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "guarda_vidas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "localizacao" TEXT,

    CONSTRAINT "posto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preferencia_posto" (
    "id" SERIAL NOT NULL,
    "guarda_vidas_id" INTEGER NOT NULL,
    "posto_id" INTEGER NOT NULL,
    "justificativa" TEXT,
    "prioridade" INTEGER NOT NULL,

    CONSTRAINT "preferencia_posto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dia_indisponivel" (
    "id" SERIAL NOT NULL,
    "guarda_vidas_id" INTEGER NOT NULL,
    "data" DATE NOT NULL,
    "motivo" TEXT,

    CONSTRAINT "dia_indisponivel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alocacao_diaria" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "guarda_vidas_id" INTEGER NOT NULL,
    "posto_id" INTEGER NOT NULL,
    "escala_mensal_id" INTEGER,

    CONSTRAINT "alocacao_diaria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitacao" (
    "id" SERIAL NOT NULL,
    "guarda_vidas_id" INTEGER NOT NULL,
    "tipo" "tipo_solicitacao" NOT NULL,
    "data_original" DATE,
    "posto_original" INTEGER,
    "data_solicitada" DATE,
    "posto_solicitado" INTEGER,
    "colega_nao_preferido" INTEGER,
    "motivo" TEXT,
    "status" "status_solicitacao" NOT NULL DEFAULT 'PENDENTE',
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "solicitacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "escala_mensal" (
    "id" SERIAL NOT NULL,
    "mes" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,

    CONSTRAINT "escala_mensal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "guarda_vidas_usuario_id_key" ON "guarda_vidas"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "posto_nome_key" ON "posto"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "alocacao_diaria_data_guarda_vidas_id_key" ON "alocacao_diaria"("data", "guarda_vidas_id");

-- CreateIndex
CREATE UNIQUE INDEX "escala_mensal_mes_ano_key" ON "escala_mensal"("mes", "ano");

-- AddForeignKey
ALTER TABLE "guarda_vidas" ADD CONSTRAINT "guarda_vidas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferencia_posto" ADD CONSTRAINT "preferencia_posto_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferencia_posto" ADD CONSTRAINT "preferencia_posto_posto_id_fkey" FOREIGN KEY ("posto_id") REFERENCES "posto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dia_indisponivel" ADD CONSTRAINT "dia_indisponivel_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alocacao_diaria" ADD CONSTRAINT "alocacao_diaria_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alocacao_diaria" ADD CONSTRAINT "alocacao_diaria_posto_id_fkey" FOREIGN KEY ("posto_id") REFERENCES "posto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alocacao_diaria" ADD CONSTRAINT "alocacao_diaria_escala_mensal_id_fkey" FOREIGN KEY ("escala_mensal_id") REFERENCES "escala_mensal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao" ADD CONSTRAINT "solicitacao_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
