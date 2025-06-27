"use client";

import { useQuery } from '@tanstack/react-query';
import { Api } from '@/lib/api/escala-gv-api-client';
import { HttpError } from '@/lib/errors/errors';
import {GuardaVidas} from "@/types/guarda-vidas";

const fetchGuardaVidasById = async (id: string): Promise<GuardaVidas> => {
    return await Api.get<GuardaVidas>(`/api/guarda-vidas/${id}`);
};

export const useGetGuardaVidasById = (id: string) => {
    return useQuery<GuardaVidas, HttpError>({
        queryKey: ['guardaVidas', id],
        queryFn: () => fetchGuardaVidasById(id),
        enabled: !!id
    });
};