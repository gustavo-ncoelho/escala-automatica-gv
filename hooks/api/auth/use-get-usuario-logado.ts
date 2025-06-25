"use client";

import { useQuery } from '@tanstack/react-query';
import { Api } from '@/lib/api/escala-gv-api-client';
import { Usuario } from '@/types/auth/usuario';
import { HttpError } from '@/lib/errors/errors';

const fetchUsuarioLogado = async (): Promise<Usuario> => {
    return await Api.get<Usuario>('/api/auth/me');
};

export const useGetUsuarioLogado = () => {
    const { data: user, isError } = useQuery<Usuario, HttpError>({
        queryKey: ['usuarioLogado'],
        queryFn: fetchUsuarioLogado,
        retry: 1,
        staleTime: 1000 * 60,
    });

    return {
        user,
        isAuthenticated: !!user && !isError,
    };
};