'use client';

import {Api} from "@/lib/api/escala-gv-api-client";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {HttpError} from "@/lib/errors/errors";
import {GuardaVidas, GuardaVidasCriacao} from "@/types/guarda-vidas";

const updateGuardaVidas = async ({ id, data }: { id: string; data: GuardaVidasCriacao }): Promise<GuardaVidasCriacao> => {
    return await Api.put<GuardaVidas>(`/api/guarda-vidas/${id}`, data);
};

export const useUpdateGuardaVidas = () => {
    const queryClient = useQueryClient();
    return useMutation<GuardaVidasCriacao, HttpError, { id: string; data: GuardaVidasCriacao }>({
        mutationFn: updateGuardaVidas,
        onSuccess: async (data, variables) => {
            const {id} = variables;
            await queryClient.invalidateQueries({ queryKey: ['todosGuardaVidas'] });
            await queryClient.invalidateQueries({ queryKey: ['guardaVidas', id] });
        },
    });
};