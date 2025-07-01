"use client";

import React from "react";
import EscalaDiaria from "@/components/admin/escala/escala-diaria";
import {useParams} from "next/navigation";
import {converterGVParaGVEscala, parseDateStringLocal} from "@/lib/utils";
import {useGetAllGuardaVidas} from "@/hooks/api/guarda-vidas/use-get-all-guarda-vidas";
import {useGetPostos} from "@/hooks/api/postos/use-get-all-postos";
import {GuardaVidasEscala} from "@/types/guarda-vidas";

export default function EscalaDiariaPage() {
    const params = useParams();
    const dateParam = params.date as string | undefined;
    const {data: guardaVidas} = useGetAllGuardaVidas();
    const {data: postos} = useGetPostos();
    const guardaVidasEscala: GuardaVidasEscala[] = converterGVParaGVEscala(guardaVidas);


    if (!dateParam) {
        return <div>Carregando...</div>;
    }

    return (
        <EscalaDiaria
            data={dateParam}
            postos={postos ?? []}
            guardaVidas={guardaVidasEscala}
        />
    );
}