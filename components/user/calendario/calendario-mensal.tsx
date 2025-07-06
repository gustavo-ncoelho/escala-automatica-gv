"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { isSameDay } from "date-fns";
import {cn, guardaVidaTrabalhaEm} from "@/lib/utils";
import { GuardaVidasEscala, DiaDaSemana } from "@/types/guarda-vidas";

interface CalendarioMensalProps {
    mes: number;
    ano: number;
    guardaVida: GuardaVidasEscala;
}

export function CalendarioMensal({ mes, ano, guardaVida }: CalendarioMensalProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date(ano, mes - 1, 1));

    const diasNoMes = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const primeiroDiaDoMes = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const diasAntes = primeiroDiaDoMes.getDay();

    const diasCalendario = Array.from({ length: diasAntes + diasNoMes }, (_, i) => {
        if (i < diasAntes) return null;
        const diaDoMes = i - diasAntes + 1;
        return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), diaDoMes);
    });

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    const ehHoje = (data: Date) => isSameDay(data, new Date());

    return (
        <Card className="py-4 border-none">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold capitalize">
                    {currentMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                </h2>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                    >
                        <ChevronLeft className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                    >
                        <ChevronRight className="h-4 w-4"/>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
                {diasSemana.map((dia) => (
                    <div key={dia} className="text-center font-medium text-muted-foreground py-2 text-sm">
                        {dia}
                    </div>
                ))}

                {diasCalendario.map((dia, index) => {
                    if (!dia) {
                        return <div key={`empty-${index}`} className="h-14 rounded-md border border-transparent"/>;
                    }

                    const trabalha = guardaVidaTrabalhaEm(guardaVida, dia);
                    const hoje = ehHoje(dia);

                    return (
                        <div
                            key={dia.toISOString()}
                            className={cn(
                                "h-14 rounded-md border p-1 flex flex-col",
                                hoje && "border-primary border-2",
                                trabalha && "bg-primary/10"
                            )}
                        >
                            <div className={`font-medium text-xs ${dia.getDay() === 0 || dia.getDay() === 6 ? "text-red-500" : ""}`}>
                                {dia.getDate()}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex items-center justify-center gap-4 text-sm mt-4">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary/20"></div>
                    <span>Dia de trabalho</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full border-2 border-primary"></div>
                    <span>Hoje</span>
                </div>
            </div>
        </Card>
    );
}
