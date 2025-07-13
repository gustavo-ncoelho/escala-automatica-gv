import {Badge} from "@/components/ui/badge"
import type {Solicitacao} from "@/types/solicitacao"
import {Check, Clock, X} from "lucide-react"
import Link from "next/link"
import {cn, formatarData, obterNomePosto} from "@/lib/utils";
import {useGetPostos} from "@/hooks/api/postos/use-get-all-postos";

interface ListaSolicitacoesProps {
    solicitacoes: Solicitacao[]
}

export function ListaSolicitacoes({solicitacoes}: ListaSolicitacoesProps) {

    const {data: postos} = useGetPostos();

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "PENDENTE":
                return <Clock className="h-5 w-5 text-yellow-500"/>
            case "APROVADA":
                return <Check className="h-5 w-5 text-green-500"/>
            case "REJEITADA":
                return <X className="h-5 w-5 text-red-500"/>
            default:
                return null
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "PENDENTE":
                return "PENDENTE"
            case "APROVADA":
                return "APROVADA"
            case "REJEITADA":
                return "REJEITADA"
            default:
                return status
        }
    }

    const getTipoSolicitacaoText = (solicitacao: Solicitacao) => {
        switch (solicitacao.tipo) {
            case "PREFERENCIA_POSTO":
                return "Alteração de Posto"
            case "DIA_INDISPONIVEL":
                return "Dia Indisponível"
            default:
                return "Solicitação"
        }
    }

    if (solicitacoes.length === 0) {
        return <div className="text-center py-8 text-muted-foreground">Nenhuma solicitação encontrada.</div>
    }

    return (
        <div className="space-y-4">
            {solicitacoes.map((solicitacao) => (
                <Link
                    key={solicitacao.id}
                    href={`/user/solicitacoes/${solicitacao.id}`}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        {getStatusIcon(solicitacao.status)}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-start gap-2">
                            <div className="font-medium">{getTipoSolicitacaoText(solicitacao)}</div>
                            <Badge variant="outline" className={"rounded-md py-0.5 px-1.5"}>{getStatusText(solicitacao.status)}</Badge>
                        </div>

                        <div className="text-sm text-muted-foreground mt-1 space-y-2">
                            {solicitacao.tipo === "PREFERENCIA_POSTO" && solicitacao.postoSolicitado && (
                                <div className="flex items-start gap-2 mt-2">
                                    <span className={"font-semibold"}>Novo posto: </span>
                                    <p>{obterNomePosto(postos,solicitacao?.postoSolicitado)}</p>
                                </div>
                            )}

                            {solicitacao.tipo === "DIA_INDISPONIVEL" && solicitacao.dataSolicitada && (
                                <div className="flex items-start gap-2 mt-2">
                                    <span className={"font-semibold"}>Data: </span>
                                    <p>{formatarData(solicitacao.dataSolicitada)}</p>
                                </div>
                            )}

                            {solicitacao.motivo &&
                                <div className={"flex items-start gap-2"}>
                                    <div className="font-semibold">Motivo:</div>
                                    <p>{solicitacao.motivo}</p>
                                </div>
                            }

                            <div className={"flex items-start gap-2"}>
                                <div className="font-semibold">Criado em:</div>
                                <p>{formatarData(solicitacao.dataCriacao)}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
