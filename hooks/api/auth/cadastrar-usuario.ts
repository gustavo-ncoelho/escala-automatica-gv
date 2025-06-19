import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Api } from "@/api/escala-gv-api-client";
import { HttpError } from "@/lib/errors/errors";
import { Usuario } from '@/types/auth/usuario';
import { RegisterData } from '@/types/auth/register-data';

const registerUser = async (registerData: RegisterData): Promise<Usuario> => {
    return await Api.post<Usuario>('/api/auth/register', registerData);
};

export const useRegister = (): UseMutationResult<Usuario, HttpError, RegisterData> => {
    return useMutation<Usuario, HttpError, RegisterData>({
        mutationFn: registerUser
    });
};