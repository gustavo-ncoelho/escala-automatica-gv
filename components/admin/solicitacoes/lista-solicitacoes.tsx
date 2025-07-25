"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import type {Solicitacao} from "@/types/solicitacao"
import {formatarData, obterNomeGuardaVidas, obterNomePosto} from "@/lib/utils"
import {BookOpenCheck, Calendar, CalendarArrowDown, Check, Clock, TowerControl, X} from "lucide-react";
import {Usuario} from "@/types/auth/usuario";
import {Posto} from "@/types/guarda-vidas";
import {useUpdateSolicitacaoStatus} from "@/hooks/api/solicitacoes/use-update-solicitacao";
import {toast} from "sonner"
import FullscreenLoader from "@/components/utils/fullscreen-loader";

interface ListaSolicitacoesProps {
    solicitacoes: Solicitacao[]
    guardaVidas: Usuario[];
    postos: Posto[];
}

export function ListaSolicitacoes({solicitacoes, guardaVidas, postos}: ListaSolicitacoesProps) {
    const {mutateAsync: atualizarStatusSolicitacao, isPending} = useUpdateSolicitacaoStatus();

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

    const handleAprovar = async (solicitacao: Solicitacao) => {
        try {
            await atualizarStatusSolicitacao({
                id: solicitacao.id,
                data: {
                    ...solicitacao,
                    status: "APROVADA"
                }
            })
            toast.success("Solicitação aprovada")
        } catch (error) {
            console.log(error);
            toast.success("Erro ao atualizar status da solicitação")
        }
    }

    const handleRejeitar = async (solicitacao: Solicitacao) => {
        try {
            await atualizarStatusSolicitacao({
                id: solicitacao.id,
                data: {
                    ...solicitacao,
                    status: "REJEITADA"
                }
            })
            toast.success("Solicitação rejeitada")
        } catch (error) {
            console.log(error);
            toast.success("Erro ao atualizar status da solicitação")
        }
    }

    if (solicitacoes.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">Nenhuma solicitação encontrada nesta
                categoria.</div>
        )
    }

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {solicitacoes.map((solicitacao) => (
                <Card key={solicitacao.id} className={"flex flex-col justify-between gap-2.5"}>
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className={"w-full flex items-center justify-between"}>
                            <div className={"flex items-center gap-3"}>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                    {getStatusIcon(solicitacao.status)}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{obterNomeGuardaVidas(solicitacao.guardaVidasId, guardaVidas)}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {getStatusText(solicitacao.status)}
                                    </p>
                                </div>
                            </div>
                            <div>{getTipoSolicitacaoText(solicitacao)}</div>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                        <div className="space-y-4">
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
                                    <TowerControl className="h-4 w-4 mt-0.5 text-muted-foreground"/>
                                    <div className="text-sm">
                                        <div className="font-medium">Posto Solicitado</div>
                                        <div>{obterNomePosto(postos, solicitacao?.postoSolicitado)}</div>
                                    </div>
                                </div>
                            )}

                            {solicitacao.motivo &&
                                <div className="flex items-start gap-2">
                                    <BookOpenCheck className="h-4 w-4 mt-0.5 text-muted-foreground"/>
                                    <div className="text-sm">
                                        <div className="font-medium">Motivo</div>
                                        <div>{solicitacao.motivo}</div>
                                    </div>
                                </div>
                            }

                            <div className={"flex items-start gap-2 text-sm"}>
                                <CalendarArrowDown className="h-4 w-4 mt-0.5 text-muted-foreground"/>
                                <div>
                                    <div className="font-semibold">Criado em:</div>
                                    <p>{formatarData(solicitacao.dataCriacao)}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="mt-auto">
                        {solicitacao.status === "PENDENTE" ? (
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

            {isPending && <FullscreenLoader/>}
        </div>
    )
}
