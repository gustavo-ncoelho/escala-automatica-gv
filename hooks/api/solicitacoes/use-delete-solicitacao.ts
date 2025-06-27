import {Api} from "@/lib/api/escala-gv-api-client";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {HttpError} from "@/lib/errors/errors";

const deleteSolicitacao = async (id: string): Promise<void> => {
    await Api.delete<void>(`/api/solicitacoes/${id}`);
};

export const useDeleteSolicitacao = () => {
    const queryClient = useQueryClient();
    return useMutation<void, HttpError, string>({
        mutationFn: deleteSolicitacao,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['solicitacoes'] });
        }
    });
};