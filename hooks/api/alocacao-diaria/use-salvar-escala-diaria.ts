import { Api } from "@/lib/api/escala-gv-api-client";
import { HttpError } from "@/lib/errors/errors";
import {AlocacaoDiaria} from "@/types/alocacao-diaria";
import {useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

const salvarEscala = async (novasAlocacoes: AlocacaoDiaria[]): Promise<{ message: string }> => {
    return await Api.post<{ message: string }, AlocacaoDiaria[]>('/api/alocacoes', novasAlocacoes);
};

export const useSalvarEscalaDiaria = () => {
    const queryClient = useQueryClient();

    return useMutation<{ message: string }, HttpError, AlocacaoDiaria[]>({
        mutationFn: salvarEscala,
        onSuccess: async (data, variaveis) => {
            if (variaveis.length > 0) {
                const dataDaEscala = format(new Date(variaveis[0].data), 'yyyy-MM-dd');
                await queryClient.invalidateQueries({ queryKey: ['alocacoes', dataDaEscala] });
            }
        }
    });
};