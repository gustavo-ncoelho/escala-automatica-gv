import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {ArrowLeft, Calendar, Check, Clock, X} from "lucide-react"
import Link from "next/link"
import {notFound} from "next/navigation"
import {formatarData, obterNomePosto} from "@/lib/utils";
import {useGetSolicitacaoById} from "@/hooks/api/solicitacoes/use-get-solicitacao-by-id";
import {useGetPostos} from "@/hooks/api/postos/use-get-all-postos";

export default function DetalhesSolicitacaoPage({params}: { params: { id: string } }) {

    const id = params.id;
    const {data: solicitacao} = useGetSolicitacaoById(id);
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

    const getTipoSolicitacaoText = (tipo: string) => {
        switch (tipo) {
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

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/user/solicitacoes">
                        <ArrowLeft className="h-4 w-4"/>
                        <span className="sr-only">Voltar</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Detalhes da Solicitação</h1>
                    <p className="text-muted-foreground">Visualize os detalhes da sua solicitação.</p>
                </div>
            </div>

            <Card>
                {solicitacao &&
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                {getStatusIcon(solicitacao.status)}
                            </div>
                            <div>
                                <CardTitle>{getTipoSolicitacaoText(solicitacao.tipo)}</CardTitle>
                                <CardDescription>
                                    Status: {getStatusText(solicitacao.status)} • Criado
                                    em: {formatarData(solicitacao.dataCriacao)}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                }
                {solicitacao &&
                    <CardContent className="space-y-4">
                        {solicitacao.tipo === "PREFERENCIA_POSTO" && solicitacao.postoSolicitado && (
                            <div className="space-y-2">
                                <div className="font-medium">Novo Posto Preferido</div>
                                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted">
                                    <Calendar className="h-5 w-5 text-muted-foreground"/>
                                    <div>{obterNomePosto(postos, solicitacao?.postoSolicitado)}</div>
                                </div>
                                {solicitacao.postoOriginal && (
                                    <div className="text-sm text-muted-foreground">
                                        Substituindo: {obterNomePosto(postos, solicitacao?.postoOriginal)}
                                    </div>
                                )}
                            </div>
                        )}

                        {solicitacao.tipo === "DIA_INDISPONIVEL" && solicitacao.dataSolicitada && (
                            <div className="space-y-2">
                                <div className="font-medium">Data Indisponível</div>
                                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted">
                                    <Calendar className="h-5 w-5 text-muted-foreground"/>
                                    <div>
                                        {solicitacao.dataSolicitada.toLocaleDateString("pt-BR", {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <div className="font-medium">Motivo</div>
                            <div className="p-3 rounded-lg bg-muted">{solicitacao.motivo}</div>
                        </div>

                        {solicitacao.status !== "PENDENTE" && (
                            <div className="space-y-2">
                                <div className="font-medium">Resposta</div>
                                <div className="p-3 rounded-lg bg-muted">
                                    {solicitacao.status === "APROVADA"
                                        ? "Sua solicitação foi aprovada pelo comandante."
                                        : "Sua solicitação foi rejeitada. Entre em contato com o comandante para mais informações."}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Atualizado em: {formatarData(solicitacao.dataAtualizacao)}
                                </div>
                            </div>
                        )}
                    </CardContent>
                }
                {solicitacao &&
                    <CardFooter>
                        {solicitacao.status === "PENDENTE" ? (
                            <Button variant="outline" className="w-full" asChild>
                                <Link href={`/user/solicitacoes/${id}/cancelar`}>Cancelar Solicitação</Link>
                            </Button>
                        ) : (
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/user/solicitacoes/nova">Nova Solicitação</Link>
                            </Button>
                        )}
                    </CardFooter>
                }
            </Card>
        </div>
    )
}
