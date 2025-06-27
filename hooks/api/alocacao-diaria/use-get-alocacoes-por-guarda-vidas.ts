import { AlocacaoDiaria } from "@/types/alocacao-diaria";
import {Api} from "@/lib/api/escala-gv-api-client";
import {useQuery} from "@tanstack/react-query";
import {HttpError} from "@/lib/errors/errors";

const fetchAlocacoesPorGuardaVidas = async (guardaVidasId: string): Promise<AlocacaoDiaria[]> => {
    return await Api.get<AlocacaoDiaria[]>(`/api/alocacoes/${guardaVidasId}`);
};

export const useGetAlocacoesPorGuardaVidas = (guardaVidasId: string) => {
    const queryKey = ['alocacoes', 'guardaVidas', guardaVidasId];

    return useQuery<AlocacaoDiaria[], HttpError>({
        queryKey: queryKey,
        queryFn: () => fetchAlocacoesPorGuardaVidas(guardaVidasId),
        enabled: !!guardaVidasId
    });
};