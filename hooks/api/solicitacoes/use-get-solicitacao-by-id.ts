import {Api} from "@/lib/api/escala-gv-api-client";
import {useQuery} from "@tanstack/react-query";
import {HttpError} from "@/lib/errors/errors";
import {Solicitacao} from "@/types/solicitacao";
import {normalizeDateToLocal} from "@/lib/utils";

const fetchSolicitacaoById = async (id: string): Promise<Solicitacao> => {
    return await Api.get<Solicitacao>(`/api/solicitacoes/${id}`);
};

export const useGetSolicitacaoById = (id: string) => {
    return useQuery<Solicitacao, HttpError>({
        queryKey: ['solicitacao', id],
        queryFn: () => fetchSolicitacaoById(id),
        enabled: !!id,
        select: (data) => {
            return {
                ...data,
                dataCriacao: normalizeDateToLocal(data.dataCriacao),
                dataAtualizacao: normalizeDateToLocal(data.dataAtualizacao),
                dataOriginal: data.dataOriginal ? normalizeDateToLocal(data.dataOriginal) : undefined,
                dataSolicitada: data.dataSolicitada ? normalizeDateToLocal(data.dataSolicitada) : undefined,
            };
        }
    });
};