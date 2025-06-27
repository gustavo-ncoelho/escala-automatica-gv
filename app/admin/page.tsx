"use client"

import {useState} from "react"
import {GuardaVidasEscala} from "@/types/guarda-vidas"
import EscalaMensal from "@/components/admin/escala/escala-mensal";
import {Calendar, Eye, Grid3X3} from "lucide-react";
import {converterGVParaGVEscala, gerarArrayDeDatasDoMes, getNomeMes} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import VisaoGeral from "@/components/admin/escala/visao-geral";
import {guardaVidasMock} from "@/utils/dados-simulados";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function EscalaPage() {

    const dataAtual = new Date();
    const [anoSelecionado, setAnoSelecionado] = useState<number>(dataAtual.getFullYear());
    const [mesSelecionado, setMesSelecionado] = useState<number>(dataAtual.getMonth() + 1);
    const [modoAtual, setModoAtual] = useState<string>("mensal");
    const guardaVidasEscala: GuardaVidasEscala[] = converterGVParaGVEscala(guardaVidasMock);
    const diasArray = gerarArrayDeDatasDoMes(mesSelecionado, anoSelecionado);

    const anosParaSelecionar = Array.from({ length: 5 }, (_, i) => dataAtual.getFullYear() - 2 + i);
    const mesesParaSelecionar = [
        { valor: 1, nome: 'Janeiro' }, { valor: 2, nome: 'Fevereiro' },
        { valor: 3, nome: 'Março' }, { valor: 4, nome: 'Abril' },
        { valor: 5, nome: 'Maio' }, { valor: 6, nome: 'Junho' },
        { valor: 7, nome: 'Julho' }, { valor: 8, nome: 'Agosto' },
        { valor: 9, nome: 'Setembro' }, { valor: 10, nome: 'Outubro' },
        { valor: 11, nome: 'Novembro' }, { valor: 12, nome: 'Dezembro' },
    ];

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
                        variant={modoAtual === "mensal" ? "default" : "outline"}
                        onClick={() => setModoAtual("mensal")}
                        className="flex items-center gap-2"
                    >
                        <Grid3X3 className="h-4 w-4" />
                        Escala Mensal
                    </Button>
                    <Button
                        variant={modoAtual === "geral" ? "default" : "outline"}
                        onClick={() => setModoAtual("geral")}
                        className="flex items-center gap-2"
                    >
                        <Eye className="h-4 w-4" />
                        Visão Geral
                    </Button>
                </div>
            </div>

            {modoAtual === "mensal" &&
                <EscalaMensal diasDoMes={diasArray} guardaVidas={guardaVidasEscala}/>
            }

            {modoAtual === "geral" &&
                <VisaoGeral diasDoMes={diasArray} guardaVidas={guardaVidasEscala}/>
            }
        </>
    )
}
