"use client";

import {EstatisticasGuardaVidas} from "@/components/admin/estatisticas/estatisticas-guarda-vidas"
import {useGetRankingDiasTrabalhados} from "@/hooks/api/estatisticas/use-get-ranking-dias-trabalhados";
import {CardDescription, CardTitle} from "@/components/ui/card";
import {TrendingUp} from "lucide-react";

export default function PainelPage() {

    const {data: ranking, isLoading} = useGetRankingDiasTrabalhados();

    return (
        <div className={"space-y-6"}>
            <div className="gap-4">
                <div className={"text-3xl font-semibold"}>Ranking de Atividade</div>
                <div className={"text-muted-foreground"}>Classificação de guarda-vidas por dias trabalhados.</div>
            </div>
            <EstatisticasGuardaVidas ranking={ranking} isLoading={isLoading}/>
        </div>
    )
}
