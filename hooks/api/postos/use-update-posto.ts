import {Posto} from "@/types/guarda-vidas";
import {Api} from "@/lib/api/escala-gv-api-client";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {HttpError} from "@/lib/errors/errors";

const updatePosto = async ({ id, data }: { id: string; data: Posto }): Promise<Posto> => {
    return await Api.put<Posto, Posto>(`/api/postos/${id}`, data);
};

export const useUpdatePosto = () => {
    const queryClient = useQueryClient();
    return useMutation<Posto, HttpError, { id: string; data: Posto }>({
        mutationFn: updatePosto,
        onSuccess: async (updatedPosto) => {
            await queryClient.invalidateQueries({ queryKey: ['postos'] });
            await queryClient.invalidateQueries({ queryKey: ['posto', updatedPosto.id] });
        }
    });
};