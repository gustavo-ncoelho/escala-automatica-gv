"use client";

import {useParams} from "next/navigation";
import React from "react";
import {useGetAllGuardaVidas} from "@/hooks/api/guarda-vidas/use-get-all-guarda-vidas";
import {useGetPostos} from "@/hooks/api/postos/use-get-all-postos";
import {GuardaVidasEscala} from "@/types/guarda-vidas";
import {converterListaGVParaListaGVEscala, formatarData, parseDateStringLocal} from "@/lib/utils";
import TabelaEscalaDiaria from "@/components/main/tabela-escala-diaria";
import {useGetAlocacoesPorData} from "@/hooks/api/alocacao-diaria/use-get-alocacoes-por-data";
import BackButton from "@/components/utils/back-button";
import FullscreenLoader from "@/components/utils/fullscreen-loader";

export default function EscalaDiariaUserPage () {
    const params = useParams();
    const dateParam = params.date as string | undefined;
    const dataDoDia = parseDateStringLocal(dateParam ?? "");
    const {data: guardaVidas} = useGetAllGuardaVidas();
    const {data: postos} = useGetPostos();
    const {data: alocacoes} = useGetAlocacoesPorData(dataDoDia)
    const guardaVidasEscala: GuardaVidasEscala[] = converterListaGVParaListaGVEscala(guardaVidas);

    if (!dataDoDia) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <div className={"px-4 pb-6 flex items-center gap-5"}>
                <BackButton href={"/user"}/>
                <h2 className={"text-2xl font-semibold"}>{formatarData(dataDoDia)}</h2>
            </div>
            {alocacoes && guardaVidas && postos &&
                <TabelaEscalaDiaria
                    postos={postos ?? []}
                    guardaVidas={guardaVidasEscala}
                    alocacoes={alocacoes}
                    dataDoDia={dataDoDia}
                />
            }
            {(!alocacoes || !guardaVidas || !postos) &&
                <FullscreenLoader/>
            }
        </>
    );
}