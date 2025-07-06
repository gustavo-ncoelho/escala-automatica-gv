import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ListaSolicitacoes} from "@/components/user/solicitacoes/lista-solicitacoes"
import {solicitacoes} from "@/utils/dados-simulados"
import {Plus} from "lucide-react"
import Link from "next/link"

export default function SolicitacoesPage() {

    const minhasSolicitacoes = solicitacoes.filter((s) => s.guardaVidasId === 1)

    const solicitacoesPendentes = minhasSolicitacoes.filter((s) => s.status === "pendente")
    const solicitacoesAprovadas = minhasSolicitacoes.filter((s) => s.status === "aprovada")
    const solicitacoesRejeitadas = minhasSolicitacoes.filter((s) => s.status === "rejeitada")

    return (
        <div className="space-y-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between px-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Solicitações</h1>
                </div>
                <Button asChild className={"bg-gray-300 text-black"}>
                    <Link href="/user/solicitacoes/nova">
                        <Plus className="mr-2 h-4 w-4"/>
                        Nova Solicitação
                    </Link>
                </Button>
            </div>

            <Card className={"flex-1 rounded-none"}>
                <CardContent className="p-4 md:p-6">
                    <Tabs defaultValue="pendentes">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="pendentes">Pendentes ({solicitacoesPendentes.length})</TabsTrigger>
                            <TabsTrigger value="aprovadas">Aprovadas ({solicitacoesAprovadas.length})</TabsTrigger>
                            <TabsTrigger value="rejeitadas">Rejeitadas ({solicitacoesRejeitadas.length})</TabsTrigger>
                        </TabsList>

                        <TabsContent value="pendentes" className="mt-6">
                            <ListaSolicitacoes solicitacoes={solicitacoesPendentes}/>
                        </TabsContent>

                        <TabsContent value="aprovadas" className="mt-6">
                            <ListaSolicitacoes solicitacoes={solicitacoesAprovadas}/>
                        </TabsContent>

                        <TabsContent value="rejeitadas" className="mt-6">
                            <ListaSolicitacoes solicitacoes={solicitacoesRejeitadas}/>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
