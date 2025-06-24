import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Progress} from "@/components/ui/progress"
import {guardaVidasMock} from "@/utils/dados-simulados"

export function EstatisticasGuardaVidas() {
    const guardaVidasMaisAtivos = [...guardaVidasMock]
        .sort((a, b) => b.estatisticas?.diasTrabalhadosNaTemporada ?? 0 - (a.estatisticas?.diasTrabalhadosNaTemporada ?? 0))
        .slice(0, 5)

    const guardaVidasMenosAtivos = [...guardaVidasMock]
        .sort((a, b) => a.estatisticas?.diasTrabalhadosNaTemporada ?? 0 - (b.estatisticas?.diasTrabalhadosNaTemporada ?? 0))
        .slice(0, 5)

    const maxDiasTrabalhados = Math.max(...guardaVidasMock.map((gv) => (gv.estatisticas?.diasTrabalhadosNaTemporada ?? 0)))

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
                                    <div className="text-muted-foreground">{gv.estatisticas?.diasTrabalhadosNaTemporada ?? 0} dias</div>
                                </div>
                                <Progress value={(gv.estatisticas?.diasTrabalhadosNaTemporada ?? 0 / maxDiasTrabalhados) * 100}/>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
