import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Users} from "lucide-react";
import {AlocacaoDiaria} from "@/types/escala";
import {contarGuardaVidasPorDia} from "@/lib/utils";

interface VisaoGeralProps {
    diasArray: Date[]
    alocacoes: AlocacaoDiaria[];
}

export default function VisaoGeral ({diasArray, alocacoes}: VisaoGeralProps) {

    const onDayClick = (dia: number) => {

    }

    return(
        <div className="grid grid-cols-1 sm:grid-cols-10 gap-4">
            {diasArray.map((dia) => {

                const diaSemana = dia.toLocaleDateString("pt-BR", { weekday: "short" });
                const quantidadeGuardaVidas = contarGuardaVidasPorDia(dia, alocacoes);

                return (
                    <Card
                        key={dia.toISOString()}
                        className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 border`}
                        onClick={() => onDayClick?.(dia.getDate())}
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