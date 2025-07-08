import {Calendar, Loader2, RefreshCw} from "lucide-react"
import {GuardaVidasEscala, Posto} from "@/types/guarda-vidas";
import BackButton from "@/components/utils/back-button";
import {gerarEscalaDiaria, parseDateStringLocal} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useGetAlocacoesPorData} from "@/hooks/api/alocacao-diaria/use-get-alocacoes-por-data";
import {useSalvarEscalaDiaria} from "@/hooks/api/alocacao-diaria/use-salvar-escala-diaria";
import {toast} from "sonner";
import TabelaEscalaDiaria from "@/components/main/tabela-escala-diaria";

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
                <TabelaEscalaDiaria postos={postos} guardaVidas={guardaVidas} alocacoes={alocacoes} dataDoDia={dataDoDia}/>
            }
        </div>
    )
}
