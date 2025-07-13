"use client";

import {useQuery} from '@tanstack/react-query';
import {Api} from '@/lib/api/escala-gv-api-client';
import {HttpError} from '@/lib/errors/errors';
import {RankingItem} from "@/types/guarda-vidas";

const fetchRankingDiasTrabalhados = async (): Promise<RankingItem[]> => {
    return await Api.get<RankingItem[]>('/api/estatisticas');
};

export const useGetRankingDiasTrabalhados = () => {
    return useQuery<RankingItem[], HttpError>({
        queryKey: ['rankingDiasTrabalhados'],
        queryFn: fetchRankingDiasTrabalhados,
        retry: 1,
        staleTime: 1000 * 60,
    });
};