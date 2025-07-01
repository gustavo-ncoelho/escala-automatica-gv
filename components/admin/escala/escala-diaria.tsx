import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Calendar} from "lucide-react"
import {GuardaVidasEscala, Posto} from "@/types/guarda-vidas";
import BackButton from "@/components/utils/back-button";
import {gerarEscalaDiaria, getGuardaVidasPorPosto, parseDateStringLocal} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useGetAlocacoesPorData} from "@/hooks/api/alocacao-diaria/use-get-alocacoes-por-data";
import {useSalvarEscalaDiaria} from "@/hooks/api/alocacao-diaria/use-salvar-escala-diaria";
import {toast} from "sonner";

interface EscalaDiariaProps {
    data: string
    postos: Posto[]
    guardaVidas: GuardaVidasEscala[]
}

export default function EscalaDiaria({data, postos, guardaVidas}: EscalaDiariaProps) {

    const dataDoDia = parseDateStringLocal(data);
    const {data: alocacoes} = useGetAlocacoesPorData(dataDoDia);
    const {mutateAsync: salvarEscala} = useSalvarEscalaDiaria();

    const formatarData = (data: Date) => {
        return data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })
    }

    const handleGerarEscala = async () => {
        try {
            const escalaNova = gerarEscalaDiaria(postos, guardaVidas, dataDoDia);
            await salvarEscala(escalaNova);
        } catch (error) {
            console.error(error);
            toast.error("Houve um erro ao gerar escala");
        }
    }

    return (
        <div className="w-full">
            <div className="flex mb-8">
                <div className="flex items-center justify-center gap-6 mb-2">
                    <BackButton href={"/admin"}/>
                    <div className={"flex items-center gap-3"}>
                        <Calendar className="h-6 w-6"/>
                        <h1 className="text-3xl font-bold">{formatarData(dataDoDia)}</h1>
                    </div>
                </div>
            </div>

            {!alocacoes &&
                <div className={"w-full py-40 flex items-center justify-center"}>
                    <Button onClick={handleGerarEscala} variant={"outline"} size={"default"}
                            className={"text-3xl font-semibold p-8"}>
                        Gerar escala
                    </Button>
                </div>
            }

            {alocacoes &&
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {postos.map((posto) => {
                        const guardaVidasAlocados = getGuardaVidasPorPosto(posto.id, alocacoes, dataDoDia, guardaVidas); //TODO PROBLEMA ESTÁ NESSA FUNÇÃO <<----------
                        const ocupacao = guardaVidasAlocados.length;
                        const slotsVazios = posto.alocacaoMaxima - ocupacao;

                        console.log("alocacoes ", alocacoes);
                        console.log("guardaVidasAlocados ", guardaVidasAlocados);

                        return (
                            <Card key={posto.id} className="border shadow-lg flex flex-col space-y-5">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-12 h-12 border bg-black text-white rounded-lg flex items-center justify-center">
                                                <span
                                                    className="text-xl font-bold">{posto.nome.includes("Lagoa") ? "L" : posto.numero}</span>
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
                                            <div key={`${posto.id}-${nome}`}
                                                 className="border-b last:border-b-0 p-2 min-h-[40px]">
                                                <span className="text-sm text-foreground">{nome}</span>
                                            </div>
                                        ))}

                                        {Array.from({length: slotsVazios > 0 ? slotsVazios : 0}).map((_, i) => (
                                            <div key={`${posto.id}-empty-${i}`}
                                                 className="border-b last:border-b-0 p-2 min-h-[40px]">
                                                <span
                                                    className="text-muted-foreground/30 text-sm italic">- - - - - - -</span>
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
