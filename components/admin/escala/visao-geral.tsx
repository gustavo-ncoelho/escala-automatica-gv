"use client"

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GuardaVidasEscala } from "@/types/guarda-vidas";
import {guardaVidaTrabalhaEm} from "@/lib/utils";
import {format} from "date-fns";
import {useRouter} from "next/navigation";

interface VisaoGeralProps {
    diasDoMes: Date[];
    guardaVidas: GuardaVidasEscala[];
}

export default function VisaoGeral ({diasDoMes, guardaVidas}: VisaoGeralProps) {

    const router = useRouter();

    const contarTrabalhandoNoDia = (dataDoDia: Date): number => {
        return guardaVidas.filter(gv => guardaVidaTrabalhaEm(gv, dataDoDia)).length;
    };

    const onDayClick = (dia: Date) => {
        const dataFormatada = format(dia, 'yyyy-MM-dd');

        router.push(`/admin/${dataFormatada}`);
    }

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {diasDoMes.map((dia) => {
                const diaSemana = dia.toLocaleDateString("pt-BR", { weekday: "short" }).replace('.', '');
                const quantidadeGuardaVidas = contarTrabalhandoNoDia(dia);

                return (
                    <Card
                        key={dia.toISOString()}
                        className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 border`}
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
                                <p className={"font-semibold text-lg py-1"}>
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