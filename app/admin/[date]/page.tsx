"use client";

import React from "react";
import EscalaDiaria from "@/components/admin/escala/escala-diaria";
import {alocacoesMock, guardaVidasMock, postosMock} from "@/utils/dados-simulados";
import {useParams} from "next/navigation";
import {parseDateStringLocal} from "@/lib/utils";

export default function EscalaDiariaPage() {
    const params = useParams();
    const dateParam = params.date as string | undefined;

    if (!dateParam) {
        return <div>Carregando...</div>;
    }

    const dataObjeto = parseDateStringLocal(dateParam);

    return (
        <EscalaDiaria
            data={dataObjeto}
            postos={postosMock}
            alocacoes={alocacoesMock}
            guardaVidas={guardaVidasMock}
        />
    );
}