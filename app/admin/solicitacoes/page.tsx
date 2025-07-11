"use client";

import {Card, CardContent} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ListaSolicitacoes} from "@/components/admin/solicitacoes/lista-solicitacoes"
import {useGetAllSolicitacoes} from "@/hooks/api/solicitacoes/use-get-all-solicitacoes";
import {useGetAllGuardaVidas} from "@/hooks/api/guarda-vidas/use-get-all-guarda-vidas";
import {useGetPostos} from "@/hooks/api/postos/use-get-all-postos";
import FullscreenLoader from "@/components/utils/fullscreen-loader";

export default function SolicitacoesPage() {

    const {data: solicitacoes, isLoading: isLoadingSolicitacoes} = useGetAllSolicitacoes();
    const {data: guardaVidas, isLoading: isLoadingGuardaVidas} = useGetAllGuardaVidas();
    const {data: postos, isLoading: isLoadingPostos} = useGetPostos();

    const solicitacoesPendentes = solicitacoes ? solicitacoes.filter((s) => s.status === "PENDENTE") : [];
    const solicitacoesAprovadas = solicitacoes ? solicitacoes.filter((s) => s.status === "APROVADA") : [];
    const solicitacoesRejeitadas = solicitacoes ? solicitacoes.filter((s) => s.status === "REJEITADA") : [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Solicitações</h1>
                <p className="text-muted-foreground">Gerencie as solicitações de ajuste de escala dos guarda-vidas.</p>
            </div>

            {!isLoadingPostos && !isLoadingSolicitacoes && !isLoadingGuardaVidas &&
                <Card>
                    <CardContent className="p-6">
                        {guardaVidas && postos &&
                            <Tabs defaultValue="pendentes">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="pendentes">Pendentes ({solicitacoesPendentes.length})</TabsTrigger>
                                    <TabsTrigger value="rejeitadas">Rejeitadas</TabsTrigger>
                                    <TabsTrigger value="aprovadas">Aprovadas</TabsTrigger>
                                </TabsList>

                                <TabsContent value="pendentes" className="mt-6">
                                    <ListaSolicitacoes solicitacoes={solicitacoesPendentes} guardaVidas={guardaVidas} postos={postos}/>
                                </TabsContent>

                                <TabsContent value="aprovadas" className="mt-6">
                                    <ListaSolicitacoes solicitacoes={solicitacoesAprovadas} guardaVidas={guardaVidas} postos={postos}/>
                                </TabsContent>

                                <TabsContent value="rejeitadas" className="mt-6">
                                    <ListaSolicitacoes solicitacoes={solicitacoesRejeitadas} guardaVidas={guardaVidas} postos={postos}/>
                                </TabsContent>

                            </Tabs>
                        }
                    </CardContent>
                </Card>
            }

            {(isLoadingSolicitacoes || isLoadingGuardaVidas || isLoadingPostos) && <FullscreenLoader/>}
        </div>
    )
}
