import {Api} from "@/lib/api/escala-gv-api-client";
import {useQuery} from "@tanstack/react-query";
import {HttpError} from "@/lib/errors/errors";
import {Solicitacao} from "@/types/solicitacao";

const fetchSolicitacaoById = async (id: string): Promise<Solicitacao> => {
    return await Api.get<Solicitacao>(`/api/solicitacoes/${id}`);
};

export const useGetSolicitacaoById = (id: string) => {
    return useQuery<Solicitacao, HttpError>({
        queryKey: ['solicitacao', id],
        queryFn: () => fetchSolicitacaoById(id),
        enabled: !!id
    });
};