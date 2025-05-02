"use client"

import {Badge} from "@/components/ui/badge"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {escalaMensal, guardaVidas} from "@/utils/dados-simulados"

interface TabelaEscalaProps {
    mes: number
    ano: number
}

export function TabelaEscala({mes, ano}: TabelaEscalaProps) {

    const diasNoMes = new Date(ano, mes, 0).getDate()
    const dias = Array.from({length: diasNoMes}, (_, i) => i + 1)

    const alocacoesFiltradas = escalaMensal.alocacoes.filter(
        (a) => a.data.getMonth() + 1 === mes && a.data.getFullYear() === ano,
    )

    const alocacoesPorGuardaVidas = guardaVidas.map((gv) => {
        const diasAlocados = dias.map((dia) => {
            const alocacao = alocacoesFiltradas.find((a) => a.data.getDate() === dia && a.guardaVidasId === gv.id)
            return alocacao ? alocacao.postoId : null
        })

        return {
            guardaVidas: gv,
            alocacoes: diasAlocados,
        }
    })

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="sticky left-0 bg-background">Guarda-Vidas</TableHead>
                        {dias.map((dia) => (
                            <TableHead key={dia} className="text-center min-w-[40px]">
                                {dia}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {alocacoesPorGuardaVidas.map(({guardaVidas, alocacoes}) => (
                        <TableRow key={guardaVidas.id}>
                            <TableCell
                                className="font-medium sticky left-0 bg-background">{guardaVidas.nome}</TableCell>
                            {alocacoes.map((postoId, index) => (
                                <TableCell key={index} className="text-center py-1 px-1.5">
                                    {postoId ? (
                                        <Badge variant="table" className="w-full">
                                            P{postoId}
                                        </Badge>
                                    ) : (
                                        <span className="text-muted-foreground">-</span>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
