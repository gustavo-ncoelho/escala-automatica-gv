import {Api} from "@/lib/api/escala-gv-api-client";
import {HttpError} from "@/lib/errors/errors";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const deleteGuardaVidas = async (id: string): Promise<void> => {
    await Api.delete<void>(`/api/guarda-vidas/${id}`);
};

export const useDeleteGuardaVidas = () => {
    const queryClient = useQueryClient();
    return useMutation<void, HttpError, string>({
        mutationFn: deleteGuardaVidas,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['todosGuardaVidas'] });
        },
    });
};