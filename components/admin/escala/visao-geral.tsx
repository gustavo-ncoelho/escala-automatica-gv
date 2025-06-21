import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Users} from "lucide-react";
import {AlocacaoDiaria} from "@/types/escala";
import {contarGuardaVidasPorDia} from "@/lib/utils";

interface VisaoGeralProps {
    diasArray: number[]
    alocacoes: AlocacaoDiaria[];
}

export default function VisaoGeral ({diasArray, alocacoes}: VisaoGeralProps) {
    const mes = 3;
    const ano = 2025;

    const onDayClick = (dia: number) => {

    }

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {diasArray.map((dia) => {
                const quantidadeGuardaVidas = contarGuardaVidasPorDia(dia, alocacoes)
                const diaSemana = new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR", { weekday: "short" })

                return (
                    <Card
                        key={dia}
                        className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105`}
                        onClick={() => onDayClick?.(dia)}
                    >
                        <CardHeader className="pb-2">
                            <CardTitle className="text-center">
                                <div className="text-2xl font-bold">{dia}</div>
                                <div className="text-sm text-gray-600 capitalize">{diaSemana}</div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="text-center">
                                <Badge variant={quantidadeGuardaVidas === 0 ? "destructive" : "default"} className="text-xs">
                                    <Users className="w-3 h-3 mr-1" />
                                    {quantidadeGuardaVidas} escalados
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
}