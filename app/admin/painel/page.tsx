import { EstatisticasGuardaVidas } from "@/components/admin/estatisticas/estatisticas-guarda-vidas"
import { EstatisticasPostos } from "@/components/admin/estatisticas/estatisticas-postos"

export default function PainelPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dados da temporada</h1>
                <p className="text-muted-foreground">Análise de dados e métricas.</p>
            </div>

            <div className={"flex flex-col items-center justify-cente pt-10 space-y-6"}>
                <EstatisticasGuardaVidas />
                <EstatisticasPostos />
            </div>
        </div>
    )
}
