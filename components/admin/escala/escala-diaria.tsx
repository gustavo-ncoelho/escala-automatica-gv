import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"
import {GuardaVidas, Posto} from "@/types/guarda-vidas";
import {AlocacaoDiaria} from "@/types/alocacao-diaria";
import { isSameDay } from "date-fns";
import BackButton from "@/components/utils/back-button";
import {existeAlocacaoNoDia, gerarEscalaDiaria} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useState} from "react";

interface EscalaDiariaProps {
    data: Date
    postos: Posto[]
    alocacoes: AlocacaoDiaria[]
    guardaVidas: GuardaVidas[]
}

export default function EscalaDiaria({data, postos, alocacoes, guardaVidas}: EscalaDiariaProps) {

    const router = useRouter();

    const dataDoDia = new Date(data);

    const [novasAlocacoes, setNovasAlocacoes] = useState<AlocacaoDiaria[]>([]);

    const getGuardaVidasPorPosto = (postoId: number) => {
        const alocacoesPosto = novasAlocacoes.filter(
            (alocacao) => {
                return alocacao.postoId === postoId && isSameDay(alocacao.data, dataDoDia);
            }
        );

        return alocacoesPosto.map((alocacao) => {
            const guardaVida = guardaVidas.find((gv) => gv.id === alocacao.guardaVidasId);
            return guardaVida?.nome || "Não encontrado";
        });
    }

    const formatarData = (data: Date) => {
        return data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    const handleGerarEscala = () => {
        setNovasAlocacoes(gerarEscalaDiaria(postos,guardaVidas,dataDoDia))
    }

    return (
        <div className="w-full">
            <div className="flex mb-8">
                <div className="flex items-center justify-center gap-6 mb-2">
                    <BackButton href={"/admin"}/>
                    <div className={"flex items-center gap-3"}>
                        <Calendar className="h-6 w-6" />
                        <h1 className="text-3xl font-bold">{formatarData(dataDoDia)}</h1>
                    </div>
                </div>
            </div>

            {!existeAlocacaoNoDia(dataDoDia, novasAlocacoes) &&
                <div className={"w-full py-40 flex items-center justify-center"}>
                    <Button onClick={handleGerarEscala} variant={"outline"} size={"default"} className={"text-3xl font-semibold p-8"}>
                        Gerar escala
                    </Button>
                </div>
            }

            {existeAlocacaoNoDia(dataDoDia, novasAlocacoes) &&
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {postos.map((posto) => {
                        const guardaVidasAlocados = getGuardaVidasPorPosto(posto.id);
                        const ocupacao = guardaVidasAlocados.length;
                        const slotsVazios = posto.alocacaoMaxima - ocupacao;

                        return (
                            <Card key={posto.id} className="border shadow-lg flex flex-col space-y-5">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 border bg-black text-white rounded-lg flex items-center justify-center">
                                                <span className="text-xl font-bold">{posto.nome.includes("Lagoa") ? "L" : posto.id}</span>
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg">{posto.nome}</CardTitle>
                                                <p className="text-sm text-gray-600">{posto.localizacao}</p>
                                            </div>
                                        </div>
                                        <Badge
                                            variant={"secondary"}
                                            className="ml-2 text-sm px-2 py-1 rounded-md"
                                        >
                                            {ocupacao}/{posto.alocacaoMaxima}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0 flex-grow">
                                    <div className="border rounded-md overflow-hidden">

                                        {guardaVidasAlocados.map((nome) => (
                                            <div key={`${posto.id}-${nome}`} className="border-b last:border-b-0 p-2 min-h-[40px]">
                                                <span className="text-sm text-foreground">{nome}</span>
                                            </div>
                                        ))}

                                        {Array.from({ length: slotsVazios > 0 ? slotsVazios : 0 }).map((_, i) => (
                                            <div key={`${posto.id}-empty-${i}`} className="border-b last:border-b-0 p-2 min-h-[40px]">
                                                <span className="text-muted-foreground/30 text-sm italic">- - - - - - -</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            }
        </div>
    )
}
