"use client";

import {useQuery} from '@tanstack/react-query';
import {Api} from '@/lib/api/escala-gv-api-client';
import {HttpError} from '@/lib/errors/errors';
import {format} from 'date-fns';
import {AlocacaoDiaria} from "@/types/alocacao-diaria";


const fetchAlocacoesPorData = async (dataAlvo: Date): Promise<AlocacaoDiaria[]> => {
    const dataFormatada = format(dataAlvo, 'yyyy-MM-dd');
    const queryParams = new Map([['date', dataFormatada]]);
    return await Api.get<AlocacaoDiaria[]>('/api/alocacoes', queryParams);
};

export const useGetAlocacoesPorData = (dataAlvo: Date) => {
    const queryKey = ['alocacoes', format(dataAlvo, 'yyyy-MM-dd')];

    return useQuery<AlocacaoDiaria[], HttpError>({
        queryKey: queryKey,
        queryFn: () => fetchAlocacoesPorData(dataAlvo),
        enabled: !!dataAlvo,
        select: (data) => {
            if (!data) return [];

            return data.map(alocacao => ({
                ...alocacao,
                data: new Date(alocacao.data),
            }));
        }
    });
};