"use client"

import {useState} from "react"
import {GuardaVidas, GuardaVidasEscala, Posto} from "@/types/guarda-vidas"
import {AlocacaoDiaria} from "@/types/escala";
import EscalaMensal from "@/components/admin/escala/escala-mensal";
import {Calendar, Eye, Grid3X3} from "lucide-react";
import {getNomeMes} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import VisaoGeral from "@/components/admin/escala/visao-geral";

class ModoVisualizacao {
}

export default function EscalaPage() {

    const mes = 3;
    const ano = 2025;

    const guardaVidasExemplo : GuardaVidasEscala[] = [
        { id: 1, nome: "Samuel Cruz" },
        { id: 2, nome: "Samuel Felisberto" },
        { id: 3, nome: "Luan Silva" },
        { id: 4, nome: "Luis Santos" },
        { id: 5, nome: "Lucio Oliveira" },
        { id: 6, nome: "Emanoel Costa" },
        { id: 7, nome: "Gustavo Lopes" },
        { id: 8, nome: "Thomas Almeida" },
        { id: 9, nome: "Lenoir Pereira" },
        { id: 10, nome: "Moacir Souza" },
        { id: 11, nome: "Juliano Ferreira" },
        { id: 12, nome: "Kaian Rodrigues" },
    ]

    const postosExemplo: Posto[] = [
        { id: 1, nome: "Posto 1", alocacaoMaxima: 3, localizacao: "Praia Central", numero: 1 },
        { id: 2, nome: "Posto 2", alocacaoMaxima: 3, localizacao: "Praia Norte", numero: 2 },
        { id: 3, nome: "Posto 3", alocacaoMaxima: 4, localizacao: "Praia Sul", numero: 3 },
        { id: 4, nome: "Posto 4", alocacaoMaxima: 3, localizacao: "Canto Direito", numero: 4 },
        { id: 5, nome: "Posto 5", alocacaoMaxima: 4, localizacao: "Canto Esquerdo", numero: 5 },
        { id: 6, nome: "Posto 6", alocacaoMaxima: 3, localizacao: "Praia do Meio", numero:6  },
        { id: 7, nome: "Posto 7", alocacaoMaxima: 3, localizacao: "Praia da Barra", numero: 7 },
        { id: 8, nome: "Posto 8", alocacaoMaxima: 4, localizacao: "Praia Grande", numero: 8 },
        { id: 9, nome: "Posto 9", alocacaoMaxima: 3, localizacao: "Praia Pequena", numero: 9 },
        { id: 10, nome: "Posto 10", alocacaoMaxima: 4, localizacao: "Praia do Forte", numero: 10 },
        { id: 11, nome: "Posto 11", alocacaoMaxima: 3, localizacao: "Praia Nova", numero: 11 },
        { id: 12, nome: "Posto 12", alocacaoMaxima: 3, localizacao: "Praia Velha", numero: 12 },
        { id: 13, nome: "Posto 13", alocacaoMaxima: 4, localizacao: "Praia Azul", numero:13  },
        { id: 14, nome: "Posto 14", alocacaoMaxima: 3, localizacao: "Praia Branca", numero: 14 },
        { id: 15, nome: "Lagoa", alocacaoMaxima: 2, localizacao: "Lagoa Municipal", numero: 15 },
    ]

    const alocacoesExemplo: AlocacaoDiaria[] = [
        { data: new Date("2025-03-01"), guardaVidasId: 1, postoId: 6 },
        { data: new Date("2025-03-15"), guardaVidasId: 2, postoId: 6 },


        { data: new Date("2025-03-12"), guardaVidasId: 3, postoId: 7 },
        { data: new Date("2025-03-19"), guardaVidasId: 4, postoId: 7 },

        // Posto 8
        { data: new Date("2025-03-20"), guardaVidasId: 5, postoId: 8 },
        { data: new Date("2025-03-23"), guardaVidasId: 6, postoId: 8 },

        // Posto 9
        { data: new Date("2025-03-07"), guardaVidasId: 7, postoId: 9 },
        { data: new Date("2025-03-19"), guardaVidasId: 8, postoId: 9 },

        // Posto 10
        { data: new Date("2025-03-03"), guardaVidasId: 9, postoId: 10 },
        { data: new Date("2025-03-29"), guardaVidasId: 10, postoId: 10 },

        // Lagoa (Posto 15)
        { data: new Date("2025-03-25"), guardaVidasId: 11, postoId: 15 },
        { data: new Date("2025-03-18"), guardaVidasId: 12, postoId: 15 },
    ]

    const handleDayClick = (dia: number) => {
        console.log(`Clicou no dia ${dia}`)
    }

    const [modoAtual, setModoAtual] = useState<ModoVisualizacao>("mensal")

    const getDiasNoMes = (mes: number, ano: number) => {
        return new Date(ano, mes, 0).getDate()
    }

    const diasNoMes = getDiasNoMes(mes, ano)
    const diasArray = Array.from({ length: diasNoMes }, (_, i) => i + 1)

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
                <EscalaMensal mes={3} ano={2025} alocacoes={alocacoesExemplo} guardaVidas={guardaVidasExemplo}/>
            }

            {modoAtual === "geral" &&
                <VisaoGeral diasArray={diasArray} alocacoes={alocacoesExemplo}/>
            }
        </>
    )
}
