'use client';

import {Api} from "@/lib/api/escala-gv-api-client";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {HttpError} from "@/lib/errors/errors";
import { GuardaVidas } from "@/types/guarda-vidas";

const updateGuardaVidas = async ({ id, data }: { id: string; data: GuardaVidas }): Promise<GuardaVidas> => {
    return await Api.put<GuardaVidas>(`/api/guarda-vidas/${id}`, data);
};

export const useUpdateGuardaVidas = () => {
    const queryClient = useQueryClient();
    return useMutation<GuardaVidas, HttpError, { id: string; data: GuardaVidas }>({
        mutationFn: updateGuardaVidas,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['todosGuardaVidas'] });
            await queryClient.invalidateQueries({ queryKey: ['guardaVidas', data.id] });
        },
    });
};