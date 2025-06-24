import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Progress} from "@/components/ui/progress"
import {alocacoesMock, postosMock} from "@/utils/dados-simulados"
import {filtrarAlocacoesPorMes} from "@/lib/utils";

export function EstatisticasPostos() {
    const alocacoesPorPosto = postosMock.map((posto) => {
        const alocacoes = filtrarAlocacoesPorMes(3, 2025, alocacoesMock)
        return {
            posto,
            totalAlocacoes: alocacoes.length,
        }
    })

    const postosMaisAlocados = [...alocacoesPorPosto].sort((a, b) => b.totalAlocacoes - a.totalAlocacoes)

    const postosMenosAlocados = [...alocacoesPorPosto].sort((a, b) => a.totalAlocacoes - b.totalAlocacoes)

    const maxAlocacoes = Math.max(...alocacoesPorPosto.map((p) => p.totalAlocacoes))

    return (
        <div className="w-3/5 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Postos Mais Alocados</CardTitle>
                    <CardDescription>Postos com maior número de guarda-vidas alocados</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {postosMaisAlocados.slice(0, 5).map(({posto, totalAlocacoes}) => (
                            <div key={posto.id} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="font-medium">{posto.nome}</div>
                                    <div className="text-muted-foreground">{totalAlocacoes ?? 0} alocações</div>
                                </div>
                                <Progress value={(totalAlocacoes / maxAlocacoes) * 100}/>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
