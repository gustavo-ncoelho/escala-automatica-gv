import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Progress} from "@/components/ui/progress"
import {guardaVidas} from "@/utils/dados-simulados"

export function EstatisticasGuardaVidas() {
    const guardaVidasMaisAtivos = [...guardaVidas]
        .sort((a, b) => b.estatisticas.diasTrabalhados - a.estatisticas.diasTrabalhados)
        .slice(0, 5)

    const guardaVidasMenosAtivos = [...guardaVidas]
        .sort((a, b) => a.estatisticas.diasTrabalhados - b.estatisticas.diasTrabalhados)
        .slice(0, 5)

    const maxDiasTrabalhados = Math.max(...guardaVidas.map((gv) => gv.estatisticas.diasTrabalhados))

    return (
        <div className="w-3/5 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Guarda-Vidas Mais Ativos</CardTitle>
                    <CardDescription>Guarda-vidas com mais dias trabalhados no mês atual</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {guardaVidasMaisAtivos.map((gv) => (
                            <div key={gv.id} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="font-medium">{gv.nome}</div>
                                    <div className="text-muted-foreground">{gv.estatisticas.diasTrabalhados} dias</div>
                                </div>
                                <Progress value={(gv.estatisticas.diasTrabalhados / maxDiasTrabalhados) * 100}/>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
