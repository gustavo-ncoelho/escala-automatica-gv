"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import type {Solicitacao} from "@/types/solicitacao"
import {formatarData} from "@/utils/dados-simulados"
import {Calendar, Check, Clock, X} from "lucide-react"
import {useState} from "react"
import {obterNomeGuardaVidas, obterNomePosto} from "@/lib/utils";

interface ListaSolicitacoesProps {
    solicitacoes: Solicitacao[]
}

export function ListaSolicitacoes({solicitacoes}: ListaSolicitacoesProps) {
    const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState<Solicitacao | null>(null)

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

    const handleAprovar = (solicitacao: Solicitacao) => {
        console.log("Aprovando solicitação", solicitacao.id)
    }

    const handleRejeitar = (solicitacao: Solicitacao) => {
        console.log("Rejeitando solicitação", solicitacao.id)
    }

    if (solicitacoes.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">Nenhuma solicitação encontrada nesta
                categoria.</div>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {solicitacoes.map((solicitacao) => (
                <Card key={solicitacao.id} className={"flex flex-col justify-between"}>
                    <div>
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                {getStatusIcon(solicitacao.status)}
                            </div>
                            <div>
                                <h3 className="font-semibold">{obterNomeGuardaVidas(solicitacao.guardaVidasId)}</h3>
                                <p className="text-sm text-muted-foreground">
                                    Solicitação #{solicitacao.id} - {getStatusText(solicitacao.status)}
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground"/>
                                    <div className="text-sm">
                                        <div className="font-medium">Data Original</div>
                                        <div>{solicitacao.dataOriginal ? formatarData(solicitacao.dataOriginal) : "N/A"}</div>
                                        {solicitacao.postoOriginal && (
                                            <div
                                                className="text-muted-foreground">{obterNomePosto(solicitacao.postoOriginal)}</div>
                                        )}
                                    </div>
                                </div>

                                {solicitacao.dataSolicitada && (
                                    <div className="flex items-start gap-2">
                                        <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground"/>
                                        <div className="text-sm">
                                            <div className="font-medium">Data Solicitada</div>
                                            <div>{formatarData(solicitacao.dataSolicitada)}</div>
                                        </div>
                                    </div>
                                )}

                                {solicitacao.postoSolicitado && !solicitacao.dataSolicitada && (
                                    <div className="flex items-start gap-2">
                                        <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground"/>
                                        <div className="text-sm">
                                            <div className="font-medium">Posto Solicitado</div>
                                            <div>{obterNomePosto(solicitacao.postoSolicitado)}</div>
                                        </div>
                                    </div>
                                )}

                                <div className="text-sm">
                                    <div className="font-medium">Motivo</div>
                                    <div className="text-muted-foreground">{solicitacao.motivo}</div>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                    <CardFooter className="mt-auto">
                        {solicitacao.status === "pendente" ? (
                            <div className="flex justify-between gap-2 w-full">
                                <Button variant="outline" size="sm" className="flex"
                                        onClick={() => handleRejeitar(solicitacao)}
                                >
                                    <X className="mr-2 h-4 w-4"/>
                                    Rejeitar
                                </Button>
                                <Button size="sm" className="flex" onClick={() => handleAprovar(solicitacao)}>
                                    <Check className="mr-2 h-4 w-4"/>
                                    Aprovar
                                </Button>
                            </div>
                        ) : (
                            <div className="text-sm text-muted-foreground w-full text-center">
                                Atualizado em {formatarData(solicitacao.dataAtualizacao)}
                            </div>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
