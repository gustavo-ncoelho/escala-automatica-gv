import {Api} from "@/lib/api/escala-gv-api-client";
import {useQuery} from "@tanstack/react-query";
import {HttpError} from "@/lib/errors/errors";
import {Solicitacao} from "@/types/solicitacao";

const fetchSolicitacoesByGuardaVidas = async (guardaVidasId: string): Promise<Solicitacao[]> => {
    return await Api.get<Solicitacao[]>(`/api/solicitacoes/guarda-vidas/${guardaVidasId}`);
};

export const useGetSolicitacoesByGuardaVidas = (guardaVidasId: string) => {
    return useQuery<Solicitacao[], HttpError>({
        queryKey: ['solicitacoes', guardaVidasId],
        queryFn: () => fetchSolicitacoesByGuardaVidas(guardaVidasId),
        enabled: !!guardaVidasId
    });
};