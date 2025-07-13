"use client";

import { useQuery } from '@tanstack/react-query';
import { Api } from '@/lib/api/escala-gv-api-client';
import { HttpError } from '@/lib/errors/errors';
import {Usuario} from "@/types/auth/usuario";
import {normalizeDateToLocal} from "@/lib/utils";

const fetchGuardaVidasById = async (id: string): Promise<Usuario> => {
    return await Api.get<Usuario>(`/api/guarda-vidas/${id}`);
};

export const useGetGuardaVidasById = (id: string) => {
    return useQuery<Usuario, HttpError>({
        queryKey: ['guardaVidas', id],
        queryFn: () => fetchGuardaVidasById(id),
        enabled: !!id,
        select: (data) => {
            return {
                ...data,
                dataCriacao: new Date(data.dataCriacao),
                dataAtualizacao: data.dataAtualizacao ? new Date(data.dataAtualizacao) : undefined,
                perfilGuardaVidas: data.perfilGuardaVidas ? {
                    ...data.perfilGuardaVidas,
                    dataAdmissao: normalizeDateToLocal(data.perfilGuardaVidas.dataAdmissao),
                    diasIndisponiveis: data.perfilGuardaVidas?.diasIndisponiveis?.map(d => ({
                        ...d,
                        data: normalizeDateToLocal(d.data)
                    }))
                } : undefined
            };
        }
    });
};