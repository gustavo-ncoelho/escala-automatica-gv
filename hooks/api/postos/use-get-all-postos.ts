import { Api } from "@/lib/api/escala-gv-api-client";
import {Posto} from "@/types/guarda-vidas";
import {useQuery} from "@tanstack/react-query";
import {HttpError} from "@/lib/errors/errors";

const fetchPostos = async (): Promise<Posto[]> => {
    return await Api.get<Posto[]>('/api/postos');
};

export const useGetPostos = () => {
    return useQuery<Posto[], HttpError>({
        queryKey: ['postos'],
        queryFn: fetchPostos
    });
};