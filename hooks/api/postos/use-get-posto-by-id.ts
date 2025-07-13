import { Api } from "@/lib/api/escala-gv-api-client";
import { Posto } from "@/types/guarda-vidas";
import {useQuery} from "@tanstack/react-query";
import {HttpError} from "@/lib/errors/errors";
import {normalizeDateToLocal} from "@/lib/utils";

const fetchPostoById = async (id: string): Promise<Posto> => {
    return await Api.get<Posto>(`/api/postos/${id}`);
};

export const useGetPostoById = (id: string) => {
    return useQuery<Posto, HttpError>({
        queryKey: ['posto', id],
        queryFn: () => fetchPostoById(id),
        enabled: !!id,
        select: (data) => {
            return {
                ...data,
                datasFechadas: data.datasFechadas?.map(dia => ({
                    ...dia,
                    data: normalizeDateToLocal(dia.data)
                }))
            };
        }
    });
};