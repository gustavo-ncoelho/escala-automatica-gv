"use client";

import { useQuery } from '@tanstack/react-query';
import { Api } from '@/lib/api/escala-gv-api-client';
import { HttpError } from '@/lib/errors/errors';
import {GuardaVidas} from "@/types/guarda-vidas";

const fetchAllGuardaVidas = async (): Promise<GuardaVidas[]> => {
    return await Api.get<GuardaVidas[]>('/api/guarda-vidas');
};

export const useGetAllGuardaVidas = () => {
    return useQuery<GuardaVidas[], HttpError>({
        queryKey: ['todosGuardaVidas'],
        queryFn: fetchAllGuardaVidas,
        retry: 1,
        staleTime: 1000 * 60,
    });
};