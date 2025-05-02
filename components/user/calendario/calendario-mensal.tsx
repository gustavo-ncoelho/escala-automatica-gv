"use client"

import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {escalaMensal, obterNomePosto} from "@/utils/dados-simulados"
import {ChevronLeft, ChevronRight, MapPin} from "lucide-react"
import {useState} from "react"

interface CalendarioMensalProps {
    mes: number
    ano: number
}

export function CalendarioMensal({mes, ano}: CalendarioMensalProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date(ano, mes - 1, 1))

    const diasNoMes = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
    const diasAntes = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

    const diasCalendario = Array.from({length: 42}, (_, i) => {
        const diaAjustado = i - diasAntes + 1
        if (diaAjustado <= 0 || diaAjustado > diasNoMes) {
            return null
        }
        return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), diaAjustado)
    })

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

    const getAlocacaoDoDia = (data: Date) => {
        return escalaMensal.alocacoes.find(
            (a) =>
                a.data.getDate() === data.getDate() &&
                a.data.getMonth() === data.getMonth() &&
                a.data.getFullYear() === data.getFullYear() &&
                a.guardaVidasId === 1, // ID do guarda-vidas logado
        )
    }

    const ehHoje = (data: Date) => {
        const hoje = new Date()
        return (
            data.getDate() === hoje.getDate() &&
            data.getMonth() === hoje.getMonth() &&
            data.getFullYear() === hoje.getFullYear()
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                    {currentMonth.toLocaleDateString("pt-BR", {month: "long", year: "numeric"})}
                </h2>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                    >
                        <ChevronLeft className="h-4 w-4"/>
                        <span className="sr-only">Mês anterior</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                    >
                        <ChevronRight className="h-4 w-4"/>
                        <span className="sr-only">Próximo mês</span>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
                {diasSemana.map((dia) => (
                    <div key={dia} className="text-center font-medium py-2 text-xs md:text-sm">
                        {dia}
                    </div>
                ))}

                {diasCalendario.map((dia, index) => {
                    if (!dia) {
                        return <div key={`empty-${index}`} className="h-12 md:h-16 p-1"/>
                    }

                    const alocacao = getAlocacaoDoDia(dia)
                    const temAlocacao = !!alocacao
                    const hoje = ehHoje(dia)

                    return (
                        <Card
                            key={dia.toISOString()}
                            className={`h-12 md:h-16 p-1 overflow-hidden ${hoje ? "border-primary" : ""} ${
                                temAlocacao ? "bg-primary/5" : ""
                            }`}
                        >
                            <div className="flex flex-col h-full">
                                <div
                                    className={`text-xs md:text-sm font-medium ${
                                        dia.getDay() === 0 || dia.getDay() === 6 ? "text-red-500" : ""
                                    } ${hoje ? "text-primary font-bold" : ""}`}
                                >
                                    {dia.getDate()}
                                </div>

                                {temAlocacao && (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-auto mt-auto">
                                                <MapPin className="h-3 w-3"/>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64 p-2">
                                            <div className="space-y-2">
                                                <h3 className="font-medium">Escala do
                                                    dia {dia.toLocaleDateString("pt-BR")}</h3>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-sm">Posto:</div>
                                                    <Badge variant="outline">{obterNomePosto(alocacao.postoId)}</Badge>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-sm">Horário:</div>
                                                    <div className="text-sm font-medium">08:00 - 17:00</div>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                )}
                            </div>
                        </Card>
                    )
                })}
            </div>

            <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary/20"></div>
                    <span>Dia de trabalho</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full border border-primary"></div>
                    <span>Hoje</span>
                </div>
            </div>
        </div>
    )
}
