"use client";

import {EstatisticasGuardaVidas} from "@/components/admin/estatisticas/estatisticas-guarda-vidas"
import {useGetRankingDiasTrabalhados} from "@/hooks/api/estatisticas/use-get-ranking-dias-trabalhados";

export default function PainelPage() {

    const {data: ranking, isLoading} = useGetRankingDiasTrabalhados();

    return (
        <>
            {ranking && <EstatisticasGuardaVidas ranking={ranking} isLoading={isLoading}/>}
        </>
    )
}
