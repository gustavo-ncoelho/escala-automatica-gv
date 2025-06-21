"use client"

import {useEffect} from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {AlocacaoDiaria} from "@/types/escala";
import {GuardaVidasEscala} from "@/types/guarda-vidas";
import {cn} from "@/lib/utils";

interface EscalaMensalProps {
    mes: number
    ano: number
    alocacoes: AlocacaoDiaria[]
    guardaVidas: GuardaVidasEscala[]
    onDayClick?: (dia: number) => void
}

export default function EscalaMensal({ mes, ano, alocacoes, guardaVidas }: EscalaMensalProps) {

    const getDiasNoMes = (mes: number, ano: number) => {
        return new Date(ano, mes, 0).getDate()
    }

    const guardaVidaTrabalhaEm = (guardaVidasId: number, dia: number) => {
        return alocacoes.some(
            (alocacao) =>
                alocacao.guardaVidasId === guardaVidasId &&
                alocacao.data.getDate() === dia &&
                alocacao.data.getMonth() === mes - 1 &&
                alocacao.data.getFullYear() === ano,
        )
    }

    const diasNoMes = getDiasNoMes(mes, ano)
    const diasArray = Array.from({ length: diasNoMes }, (_, i) => i + 1)

    useEffect(() => {
        console.log('Alocações recebidas:', alocacoes)
        console.log('Guarda-vidas recebidos:', guardaVidas)
        console.log('Primeira alocação:', alocacoes[0])
        console.log('Data da primeira alocação:', alocacoes[0]?.data)
        console.log('Mês/Ano buscado:', mes, ano)
    }, [])

    return (
        <div className="overflow-x-auto border rounded-2xl">
            <Table className="min-w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="sticky left-0 z-10 bg-background min-w-[200px] border-r-2">Guarda-Vidas</TableHead>
                        {diasArray.map((dia) => (
                            <TableHead key={dia} className="text-center min-w-[40px] p-2">
                                {dia}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {guardaVidas.map((guardaVida) => (
                        <TableRow key={guardaVida.id}>
                            <TableCell className="sticky left-0 z-10 font-medium border-r-2 bg-background">{guardaVida.nome}</TableCell>
                            {diasArray.map((dia) => {
                                const trabalha = guardaVidaTrabalhaEm(guardaVida.id, dia)
                                return (
                                    <TableCell key={dia} className="text-center p-1 border">
                                            <div className={cn("w-6 h-6 bg-blue-500 rounded-full mx-auto flex items-center justify-center",
                                                !trabalha && "invisible")}
                                            >
                                                <div className="w-3 h-3 bg-white rounded-full"></div>
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
