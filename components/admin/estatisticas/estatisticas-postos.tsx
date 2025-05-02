import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { escalaMensal, postos } from "@/utils/dados-simulados"

export function EstatisticasPostos() {
  // Calcular a frequência de alocação por posto
  const alocacoesPorPosto = postos.map((posto) => {
    const alocacoes = escalaMensal.alocacoes.filter((a) => a.postoId === posto.id)
    return {
      posto,
      totalAlocacoes: alocacoes.length,
    }
  })

  // Ordenar postos por número de alocações (mais alocados primeiro)
  const postosMaisAlocados = [...alocacoesPorPosto].sort((a, b) => b.totalAlocacoes - a.totalAlocacoes)

  // Ordenar postos por número de alocações (menos alocados primeiro)
  const postosMenosAlocados = [...alocacoesPorPosto].sort((a, b) => a.totalAlocacoes - b.totalAlocacoes)

  // Calcular o máximo de alocações para normalizar as barras de progresso
  const maxAlocacoes = Math.max(...alocacoesPorPosto.map((p) => p.totalAlocacoes))

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Postos Mais Alocados</CardTitle>
          <CardDescription>Postos com maior número de guarda-vidas alocados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {postosMaisAlocados.slice(0, 5).map(({ posto, totalAlocacoes }) => (
              <div key={posto.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="font-medium">{posto.nome}</div>
                  <div className="text-muted-foreground">{totalAlocacoes} alocações</div>
                </div>
                <Progress value={(totalAlocacoes / maxAlocacoes) * 100} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Postos Menos Alocados</CardTitle>
          <CardDescription>Postos com menor número de guarda-vidas alocados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {postosMenosAlocados.slice(0, 5).map(({ posto, totalAlocacoes }) => (
              <div key={posto.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="font-medium">{posto.nome}</div>
                  <div className="text-muted-foreground">{totalAlocacoes} alocações</div>
                </div>
                <Progress value={(totalAlocacoes / maxAlocacoes) * 100} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
