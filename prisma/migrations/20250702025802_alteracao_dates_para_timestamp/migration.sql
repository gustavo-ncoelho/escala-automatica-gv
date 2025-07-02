-- AlterTable
ALTER TABLE "alocacoes_diarias" ALTER COLUMN "data" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "dias_indisponiveis" ALTER COLUMN "data" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "solicitacoes" ALTER COLUMN "data_original" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "data_solicitada" SET DATA TYPE TIMESTAMP(3);
