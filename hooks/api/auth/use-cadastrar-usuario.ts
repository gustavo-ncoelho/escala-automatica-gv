import {useMutation, UseMutationResult, useQueryClient} from '@tanstack/react-query';
import {Api} from "@/lib/api/escala-gv-api-client";
import {HttpError} from "@/lib/errors/errors";
import {Usuario} from '@/types/auth/usuario';
import {RegisterData} from '@/types/auth/register-data';

const registerUser = async (registerData: RegisterData): Promise<Usuario> => {
    return await Api.post<Usuario>('/api/auth/cadastrar', registerData);
};

export const useCadastrarUsuario = (): UseMutationResult<Usuario, HttpError, RegisterData> => {

    const queryClient = useQueryClient();

    return useMutation<Usuario, HttpError, RegisterData>({
        mutationFn: registerUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['todosGuardaVidas'] });
        },
    });
};