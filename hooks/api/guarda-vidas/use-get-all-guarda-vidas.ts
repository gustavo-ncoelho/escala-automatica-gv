"use client";

import { useQuery } from '@tanstack/react-query';
import { Api } from '@/lib/api/escala-gv-api-client';
import { HttpError } from '@/lib/errors/errors';
import {Usuario} from "@/types/auth/usuario";

const fetchAllGuardaVidas = async (): Promise<Usuario[]> => {
    return await Api.get<Usuario[]>('/api/guarda-vidas');
};

export const useGetAllGuardaVidas = () => {
    return useQuery<Usuario[], HttpError>({
        queryKey: ['todosGuardaVidas'],
        queryFn: fetchAllGuardaVidas,
        retry: 1,
        staleTime: 1000 * 60,
        select: (data) => {
            if (!data) return [];

            return data.map(user => ({
                ...user,
                dataCriacao: new Date(user.dataCriacao),
                dataAtualizacao: user.dataAtualizacao ? new Date(user.dataAtualizacao) : undefined,
                perfilGuardaVidas: user.perfilGuardaVidas ? {
                    ...user.perfilGuardaVidas,
                    dataAdmissao: new Date(user.perfilGuardaVidas.dataAdmissao),
                    diasIndisponiveis: user.perfilGuardaVidas?.diasIndisponiveis?.map(dia => ({
                        ...dia,
                        data: new Date(dia.data)
                    }))
                } : undefined
            }));
        }
    });
};