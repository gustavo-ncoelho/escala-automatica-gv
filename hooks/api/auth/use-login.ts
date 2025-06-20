import {useMutation, UseMutationResult, useQueryClient} from '@tanstack/react-query';
import { Api } from "@/api/escala-gv-api-client";
import { HttpError } from "@/lib/errors/errors";
import { Usuario } from '@/types/auth/usuario';
import { LoginData } from '@/types/auth/login-data';
import {useRouter} from "next/navigation";

const loginUser = async (loginData: LoginData): Promise<Usuario> => {
    return await Api.post<Usuario>('/api/auth/login', loginData);
};

export const useLogin = (): UseMutationResult<Usuario, HttpError, LoginData> => {

    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<Usuario, HttpError, LoginData>({
        mutationFn: loginUser,
        onSuccess: async (user) => {
            await queryClient.invalidateQueries({ queryKey: ['currentUser'] });

            console.log(user.cargo);
            console.log(user);

            if (user.cargo === "COMANDANTE") {
                router.push('/admin');
            } else {
                router.push('/user');
            }
        }
    });
};