import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Calendar, Loader2, RefreshCw} from "lucide-react"
import {GuardaVidasEscala, Posto} from "@/types/guarda-vidas";
import BackButton from "@/components/utils/back-button";
import {cn, gerarEscalaDiaria, getGuardaVidasPorPosto, parseDateStringLocal, postoEstaAberto} from "@/lib/utils";
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
    const {data: alocacoes, isLoading: loadingAlocacoes} = useGetAlocacoesPorData(dataDoDia);
    const {mutateAsync: salvarEscala, isPending: loadingGeracaoEscala} = useSalvarEscalaDiaria();

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
                <div className="flex items-center justify-between w-full gap-6 mb-2">
                    <div className={"flex items-center gap-4"}>
                        <BackButton href={"/admin"}/>
                        <div className={"flex items-center gap-3"}>
                            <Calendar className="h-6 w-6"/>
                            <h1 className="text-3xl font-bold">{formatarData(dataDoDia)}</h1>
                        </div>
                    </div>

                    {alocacoes && alocacoes.length > 0 && (
                        <Button onClick={handleGerarEscala} variant="outline" disabled={loadingGeracaoEscala || loadingAlocacoes}>
                            {(loadingGeracaoEscala || loadingAlocacoes) ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <RefreshCw className="mr-2 h-4 w-4" />
                            )}
                            Atualizar Escala
                        </Button>
                    )}
                </div>
            </div>

            {alocacoes && alocacoes.length === 0 &&
                <div className={"w-full py-40 flex items-center justify-center"}>
                    <Button onClick={handleGerarEscala} variant={"outline"} size={"default"}
                            className={"text-3xl font-semibold p-8"}>
                        Gerar escala
                    </Button>
                </div>
            }

            {alocacoes && alocacoes.length > 0 &&
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {postos.map((posto) => {
                        const estaAberto = postoEstaAberto(posto, dataDoDia);

                        const guardaVidasAlocados = estaAberto ? getGuardaVidasPorPosto(posto.id, alocacoes, dataDoDia, guardaVidas) : [];
                        const ocupacao = guardaVidasAlocados.length;
                        const slotsVazios = posto.alocacaoMaxima - ocupacao;

                        return (
                            <Card key={posto.id} className={cn(
                                "border shadow-lg flex flex-col space-y-5 transition-all",
                                !estaAberto && "bg-muted/50 opacity-70 border-dashed"
                            )}>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center w-full justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={cn(
                                                    "w-12 h-12 border rounded-lg flex items-center justify-center",
                                                    estaAberto ? "bg-black text-white" : "bg-muted-foreground/20 text-muted-foreground"
                                                )}>
                                    <span
                                        className="text-xl font-bold">{posto.nome.includes("Lagoa") ? "L" : posto.numero}</span>
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg">{posto.nome}</CardTitle>
                                                <p className="text-sm text-gray-600">{posto.localizacao}</p>
                                            </div>
                                        </div>

                                        {estaAberto &&
                                            <Badge
                                                variant={"secondary"}
                                                className={cn("ml-2 text-sm px-2 py-1 rounded-md", ocupacao > posto.alocacaoMaxima && "text-red-300 bg-red-800/40")}
                                            >
                                                {ocupacao}/{posto.alocacaoMaxima}
                                            </Badge>
                                        }
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0 flex-grow">
                                    <div className="border rounded-md overflow-hidden">
                                        {estaAberto ? (
                                            <>
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
                                            </>
                                        ) : (
                                            <div className="flex items-center justify-center min-h-[80px] p-4">
                                                <p className="text-sm text-muted-foreground italic">Posto fechado neste dia.</p>
                                            </div>
                                        )}
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
