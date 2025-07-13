"use client"

import {GuardaVidasEscala} from "@/types/guarda-vidas"
import EscalaMensal from "@/components/admin/escala/escala-mensal";
import {Calendar, Eye, Grid3X3} from "lucide-react";
import {
    anosParaSelecionar, cn,
    converterListaGVParaListaGVEscala,
    gerarArrayDeDatasDoMes,
    getNomeMes,
    mesesParaSelecionar
} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import VisaoGeral from "@/components/admin/escala/visao-geral";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useGetAllGuardaVidas} from "@/hooks/api/guarda-vidas/use-get-all-guarda-vidas";
import {useAdminContext} from "@/contexts/admin-context";
import FullscreenLoader from "@/components/utils/fullscreen-loader";
import {useGetAlocacoesPorMes} from "@/hooks/api/alocacao-diaria/use-get-alocacacoes-por-mes";

export default function EscalaPage() {

    const {data: guardaVidas, isLoading: isLoadingGuardaVidas} = useGetAllGuardaVidas();
    const {adminEscalaMode, setAdminEscalaMode, anoSelecionado, mesSelecionado, setMesSelecionado, setAnoSelecionado} = useAdminContext();
    const {data: alocacoes, isLoading: isLoadingAlocacoes} = useGetAlocacoesPorMes(mesSelecionado,anoSelecionado);
    const guardaVidasEscala: GuardaVidasEscala[] = converterListaGVParaListaGVEscala(guardaVidas);
    const diasArray = gerarArrayDeDatasDoMes(mesSelecionado, anoSelecionado);

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    <h1 className="text-3xl font-bold">
                        {getNomeMes(mesSelecionado)} {anoSelecionado}
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <Select value={mesSelecionado.toString()} onValueChange={(valor) => setMesSelecionado(Number(valor))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecione o Mês" />
                        </SelectTrigger>
                        <SelectContent>
                            {mesesParaSelecionar.map(mes => (
                                <SelectItem key={mes.valor} value={mes.valor.toString()}>{mes.nome}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={anoSelecionado.toString()} onValueChange={(valor) => setAnoSelecionado(Number(valor))}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Selecione o Ano" />
                        </SelectTrigger>
                        <SelectContent>
                            {anosParaSelecionar.map(ano => (
                                <SelectItem key={ano} value={ano.toString()}>{ano}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant={adminEscalaMode === "mensal" ? "default" : "outline"}
                        onClick={() => setAdminEscalaMode("mensal")}
                        className="flex items-center gap-2"
                    >
                        <Grid3X3 className="h-4 w-4" />
                        Escala Mensal
                    </Button>
                    <Button
                        variant={adminEscalaMode === "geral" ? "default" : "outline"}
                        onClick={() => setAdminEscalaMode("geral")}
                        className="flex items-center gap-2"
                    >
                        <Eye className="h-4 w-4" />
                        Visão Geral
                    </Button>
                </div>
            </div>

            <div className={cn("flex items-center justify-center w-full", isLoadingGuardaVidas && "h-full pb-36")}>
                {adminEscalaMode === "mensal" && !isLoadingGuardaVidas &&
                    <EscalaMensal diasDoMes={diasArray} guardaVidas={guardaVidasEscala}/>
                }

                {adminEscalaMode === "geral" && !isLoadingGuardaVidas && !isLoadingAlocacoes &&
                    <VisaoGeral diasDoMes={diasArray} guardaVidas={guardaVidasEscala} alocacoes={alocacoes ?? []}/>
                }

                {(isLoadingGuardaVidas || isLoadingAlocacoes) && <FullscreenLoader/>}
            </div>
        </>
    )
}
