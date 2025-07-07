'use client';

import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ListaSolicitacoes} from "@/components/user/solicitacoes/lista-solicitacoes"
import {Plus} from "lucide-react"
import Link from "next/link"
import {useAuthContext} from "@/contexts/auth-context";
import {useGetGuardaVidasById} from "@/hooks/api/guarda-vidas/use-get-guarda-vidas-by-id";
import {useGetSolicitacoesByGuardaVidas} from "@/hooks/api/solicitacoes/use-get-solicitacoes-by-guarda-vidas";

export default function SolicitacoesPage() {

    const {usuario: usuarioSession} = useAuthContext();
    const {data: usuario} = useGetGuardaVidasById(usuarioSession?.id ?? "");
    const {data: solicitacoes} = useGetSolicitacoesByGuardaVidas(usuario?.perfilGuardaVidas?.id ?? "");

    const solicitacoesAprovadas = solicitacoes?.filter((s) => s.status === "APROVADA") ?? []
    const solicitacoesPendentes = solicitacoes?.filter((s) => s.status === "PENDENTE") ?? []
    const solicitacoesRejeitadas = solicitacoes?.filter((s) => s.status === "REJEITADA") ?? []

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
