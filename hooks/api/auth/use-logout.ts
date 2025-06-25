import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Api } from "@/lib/api/escala-gv-api-client";
import { HttpError } from "@/lib/errors/errors";
import {useRouter} from "next/navigation";

const logoutUser = async (): Promise<void> => {
    return await Api.post<void>('/api/auth/logout');
};

export const useLogout = (): UseMutationResult<void, HttpError, void> => {

    const router = useRouter();

    return useMutation<void, HttpError, void>({
        mutationFn: logoutUser,
        onSuccess: () => {
            router.push("/");
        }
    });
};