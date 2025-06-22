import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"
import {GuardaVidas, Posto} from "@/types/guarda-vidas";
import {AlocacaoDiaria} from "@/types/escala";
import { isSameDay } from "date-fns";

interface EscalaDiariaProps {
    data: Date
    postos: Posto[]
    alocacoes: AlocacaoDiaria[]
    guardaVidas: GuardaVidas[]
}

export default function EscalaDiaria({data, postos, alocacoes, guardaVidas}: EscalaDiariaProps) {

    const getGuardaVidasPorPosto = (postoId: number) => {
        const alocacoesPosto = alocacoes.filter(
            (alocacao) => {
                return alocacao.postoId === postoId && isSameDay(alocacao.data, data);
            }
        );

        return alocacoesPosto.map((alocacao) => {
            const guardaVida = guardaVidas.find((gv) => gv.id === alocacao.guardaVidasId);
            return guardaVida?.nome || "Não encontrado";
        });
    }

    const criarSlots = (posto: Posto) => {
        const guardaVidasAlocados = getGuardaVidasPorPosto(posto.id)
        const slots = []

        guardaVidasAlocados.forEach((nome) => {
            slots.push(
                <div key={`${posto.id}-${nome}`} className="border-b border-gray-300 p-2 min-h-[40px]">
                    <span className="text-sm font-medium text-blue-900">{nome}</span>
                </div>,
            )
        })

        const slotsVazios = posto.alocacaoMaxima - guardaVidasAlocados.length
        for (let i = 0; i < slotsVazios; i++) {
            slots.push(
                <div key={`${posto.id}-empty-${i}`} className="border-b border-gray-300 p-2 min-h-[40px]">
                    <span className="text-gray-400 text-sm">Vago</span>
                </div>,
            )
        }

        return slots
    }

    const formatarData = (data: Date) => {
        return data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="text-center mb-8 border-b-2 border-black pb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="h-5 w-5" />
                    <h1 className="text-2xl font-bold">{formatarData(data)}</h1>
                </div>
                <div className="flex items-center justify-center gap-2 mb-1">
                    <MapPin className="h-4 w-4" />
                    <h2 className="text-lg font-semibold">{"local"}</h2>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <Users className="h-4 w-4" />
                    <h3 className="text-md font-medium text-gray-700">{"organizacao"}</h3>
                </div>
            </div>

            {/* Grid de Postos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {postos.map((posto) => {
                    const guardaVidasAlocados = getGuardaVidasPorPosto(posto.id)
                    const ocupacao = guardaVidasAlocados.length

                    return (
                        <Card key={posto.id} className="border-2 border-black shadow-lg">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center">
                                            <span className="text-xl font-bold">{posto.nome.includes("Lagoa") ? "L" : posto.id}</span>
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{posto.nome}</CardTitle>
                                            <p className="text-sm text-gray-600">{posto.localizacao}</p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant={ocupacao === posto.alocacaoMaxima ? "default" : ocupacao > 0 ? "secondary" : "outline"}
                                        className="ml-2"
                                    >
                                        {ocupacao}/{posto.alocacaoMaxima}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="border border-gray-300 rounded-md overflow-hidden">{criarSlots(posto)}</div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
