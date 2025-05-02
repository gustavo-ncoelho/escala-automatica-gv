"use client"

import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {escalaMensal, niveisLotacao, obterNomeGuardaVidas, obterNomePosto} from "@/utils/dados-simulados"
import {ChevronLeft, ChevronRight, Users} from "lucide-react"
import {useState} from "react"

interface CalendarioEscalaProps {
  mes: number
  ano: number
}

export function CalendarioEscala({ mes, ano }: CalendarioEscalaProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(ano, mes - 1, 1))

  const diasNoMes = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

  const diasAntes = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const diasCalendario = Array.from({ length: 42 }, (_, i) => {
    const diaAjustado = i - diasAntes + 1
    if (diaAjustado <= 0 || diaAjustado > diasNoMes) {
      return null
    }
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), diaAjustado)
  })

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  const getAlocacoesPorDia = (data: Date) => {
    return escalaMensal.alocacoes.filter(
      (a) =>
        a.data.getDate() === data.getDate() &&
        a.data.getMonth() === data.getMonth() &&
        a.data.getFullYear() === data.getFullYear(),
    )
  }

  const getNivelLotacao = (data: Date) => {
    const nivel = niveisLotacao.find(
      (n) =>
        n.data.getDate() === data.getDate() &&
        n.data.getMonth() === data.getMonth() &&
        n.data.getFullYear() === data.getFullYear(),
    )
    return nivel ? nivel.nivel : 1
  }

  const getBadgeVariant = (nivel: number) => {
    switch (nivel) {
      case 1:
        return "outline"
      case 2:
        return "secondary"
      case 3:
        return "default"
      case 4:
        return "destructive"
      case 5:
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {currentMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Mês anterior</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próximo mês</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {diasSemana.map((dia) => (
          <div key={dia} className="text-center font-medium py-2">
            {dia}
          </div>
        ))}

        {diasCalendario.map((dia, index) => {
          if (!dia) {
            return <div key={`empty-${index}`} className="h-24 p-1" />
          }

          const alocacoes = getAlocacoesPorDia(dia)
          const nivelLotacao = getNivelLotacao(dia)
          const totalGuardaVidas = alocacoes.length

          return (
            <Card key={dia.toISOString()} className="h-24 p-1 overflow-hidden">
              <div className="flex items-start justify-between">
                <div
                  className={`text-sm font-medium p-1 ${dia.getDay() === 0 || dia.getDay() === 6 ? "text-red-500" : ""}`}
                >
                  {dia.getDate()}
                </div>
                <Badge variant={getBadgeVariant(nivelLotacao)}>Nível {nivelLotacao}</Badge>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs mt-1">
                    <Users className="h-3 w-3 mr-1" />
                    {totalGuardaVidas} guarda-vidas
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h3 className="font-medium">Escala do dia {dia.toLocaleDateString("pt-BR")}</h3>
                    <div className="text-sm text-muted-foreground">
                      Nível de lotação: {nivelLotacao} - {totalGuardaVidas} guarda-vidas
                    </div>
                    <div className="space-y-1 mt-2">
                      {alocacoes.map((alocacao) => (
                        <div
                          key={`${alocacao.guardaVidasId}-${alocacao.postoId}`}
                          className="flex justify-between text-sm py-1 border-b last:border-0"
                        >
                          <div>{obterNomeGuardaVidas(alocacao.guardaVidasId)}</div>
                          <div className="font-medium">{obterNomePosto(alocacao.postoId)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
