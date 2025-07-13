"use client";

import { useQuery } from '@tanstack/react-query';
import { Api } from '@/lib/api/escala-gv-api-client';
import { HttpError } from '@/lib/errors/errors';
import { AlocacaoDiaria } from "@/types/alocacao-diaria";
import { normalizeDateToLocal } from "@/lib/utils";

const fetchAlocacoesPorMes = async (mes: number, ano: number): Promise<AlocacaoDiaria[]> => {
    const queryParams = new Map([
        ['mes', mes.toString()],
        ['ano', ano.toString()]
    ]);
    return await Api.get<AlocacaoDiaria[]>('/api/alocacoes/mes', queryParams);
};

export const useGetAlocacoesPorMes = (mes: number, ano: number) => {
    const queryKey = ['alocacoes', ano, mes];

    return useQuery<AlocacaoDiaria[], HttpError>({
        queryKey: queryKey,
        queryFn: () => fetchAlocacoesPorMes(mes, ano),
        enabled: !!mes && !!ano,
        select: (data) => {
            if (!data) return [];

            return data.map(alocacao => ({
                ...alocacao,
                data: normalizeDateToLocal(alocacao.data),
            }));
        }
    });
};
