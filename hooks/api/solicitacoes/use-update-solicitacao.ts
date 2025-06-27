import {Solicitacao} from "@/types/solicitacao";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {HttpError} from "@/lib/errors/errors";
import {Api} from "@/lib/api/escala-gv-api-client";

const updateSolicitacaoStatus = async ({ id, data }: { id: string; data: Solicitacao }): Promise<Solicitacao> => {
    return await Api.put<Solicitacao, Solicitacao>(`/api/solicitacoes/${id}`, data);
};

export const useUpdateSolicitacaoStatus = () => {
    const queryClient = useQueryClient();
    return useMutation<Solicitacao, HttpError, { id: string; data: Solicitacao }>({
        mutationFn: updateSolicitacaoStatus,
        onSuccess: async (updatedSolicitacao) => {
            await queryClient.invalidateQueries({ queryKey: ['solicitacoes'] });
            await queryClient.invalidateQueries({ queryKey: ['solicitacao', updatedSolicitacao.id] });
        }
    });
};