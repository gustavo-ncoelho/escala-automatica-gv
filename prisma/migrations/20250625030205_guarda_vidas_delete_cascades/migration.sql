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

-- AddForeignKey
ALTER TABLE "guarda_vidas" ADD CONSTRAINT "guarda_vidas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alocacao_diaria" ADD CONSTRAINT "alocacao_diaria_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alocacao_diaria" ADD CONSTRAINT "alocacao_diaria_posto_id_fkey" FOREIGN KEY ("posto_id") REFERENCES "posto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferencia_posto" ADD CONSTRAINT "preferencia_posto_posto_id_fkey" FOREIGN KEY ("posto_id") REFERENCES "posto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferencia_posto" ADD CONSTRAINT "preferencia_posto_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dia_indisponivel" ADD CONSTRAINT "dia_indisponivel_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacao" ADD CONSTRAINT "solicitacao_guarda_vidas_id_fkey" FOREIGN KEY ("guarda_vidas_id") REFERENCES "guarda_vidas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
