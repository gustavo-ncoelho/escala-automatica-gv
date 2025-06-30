"use client";

import React from "react";
import EscalaDiaria from "@/components/admin/escala/escala-diaria";
import {useParams} from "next/navigation";
import {converterGVParaGVEscala, parseDateStringLocal} from "@/lib/utils";
import {useGetAllGuardaVidas} from "@/hooks/api/guarda-vidas/use-get-all-guarda-vidas";
import {useGetPostos} from "@/hooks/api/postos/use-get-all-postos";
import {useGetAlocacoesPorData} from "@/hooks/api/alocacao-diaria/use-get-alocacoes-por-data";
import {GuardaVidasEscala} from "@/types/guarda-vidas";

export default function EscalaDiariaPage() {
    const params = useParams();
    const dateParam = params.date as string | undefined;
    const {data: guardaVidas} = useGetAllGuardaVidas();
    const {data: postos} = useGetPostos();
    const {data: alocacoes} = useGetAlocacoesPorData(new Date(dateParam ?? ""));
    const guardaVidasEscala: GuardaVidasEscala[] = converterGVParaGVEscala(guardaVidas);


    if (!dateParam) {
        return <div>Carregando...</div>;
    }

    const dataObjeto = parseDateStringLocal(dateParam);

    return (
        <EscalaDiaria
            data={dataObjeto}
            postos={postos ?? []}
            alocacoesProp={alocacoes ?? []}
            guardaVidas={guardaVidasEscala}
        />
    );
}