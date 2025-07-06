"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, MapPin, MapPinHouse, MapPinOff } from "lucide-react"
import {useEffect, useState } from "react"
import { isSameDay, isBefore, startOfToday } from "date-fns";
import { cn, guardaVidaTrabalhaEm } from "@/lib/utils";
import { GuardaVidasEscala, DiaDaSemana } from "@/types/guarda-vidas";
import {AlocacaoDiaria} from "@/types/alocacao-diaria";

interface CalendarioMensalProps {
    mes: number;
    ano: number;
    guardaVida: GuardaVidasEscala;
    alocacoes: AlocacaoDiaria[];
}

export function CalendarioMensal({ mes, ano, guardaVida, alocacoes }: CalendarioMensalProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date(ano, mes - 1, 1));

    const diasNoMes = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const primeiroDiaDoMes = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const diasAntes = primeiroDiaDoMes.getDay();

    const diasCalendario = Array.from({ length: diasAntes + diasNoMes }, (_, i) => {
        if (i < diasAntes) return null;
        const diaDoMes = i - diasAntes + 1;
        return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), diaDoMes);
    });

    useEffect(() => {
        setCurrentMonth(new Date(ano, mes - 1, 1));
    }, [mes, ano]);

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const hoje = startOfToday();

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
                    const temAlocacao = alocacoes.some((a) => isSameDay(new Date(a.data), dia));
                    const isHoje = isSameDay(dia, hoje);
                    const jaPassou = isBefore(dia, hoje);

                    return (
                        <div
                            key={dia.toISOString()}
                            className={cn(
                                "h-14 rounded-md border p-1 flex flex-col justify-between transition-colors",
                                isHoje && "border-primary border-2",
                                !trabalha && "bg-primary/10 text-muted-foreground/60",
                                temAlocacao && "bg-green-500/10",
                                !temAlocacao && trabalha && !jaPassou && "bg-transparent",
                                jaPassou && "bg-muted/50 text-muted-foreground opacity-60"
                            )}
                        >
                            <div className={cn(
                                `font-medium text-xs`,
                                jaPassou && "text-muted-foreground"
                            )}>
                                {dia.getDate()}
                            </div>
                            <div className={"w-full flex justify-end mb-1 mr-1"}>
                                {temAlocacao ? (
                                    <MapPinHouse className={"w-5 h-5 text-green-600"} strokeWidth={1.5}/>
                                ) : trabalha ? (
                                    <MapPin className={"w-5 h-5"} strokeWidth={1.5}/>
                                ) : (
                                    <MapPinOff className={cn("w-5 h-5 text-muted-foreground/60", jaPassou && "text-muted-foreground")} strokeWidth={1.5}/>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex items-center justify-center gap-4 text-sm mt-4">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full border-2 border-primary/90"></div>
                    <span>Dia de trabalho</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary/20"></div>
                    <span>Folgas</span>
                </div>
            </div>
        </Card>
    );
}
