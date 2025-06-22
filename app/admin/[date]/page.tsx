"use client";

import React from "react";
import EscalaDiaria from "@/components/admin/escala/escala-diaria";
import { alocacoesMock, guardaVidasMock, postosMock } from "@/utils/dados-simulados";
import { useParams } from "next/navigation";
import { parseISO } from 'date-fns';

export default function EscalaDiariaPage () {
    const params = useParams();

    const dateParam = params.date as string | undefined;

    const dataObjeto = parseISO(dateParam ?? "");

    return (
        <EscalaDiaria
            data={dataObjeto}
            postos={postosMock}
            alocacoes={alocacoesMock}
            guardaVidas={guardaVidasMock}
        />
    );
}