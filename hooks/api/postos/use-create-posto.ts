import { HttpError } from "@/lib/errors/errors";
import {Posto, PostoCriacao} from "@/types/guarda-vidas";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Api} from "@/lib/api/escala-gv-api-client";

const createPosto = async (data: PostoCriacao): Promise<Posto> => {
    return await Api.post<Posto, PostoCriacao>('/api/postos', data);
};

export const useCreatePosto = () => {
    const queryClient = useQueryClient();
    return useMutation<Posto, HttpError, PostoCriacao>({
        mutationFn: createPosto,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['postos'] });
        }
    });
};