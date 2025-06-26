/*
  Warnings:

  - The values [TROCA_ESCALA] on the enum `tipo_solicitacao` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "tipo_solicitacao_new" AS ENUM ('PREFERENCIA_POSTO', 'DIA_INDISPONIVEL');
ALTER TABLE "solicitacoes" ALTER COLUMN "tipo" TYPE "tipo_solicitacao_new" USING ("tipo"::text::"tipo_solicitacao_new");
ALTER TYPE "tipo_solicitacao" RENAME TO "tipo_solicitacao_old";
ALTER TYPE "tipo_solicitacao_new" RENAME TO "tipo_solicitacao";
DROP TYPE "tipo_solicitacao_old";
COMMIT;
