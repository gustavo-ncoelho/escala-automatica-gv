import {Api} from "@/lib/api/escala-gv-api-client";
import {HttpError} from "@/lib/errors/errors";
import {Solicitacao, SolicitacaoCriacao} from "@/types/solicitacao";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const createSolicitacao = async (data: SolicitacaoCriacao): Promise<Solicitacao> => {
    return await Api.post<Solicitacao, SolicitacaoCriacao>('/api/solicitacoes', data);
};

export const useCreateSolicitacao = () => {
    const queryClient = useQueryClient();
    return useMutation<Solicitacao, HttpError, SolicitacaoCriacao>({
        mutationFn: createSolicitacao,
        onSuccess: async (data, variables) => {
            const guardaVidasId = variables.guardaVidasId;
            await queryClient.invalidateQueries({ queryKey: ['solicitacoes', guardaVidasId] });
            await queryClient.invalidateQueries({ queryKey: ['solicitacoes'] });
        },
    });
};