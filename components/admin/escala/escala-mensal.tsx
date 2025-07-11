"use client"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {GuardaVidasEscala} from "@/types/guarda-vidas";
import {cn, guardaVidaTrabalhaEm} from "@/lib/utils";

interface EscalaMensalProps {
    diasDoMes: Date[];
    guardaVidas: GuardaVidasEscala[];
    onDayClick?: (data: Date, guardaVidasId: string) => void;
}

export default function EscalaMensal({ diasDoMes, guardaVidas, onDayClick }: EscalaMensalProps) {
    return (
        <div className="overflow-x-auto border rounded-lg shadow-sm w-full">
            <Table className="min-w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="sticky left-0 z-10 bg-background min-w-[200px] border-r">Guarda-Vidas</TableHead>
                        {diasDoMes.map((dataDoDia) => {
                            const diaDaSemana = dataDoDia.toLocaleDateString('pt-BR', { weekday: 'short' });
                            const isWeekend = dataDoDia.getDay() === 0 || dataDoDia.getDay() === 6;
                            return (
                                <TableHead key={dataDoDia.toISOString()} className={cn("text-center min-w-[55px] p-1 border-r last:border-r-0", isWeekend && "bg-muted/50")}>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs font-normal text-muted-foreground capitalize">{diaDaSemana.replace('.', '')}</span>
                                        <span className="text-base font-bold">{dataDoDia.getDate()}</span>
                                    </div>
                                </TableHead>
                            )
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {guardaVidas.map((guardaVida) => (
                        <TableRow key={guardaVida.id}>
                            <TableCell className="sticky left-0 z-10 font-medium border-r bg-background">{guardaVida.nome}</TableCell>
                            {diasDoMes.map((dataDoDia) => {
                                const isWeekend = dataDoDia.getDay() === 0 || dataDoDia.getDay() === 6;
                                const trabalha = guardaVidaTrabalhaEm(guardaVida, dataDoDia);

                                return (
                                    <TableCell
                                        key={dataDoDia.toISOString()}
                                        className={cn("text-center p-1 border-r last:border-r-0 cursor-pointer hover:bg-muted/80", isWeekend && "bg-muted/50")}
                                        onClick={() => onDayClick?.(dataDoDia, guardaVida.id)}
                                    >
                                        <div className={cn("w-6 h-6 bg-green-600 dark:bg-green-800 rounded-full mx-auto", !trabalha && "invisible")}>
                                        </div>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}