"use client"

import {useState} from "react"
import {GuardaVidasEscala} from "@/types/guarda-vidas"
import EscalaMensal from "@/components/admin/escala/escala-mensal";
import {Calendar, Eye, Grid3X3} from "lucide-react";
import {
    anosParaSelecionar,
    converterGVParaGVEscala,
    dataAtual,
    gerarArrayDeDatasDoMes,
    getNomeMes,
    mesesParaSelecionar
} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import VisaoGeral from "@/components/admin/escala/visao-geral";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useGetAllGuardaVidas} from "@/hooks/api/guarda-vidas/use-get-all-guarda-vidas";
import {useAppContext} from "@/contexts/app-context";

export default function EscalaPage() {

    const {data: guardaVidas} = useGetAllGuardaVidas();
    const {adminEscalaMode, setAdminEscalaMode} = useAppContext();
    const [anoSelecionado, setAnoSelecionado] = useState<number>(dataAtual.getFullYear());
    const [mesSelecionado, setMesSelecionado] = useState<number>(dataAtual.getMonth() + 1);
    const guardaVidasEscala: GuardaVidasEscala[] = converterGVParaGVEscala(guardaVidas);
    const diasArray = gerarArrayDeDatasDoMes(mesSelecionado, anoSelecionado);

    const handleDayClick = (dia: number) => {
        console.log(`Clicou no dia ${dia}`)
    }

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

            {adminEscalaMode === "mensal" &&
                <EscalaMensal diasDoMes={diasArray} guardaVidas={guardaVidasEscala}/>
            }

            {adminEscalaMode === "geral" &&
                <VisaoGeral diasDoMes={diasArray} guardaVidas={guardaVidasEscala}/>
            }
        </>
    )
}
