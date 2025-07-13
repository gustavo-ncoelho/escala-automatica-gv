import { Api } from "@/lib/api/escala-gv-api-client";
import {Posto} from "@/types/guarda-vidas";
import {useQuery} from "@tanstack/react-query";
import {HttpError} from "@/lib/errors/errors";
import {normalizeDateToLocal} from "@/lib/utils";

const fetchPostos = async (): Promise<Posto[]> => {
    return await Api.get<Posto[]>('/api/postos');
};

export const useGetPostos = () => {
    return useQuery<Posto[], HttpError>({
        queryKey: ['postos'],
        queryFn: fetchPostos,
        select: (data) => {
            return data.map(posto => ({
                ...posto,
                datasFechadas: posto.datasFechadas?.map(dia => ({
                    ...dia,
                    data: normalizeDateToLocal(dia.data)
                }))
            }));
        }
    });
};