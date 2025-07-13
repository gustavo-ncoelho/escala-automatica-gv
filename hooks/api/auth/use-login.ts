import {useMutation, UseMutationResult, useQueryClient} from '@tanstack/react-query';
import {Api} from "@/lib/api/escala-gv-api-client";
import {HttpError} from "@/lib/errors/errors";
import {UsuarioPayload} from '@/types/auth/usuario';
import {LoginData} from '@/types/auth/login-data';
import {useRouter} from "next/navigation";
import {toast} from 'sonner';

const loginUser = async (loginData: LoginData): Promise<UsuarioPayload> => {
    return await Api.post<UsuarioPayload>('/api/auth/login', loginData);
};

export const useLogin = (): UseMutationResult<UsuarioPayload, HttpError, LoginData> => {

    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<UsuarioPayload, HttpError, LoginData>({
        mutationFn: loginUser,
        onSuccess: async (user) => {
            await queryClient.invalidateQueries({ queryKey: ['currentUser'] });

            toast.success("Login efetuado com sucesso")
            if (user.cargo === "COMANDANTE") {
                router.push('/admin');
            } else {
                router.push('/user');
            }
        },
        onError: (error) => {
            if (error instanceof HttpError) {
                if (error.statusCode === 401) {
                    toast.error("Credenciais inválias");
                }
            }
        }
    });
};