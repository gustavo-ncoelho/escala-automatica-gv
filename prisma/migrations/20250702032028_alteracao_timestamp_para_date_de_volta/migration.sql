-- AlterTable
ALTER TABLE "alocacoes_diarias" ALTER COLUMN "data" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "dias_indisponiveis" ALTER COLUMN "data" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "solicitacoes" ALTER COLUMN "data_original" SET DATA TYPE DATE,
ALTER COLUMN "data_solicitada" SET DATA TYPE DATE;
