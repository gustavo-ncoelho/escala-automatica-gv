import { Badge } from "@/components/ui/badge"
import { escalaMensal, obterNomePosto } from "@/utils/dados-simulados"
import { Calendar } from "lucide-react"

interface ListaEscalasProps {
  mes: number
  ano: number
}

export function ListaEscalas({ mes, ano }: ListaEscalasProps) {
  // Filtrar alocações do mês e ano selecionados para o guarda-vidas logado
  const alocacoesFiltradas = escalaMensal.alocacoes.filter(
    (a) => a.data.getMonth() + 1 === mes && a.data.getFullYear() === ano && a.guardaVidasId === 1, // ID do guarda-vidas logado
  )

  // Ordenar por data
  const alocacoesOrdenadas = [...alocacoesFiltradas].sort((a, b) => a.data.getTime() - b.data.getTime())

  if (alocacoesOrdenadas.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Nenhuma escala encontrada para este mês.</div>
  }

  // Agrupar por semana
  const alocacoesPorSemana: { [key: string]: typeof alocacoesOrdenadas } = {}

  alocacoesOrdenadas.forEach((alocacao) => {
    // Calcular o número da semana no mês
    const dia = alocacao.data.getDate()
    const semana = Math.ceil(dia / 7)
    const chave = `Semana ${semana}`

    if (!alocacoesPorSemana[chave]) {
      alocacoesPorSemana[chave] = []
    }

    alocacoesPorSemana[chave].push(alocacao)
  })

  return (
    <div className="space-y-6">
      {Object.entries(alocacoesPorSemana).map(([semana, alocacoes]) => (
        <div key={semana} className="space-y-2">
          <h3 className="font-medium text-sm text-muted-foreground">{semana}</h3>
          <div className="space-y-2">
            {alocacoes.map((alocacao) => {
              const hoje = new Date()
              const dataAlocacao = new Date(alocacao.data)
              const ehHoje =
                dataAlocacao.getDate() === hoje.getDate() &&
                dataAlocacao.getMonth() === hoje.getMonth() &&
                dataAlocacao.getFullYear() === hoje.getFullYear()

              return (
                <div
                  key={alocacao.data.toISOString()}
                  className={`flex items-start gap-4 p-3 rounded-lg border ${
                    ehHoje ? "border-primary bg-primary/5" : "bg-card"
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">
                      {alocacao.data.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
                    </div>
                    <div className="text-sm text-muted-foreground">{obterNomePosto(alocacao.postoId)}</div>
                  </div>
                  <Badge variant="outline">08:00 - 17:00</Badge>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
