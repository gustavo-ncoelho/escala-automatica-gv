"use client"

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GuardaVidasEscala } from "@/types/guarda-vidas";
import {cn, existeAlocacaoNoDia, guardaVidaTrabalhaEm, verificarSeEHoje, verificarSeJaPassou} from "@/lib/utils";
import {format} from "date-fns";
import {useRouter} from "next/navigation";
import {AlocacaoDiaria} from "@/types/alocacao-diaria";

interface VisaoGeralProps {
    diasDoMes: Date[];
    guardaVidas: GuardaVidasEscala[];
    alocacoes: AlocacaoDiaria[]
}

export default function VisaoGeral ({diasDoMes, guardaVidas, alocacoes}: VisaoGeralProps) {

    const router = useRouter();

    const contarTrabalhandoNoDia = (dataDoDia: Date): number => {
        return guardaVidas.filter(gv => guardaVidaTrabalhaEm(gv, dataDoDia)).length;
    };

    const onDayClick = (dia: Date) => {
        const dataFormatada = format(dia, 'yyyy-MM-dd');

        router.push(`/admin/${dataFormatada}`);
    }

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4 w-full">
            {diasDoMes.map((dia) => {
                const diaSemana = dia.toLocaleDateString("pt-BR", { weekday: "short" }).replace('.', '');
                const quantidadeGuardaVidas = contarTrabalhandoNoDia(dia);
                const temAlocacao = existeAlocacaoNoDia(dia, alocacoes);
                const isHoje = verificarSeEHoje(dia);
                const jaPassou = verificarSeJaPassou(dia);

                return (
                    <Card
                        key={dia.toISOString()}
                        className={cn(`cursor-pointer transition-all hover:shadow-lg hover:scale-105 border`,
                            temAlocacao && !jaPassou && "bg-green-500/40 border-green-500/45 dark:bg-green-500/10 dark:border-green-500/10",
                            isHoje && "border-2 border-foreground dark:border-foreground",
                            jaPassou && "bg-muted/50 text-muted-foreground opacity-60"
                        )}
                        onClick={() => onDayClick?.(dia)}
                    >
                        <CardHeader className="pb-2 pt-3">
                            <CardTitle className="text-center">
                                <div className="text-2xl font-bold">{dia.getDate()}</div>
                                <div className="text-sm text-gray-600 capitalize">{diaSemana}</div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-3">
                            <div className="text-center flex items-center justify-center flex-col">
                                <p className={"font-semibold text-lg pt-1"}>
                                    {quantidadeGuardaVidas}
                                </p>
                                <p className="text-xs">
                                     escalados
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
}