"use client"

import {useState} from "react"
import {GuardaVidasEscala} from "@/types/guarda-vidas"
import EscalaMensal from "@/components/admin/escala/escala-mensal";
import {Calendar, Eye, Grid3X3} from "lucide-react";
import {converterGVParaGVEscala, getNomeMes} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import VisaoGeral from "@/components/admin/escala/visao-geral";
import {guardaVidasMock} from "@/utils/dados-simulados";

export default function EscalaPage() {

    const mes = 3;
    const ano = 2025;

    const guardaVidasEscala: GuardaVidasEscala[] = converterGVParaGVEscala(guardaVidasMock);

    const handleDayClick = (dia: number) => {
        console.log(`Clicou no dia ${dia}`)
    }

    const [modoAtual, setModoAtual] = useState<string>("mensal")

    const gerarArrayDeDatasDoMes = (mes: number, ano: number): Date[] => {
        const diasNoMes = new Date(ano, mes, 0).getDate();

        return Array.from({length: diasNoMes}, (_, i) => {
            const dia = i + 1;
            return new Date(ano, mes - 1, dia);
        });
    };

    const mesAtual = 3;
    const anoAtual = 2025;

    const diasArray = gerarArrayDeDatasDoMes(mesAtual, anoAtual);

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    <h1 className="text-3xl font-bold">
                        {getNomeMes(mes)} {ano}
                    </h1>
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
