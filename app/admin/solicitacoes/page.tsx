import {Card, CardContent} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ListaSolicitacoes} from "@/components/admin/solicitacoes/lista-solicitacoes"
import {solicitacoes} from "@/utils/dados-simulados"

export default function SolicitacoesPage() {
    const solicitacoesPendentes = solicitacoes.filter((s) => s.status === "pendente")
    const solicitacoesAprovadas = solicitacoes.filter((s) => s.status === "aprovada")
    const solicitacoesRejeitadas = solicitacoes.filter((s) => s.status === "rejeitada")

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Solicitações</h1>
                <p className="text-muted-foreground">Gerencie as solicitações de ajuste de escala dos guarda-vidas.</p>
            </div>

            <Card>
                <CardContent className="p-6">
                    <Tabs defaultValue="pendentes">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="pendentes">Pendentes ({solicitacoesPendentes.length})</TabsTrigger>
                            <TabsTrigger value="rejeitadas">Rejeitadas</TabsTrigger>
                            <TabsTrigger value="aprovadas">Aprovadas</TabsTrigger>
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
