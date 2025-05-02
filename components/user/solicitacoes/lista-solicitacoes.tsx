import {Badge} from "@/components/ui/badge"
import type {Solicitacao} from "@/types/solicitacao"
import {formatarData, obterNomeGuardaVidas, obterNomePosto} from "@/utils/dados-simulados"
import {Calendar, Check, Clock, MapPinHouse, User, X} from "lucide-react"
import Link from "next/link"
import {cn} from "@/lib/utils";

interface ListaSolicitacoesProps {
    solicitacoes: Solicitacao[]
}

export function ListaSolicitacoes({solicitacoes}: ListaSolicitacoesProps) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pendente":
                return <Clock className="h-5 w-5 text-yellow-500"/>
            case "aprovada":
                return <Check className="h-5 w-5 text-green-500"/>
            case "rejeitada":
                return <X className="h-5 w-5 text-red-500"/>
            default:
                return null
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "pendente":
                return "Pendente"
            case "aprovada":
                return "Aprovada"
            case "rejeitada":
                return "Rejeitada"
            default:
                return status
        }
    }

    const getTipoSolicitacaoText = (solicitacao: Solicitacao) => {
        switch (solicitacao.tipo) {
            case "preferencia_posto":
                return "Alteração de Posto"
            case "dia_indisponivel":
                return "Dia Indisponível"
            case "colega_nao_preferido":
                return "Colega Não Preferido"
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
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-full bg-muted",
                        solicitacao.status === "pendente" && "bg-yellow-200/10 border-yellow-300 border",
                        solicitacao.status === "aprovada" && "bg-green-200/10 border-green-300 border",
                        solicitacao.status === "rejeitada" && "bg-red-200/10 border-red-300 border"
                    )}>
                        {getStatusIcon(solicitacao.status)}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-start gap-2">
                            <div className="font-medium">{getTipoSolicitacaoText(solicitacao)}</div>
                            <Badge variant="outline">{getStatusText(solicitacao.status)}</Badge>
                        </div>

                        <div className="text-sm text-muted-foreground mt-1 space-y-2">
                            {solicitacao.tipo === "preferencia_posto" && solicitacao.postoSolicitado && (
                                <div className="flex items-start gap-2 mt-2">
                                    <span className={"font-semibold"}>Novo posto: </span>
                                    <p>{obterNomePosto(solicitacao.postoSolicitado)}</p>
                                </div>
                            )}

                            {solicitacao.tipo === "dia_indisponivel" && solicitacao.dataSolicitada && (
                                <div className="flex items-start gap-2 mt-2">
                                    <span className={"font-semibold"}>Data: </span>
                                    <p>{formatarData(solicitacao.dataSolicitada)}</p>
                                </div>
                            )}

                            {solicitacao.tipo === "colega_nao_preferido" && solicitacao.colegaNaoPreferido && (
                                <div className="flex items-start gap-2 mt-2">
                                    <span className={"font-semibold"}>Colega: </span>
                                    <p>{obterNomeGuardaVidas(solicitacao.colegaNaoPreferido)}</p>
                                </div>
                            )}

                            <div className={"flex items-start gap-2"}>
                                <div className="font-semibold">Motivo:</div>
                                <p>{solicitacao.motivo}</p>
                            </div>
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
