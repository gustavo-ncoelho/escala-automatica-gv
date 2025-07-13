import {Api} from "@/lib/api/escala-gv-api-client";
import {HttpError} from "@/lib/errors/errors";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const deletePosto = async (id: string): Promise<void> => {
    await Api.delete<void>(`/api/postos/${id}`);
};

export const useDeletePosto = () => {
    const queryClient = useQueryClient();
    return useMutation<void, HttpError, string>({
        mutationFn: deletePosto,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['postos'] });
        }
    });
};