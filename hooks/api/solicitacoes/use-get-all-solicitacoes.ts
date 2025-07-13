import {Solicitacao} from "@/types/solicitacao";
import {Api} from "@/lib/api/escala-gv-api-client";
import {useQuery} from "@tanstack/react-query";
import {HttpError} from "@/lib/errors/errors";
import {normalizeDateToLocal} from "@/lib/utils";

const fetchSolicitacoes = async (): Promise<Solicitacao[]> => {
    return await Api.get<Solicitacao[]>('/api/solicitacoes');
};

export const useGetAllSolicitacoes = () => {
    return useQuery<Solicitacao[], HttpError>({
        queryKey: ['solicitacoes'],
        queryFn: fetchSolicitacoes,
        select: (data) => {
            if (!data) return [];

            return data.map(solicitacao => ({
                ...solicitacao,
                dataCriacao: normalizeDateToLocal(solicitacao.dataCriacao),
                dataAtualizacao: normalizeDateToLocal(solicitacao.dataAtualizacao),
                dataOriginal: solicitacao.dataOriginal ? normalizeDateToLocal(solicitacao.dataOriginal) : undefined,
                dataSolicitada: solicitacao.dataSolicitada ? normalizeDateToLocal(solicitacao.dataSolicitada) : undefined,
            }));
        }
    });
};